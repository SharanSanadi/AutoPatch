import time
import random
from datetime import datetime, timedelta

MAX_RETRIES = 5
BASE_SCORE = 100
SPEED_BONUS = 10
SPEED_THRESHOLD_SECONDS = 300  # 5 minutes
EFFICIENCY_PENALTY_PER_EXTRA_COMMIT = 2
COMMIT_THRESHOLD = 20


def calculate_score(pipeline_start: float, total_commits: int, final_status: str) -> dict:
    elapsed = time.time() - pipeline_start
    speed_bonus = SPEED_BONUS if elapsed < SPEED_THRESHOLD_SECONDS else 0
    extra_commits = max(0, total_commits - COMMIT_THRESHOLD)
    efficiency_penalty = extra_commits * EFFICIENCY_PENALTY_PER_EXTRA_COMMIT
    status_penalty = 0 if final_status == "PASSED" else 20

    final_score = BASE_SCORE + speed_bonus - efficiency_penalty - status_penalty

    return {
        "base_score": BASE_SCORE,
        "speed_bonus": speed_bonus,
        "efficiency_penalty": efficiency_penalty,
        "status_penalty": status_penalty,
        "final_score": max(0, final_score),
        "elapsed_seconds": round(elapsed, 2),
        "under_speed_threshold": elapsed < SPEED_THRESHOLD_SECONDS
    }


def simulate_cicd_run(iteration: int, fixes: list, total_fixes: int) -> dict:
    """Simulate one CI/CD pipeline run."""
    timestamp = (datetime.utcnow() + timedelta(seconds=iteration * 30)).isoformat()
    fixed_count = len([f for f in fixes if f["status"] == "FIXED"])

    # Pass on final iteration if most fixes succeeded
    if iteration == 1 and fixed_count >= total_fixes * 0.9:
        status = "PASSED"
    elif iteration >= 2 and fixed_count >= total_fixes * 0.75:
        status = "PASSED"
    elif iteration >= MAX_RETRIES:
        status = "FAILED"
    else:
        # Randomly fail early iterations to simulate real CI behavior
        status = "FAILED" if random.random() < 0.45 else "PASSED"

    return {
        "iteration": iteration,
        "status": status,
        "timestamp": timestamp,
        "duration_seconds": round(random.uniform(18, 55), 1),
        "tests_passed": fixed_count if status == "PASSED" else random.randint(0, fixed_count),
        "tests_failed": 0 if status == "PASSED" else random.randint(1, max(1, total_fixes - fixed_count))
    }


def run(input_data: dict) -> dict:
    """
    Simulate CI/CD pipeline reruns until all tests pass or retry limit hit.
    Returns: timeline of runs, final status, and score.
    """
    fixes = input_data.get("fixes", [])
    git_data = input_data.get("git_data", {})
    pipeline_start = input_data.get("pipeline_start", time.time())

    total_fixes = len(fixes)
    total_commits = git_data.get("total_commits", 0)

    timeline = []
    final_status = "FAILED"
    iterations_used = 0

    for i in range(1, MAX_RETRIES + 1):
        iterations_used = i
        run_result = simulate_cicd_run(i, fixes, total_fixes)
        timeline.append(run_result)

        if run_result["status"] == "PASSED":
            final_status = "PASSED"
            break

    score = calculate_score(pipeline_start, total_commits, final_status)

    return {
        "final_status": final_status,
        "iterations_used": iterations_used,
        "max_retries": MAX_RETRIES,
        "retry_label": f"{iterations_used}/{MAX_RETRIES}",
        "timeline": timeline,
        "score": score,
        "evaluated_at": datetime.utcnow().isoformat()
    }