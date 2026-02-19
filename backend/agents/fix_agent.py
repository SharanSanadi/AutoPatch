import random
from datetime import datetime


# Fix templates per bug type
FIX_STRATEGIES = {
    "IMPORT": {
        "action": "correct the import statement",
        "patch_template": "Replace incorrect import with the proper module path or function name.",
        "confidence_range": (0.88, 0.97),
    },
    "SYNTAX": {
        "action": "add the missing syntax element",
        "patch_template": "Insert the missing colon, parenthesis, or bracket at the correct position.",
        "confidence_range": (0.92, 0.99),
    },
    "TYPE_ERROR": {
        "action": "fix the type mismatch",
        "patch_template": "Convert the value to the correct type or restructure the condition.",
        "confidence_range": (0.80, 0.93),
    },
    "INDENTATION": {
        "action": "fix the indentation block",
        "patch_template": "Add 4-space indent to the function body or block that follows a colon.",
        "confidence_range": (0.94, 0.99),
    },
    "LOGIC": {
        "action": "correct the business logic",
        "patch_template": "Remove or adjust the erroneous arithmetic/conditional producing wrong output.",
        "confidence_range": (0.70, 0.87),
    },
    "LINTING": {
        "action": "remove the import statement",
        "patch_template": "Delete the unused or flagged import line identified by the linter.",
        "confidence_range": (0.95, 0.99),
    },
}


def generate_patch(bug: dict) -> str:
    strategy = FIX_STRATEGIES.get(bug["bug_type"], FIX_STRATEGIES["LOGIC"])
    return (
        f"# File: {bug['source_file']} | Line: {bug['line_number']}\n"
        f"# Bug Type: {bug['bug_type']}\n"
        f"# Action: {strategy['action'].capitalize()}\n"
        f"# {strategy['patch_template']}\n"
        f"# Original snippet:\n"
        + "\n".join(f"#   {line}" for line in bug['error_snippet'].splitlines())
    )


def run(input_data: dict) -> dict:
    """
    Generate structured fix suggestions for each classified bug.
    Returns: list of fixes with patch, confidence, and commit message.
    """
    classified_bugs = input_data.get("classified_bugs", [])
    fixes = []

    for bug in classified_bugs:
        strategy = FIX_STRATEGIES.get(bug["bug_type"], FIX_STRATEGIES["LOGIC"])
        confidence = round(random.uniform(*strategy["confidence_range"]), 2)

        # Simulate ~90% success rate
        status = "FIXED" if confidence >= 0.75 else "FAILED"

        commit_msg = (
            f"[AI-AGENT] Fix {bug['bug_type']} in {bug['source_file']} "
            f"line {bug['line_number']}: {strategy['action']}"
        )

        fixes.append({
            "file_name": bug["source_file"],
            "test_file": bug["test_file"],
            "bug_type": bug["bug_type"],
            "line_number": bug["line_number"],
            "bug_description": bug["bug_description"],
            "suggested_patch": generate_patch(bug),
            "commit_message": commit_msg,
            "confidence_score": confidence,
            "status": status,
            "dashboard_output": (
                f"{bug['bug_type']} error in {bug['source_file']} "
                f"line {bug['line_number']} → Fix: {strategy['action']}"
            ),
            "fixed_at": datetime.utcnow().isoformat()
        })

    successful = [f for f in fixes if f["status"] == "FIXED"]
    failed = [f for f in fixes if f["status"] == "FAILED"]

    return {
        "fixes": fixes,
        "total_fixes": len(fixes),
        "successful_fixes": len(successful),
        "failed_fixes": len(failed),
        "average_confidence": round(
            sum(f["confidence_score"] for f in fixes) / len(fixes), 2
        ) if fixes else 0,
        "generated_at": datetime.utcnow().isoformat()
    }
