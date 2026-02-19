import json
import time
from datetime import datetime
from agents import repo_agent, test_agent, bug_agent, fix_agent, git_agent, cicd_agent

RESULTS_PATH = "results.json"


def log(stage: str, message: str):
    timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    print(f"[{timestamp}] [{stage.upper()}] {message}")


def run_pipeline(
    repo_url: str,
    github_token: str,
    team_name: str = "DEFAULT_TEAM",
    leader_name: str = "LEADER"
) -> dict:

    pipeline_start = time.time()
    log("PIPELINE", f"Starting pipeline for repo: {repo_url}")

    results = {
        "repo_url": repo_url,
        "team_name": team_name,
        "leader_name": leader_name,
        "pipeline_start": datetime.utcnow().isoformat(),
        "stages": {}
    }

    # ── Stage 1: Repo Agent ─────────────────────────────
    log("REPO_AGENT", "Cloning and reading repository metadata...")

    repo_data = repo_agent.run({
        "repo_url": repo_url,
        "github_token": github_token   # ⭐ FIXED
    })

    results["stages"]["repo"] = repo_data

    log(
        "REPO_AGENT",
        f"Detected {repo_data['file_count']} files, language: {repo_data['primary_language']}"
    )

    # ── Stage 2: Test Agent ─────────────────────────────
    log("TEST_AGENT", "Discovering and running test files...")

    test_data = test_agent.run({
        "repo_meta": repo_data
    })

    results["stages"]["tests"] = test_data

    log(
        "TEST_AGENT",
        f"Tests run: {test_data['total_tests']} | Failures: {len(test_data['failures'])}"
    )

    # ── Stage 3: Bug Agent ──────────────────────────────
    log("BUG_AGENT", "Classifying failures into bug categories...")

    bug_data = bug_agent.run({
        "failures": test_data["failures"]
    })

    results["stages"]["bugs"] = bug_data

    log(
        "BUG_AGENT",
        f"Total bugs classified: {len(bug_data['classified_bugs'])}"
    )

    # ── Stage 4: Fix Agent ──────────────────────────────
    log("FIX_AGENT", "Generating structured fix suggestions...")

    fix_data = fix_agent.run({
        "classified_bugs": bug_data["classified_bugs"]
    })

    results["stages"]["fixes"] = fix_data

    log("FIX_AGENT", f"Fixes generated: {len(fix_data['fixes'])}")

    # ── Stage 5: Git Agent (REAL PUSH) ──────────────────
    log("GIT_AGENT", "Creating branch and committing AI fixes...")

    git_data = git_agent.run({
        "fixes": fix_data["fixes"],
        "team_name": team_name,
        "leader_name": leader_name,
        "repo_url": repo_url,
        "clone_path": repo_data["clone_path"],   # ⭐ REQUIRED
        "github_token": github_token             # ⭐ REQUIRED
    })

    results["stages"]["git"] = git_data

    log(
        "GIT_AGENT",
        f"Branch: {git_data['branch_name']} | Commits: {git_data['total_commits']}"
    )

    # ── Stage 6: CI/CD Agent ────────────────────────────
    log("CICD_AGENT", "Simulating pipeline rerun and scoring...")

    cicd_data = cicd_agent.run({
        "fixes": fix_data["fixes"],
        "git_data": git_data,
        "pipeline_start": pipeline_start
    })

    results["stages"]["cicd"] = cicd_data

    log(
        "CICD_AGENT",
        f"Final Status: {cicd_data['final_status']} | "
        f"Score: {cicd_data['score']['final_score']}"
    )

    # ── Summary ─────────────────────────────────────────
    pipeline_end = time.time()

    results["pipeline_end"] = datetime.utcnow().isoformat()
    results["total_time_seconds"] = round(pipeline_end - pipeline_start, 2)

    results["summary"] = {
        "branch_name": git_data["branch_name"],
        "total_failures_detected": len(test_data["failures"]),
        "total_fixes_applied": len(
            [f for f in fix_data["fixes"] if f["status"] == "FIXED"]
        ),
        "final_status": cicd_data["final_status"],
        "final_score": cicd_data["score"]["final_score"],
        "total_commits": git_data["total_commits"],
        "cicd_iterations": cicd_data["iterations_used"]
    }

    # ── Save results.json ───────────────────────────────
    with open(RESULTS_PATH, "w") as f:
        json.dump(results, f, indent=2)

    log(
        "PIPELINE",
        f"results.json saved. Total time: {results['total_time_seconds']}s"
    )

    return results