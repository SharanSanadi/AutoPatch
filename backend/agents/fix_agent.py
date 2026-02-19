import re
from datetime import datetime
from services.llm_service import generate_fix

VALID_BUG_TYPES = {"IMPORT", "SYNTAX", "TYPE_ERROR", "INDENTATION", "LOGIC", "LINTING"}

CONFIDENCE_MAP = {
    "SYNTAX": 0.96,
    "INDENTATION": 0.95,
    "LINTING": 0.93,
    "IMPORT": 0.90,
    "TYPE_ERROR": 0.84,
    "LOGIC": 0.75,
}

ACTION_MAP = {
    "IMPORT": "correct the import statement",
    "SYNTAX": "add the missing syntax element",
    "TYPE_ERROR": "fix the type mismatch",
    "INDENTATION": "fix the indentation block",
    "LOGIC": "correct the business logic",
    "LINTING": "remove the unused or flagged code",
}

PROMPT_TEMPLATE = """You are a senior Python engineer reviewing a CI/CD pipeline failure.

Bug Type     : {bug_type}
File         : {source_file}
Line         : {line_number}
Description  : {bug_description}

Error message:
{raw_error}

Problematic code snippet:
{error_snippet}

Instructions:
- Provide ONLY the corrected code or minimal patch.
- Do NOT explain.
- Keep the fix minimal.
"""


def build_prompt(bug: dict) -> str:
    return PROMPT_TEMPLATE.format(
        bug_type=bug.get("bug_type", "LOGIC"),
        source_file=bug.get("source_file", "unknown"),
        line_number=bug.get("line_number", "?"),
        bug_description=bug.get("bug_description", ""),
        raw_error=bug.get("raw_error", "").strip(),
        error_snippet=bug.get("error_snippet", "").strip(),
    )


def clean_suggestion(raw: str) -> str:
    if not raw:
        return ""
    raw = re.sub(r"```[\w]*\n?", "", raw)
    raw = re.sub(r"```", "", raw)
    return raw.strip()


def build_commit_message(bug: dict) -> str:
    action = ACTION_MAP.get(bug.get("bug_type", "LOGIC"), "apply fix")
    return (
        f"[AI-AGENT] Fix {bug.get('bug_type')} in "
        f"{bug.get('source_file','unknown')} line {bug.get('line_number','?')}: {action}"
    )


def build_dashboard_output(bug: dict) -> str:
    action = ACTION_MAP.get(bug.get("bug_type", "LOGIC"), "apply fix")
    return (
        f"{bug.get('bug_type')} error in {bug.get('source_file','unknown')} "
        f"line {bug.get('line_number','?')} → Fix: {action}"
    )


def run(input_data: dict) -> dict:
    print("🔥 FIX AGENT STARTED 🔥")
    bugs = input_data.get("classified_bugs", [])
    print("BUGS RECEIVED:", len(bugs))
    fixes = []
    failed_count = 0

    for bug in bugs:
        bug_type = bug.get("bug_type", "LOGIC")
        print("Processing:", bug.get("bug_type"))
        prompt = build_prompt(bug)

        try:
            raw_suggestion = generate_fix(prompt)
            print("RAW LLM OUTPUT >>>", raw_suggestion)
            suggestion = clean_suggestion(raw_suggestion)
            print("CLEAN PATCH >>>", suggestion)
            
            
            print("PATCH:",suggestion[:200])

            # treat tiny/empty outputs as failure
            status = "FIXED" if len(suggestion) > 5 else "FAILED"

        except Exception as e:
            suggestion = f"[ERROR] LLM call failed: {str(e)}"
            status = "FAILED"

        if status == "FAILED":
            failed_count += 1

        confidence = CONFIDENCE_MAP.get(bug_type, 0.75)

        fixes.append({
            "file_name": bug.get("source_file"),
            "test_file": bug.get("test_file"),
            "bug_type": bug_type,
            "line_number": bug.get("line_number"),
            "bug_description": bug.get("bug_description", ""),
            "suggested_patch": suggestion,
            "commit_message": build_commit_message(bug),
            "dashboard_output": build_dashboard_output(bug),
            "confidence_score": confidence,
            "status": status,
            "generated_at": datetime.utcnow().isoformat(),
        })

    successful = len(fixes) - failed_count

    avg_conf = (
        round(sum(f["confidence_score"] for f in fixes) / len(fixes), 2)
        if fixes else 0
    )

    return {
        "fixes": fixes,
        "total_fixes": len(fixes),
        "successful_fixes": successful,
        "failed_fixes": failed_count,
        "average_confidence": avg_conf,
        "generated_at": datetime.utcnow().isoformat(),
    }