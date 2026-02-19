from datetime import datetime
from services.llm_service import ai_classify


# -------------------------------
# Rule-based fallback classifier
# -------------------------------
CLASSIFICATION_RULES = [
    ("IMPORT",      ["importerror", "cannot import", "no module named", "import name"]),
    ("SYNTAX",      ["syntaxerror", "missing colon", "invalid syntax", "unexpected token"]),
    ("TYPE_ERROR",  ["typeerror", "argument of type", "not iterable", "unsupported operand"]),
    ("INDENTATION", ["indentationerror", "expected an indented", "unindent"]),
    ("LOGIC",       ["assertionerror", "expected", "off-by-one", "incorrect", "wrong value"]),
    ("LINTING",     ["unused", "undefined", "no-unused", "flake8", "pylint", "pep8"]),
]

BUG_TYPE_DESCRIPTIONS = {
    "IMPORT": "Missing or incorrect import statement",
    "SYNTAX": "Python syntax violation preventing execution",
    "TYPE_ERROR": "Incompatible type passed to function or operator",
    "INDENTATION": "Indentation does not match expected block structure",
    "LOGIC": "Code runs but produces incorrect output",
    "LINTING": "Code style or quality issue flagged by linter",
}


def classify_error(raw_error: str, error_snippet: str) -> str:
    """Fallback keyword-based classifier."""
    combined = (raw_error + " " + error_snippet).lower()

    for bug_type, keywords in CLASSIFICATION_RULES:
        if any(kw in combined for kw in keywords):
            return bug_type

    return "LOGIC"


# -------------------------------
# Main Agent Entry
# -------------------------------
def run(input_data: dict) -> dict:
    """
    Classify each test failure into structured bug categories.
    Uses AI first, then rule fallback.
    """

    failures = input_data.get("failures", [])
    classified = []

    for failure in failures:

        raw_error = failure.get("raw_error", "")
        snippet = failure.get("error_snippet", "")

        # ---- AI classification ----
        bug_type = ai_classify(raw_error)

        # ---- fallback if AI invalid ----
        if not bug_type or bug_type not in BUG_TYPE_DESCRIPTIONS:
            bug_type = classify_error(raw_error, snippet)

        classified.append({
            "source_file": failure.get("source_file", "unknown"),
            "test_file": failure.get("test_file", "unknown"),
            "test_name": failure.get("test_name", "unknown"),
            "line_number": failure.get("line", 0),
            "bug_type": bug_type,
            "bug_description": BUG_TYPE_DESCRIPTIONS[bug_type],
            "raw_error": raw_error,
            "error_snippet": snippet,
            "dashboard_label": f"{bug_type} error in {failure.get('source_file','unknown')} line {failure.get('line',0)}",
            "classified_at": datetime.utcnow().isoformat()
        })

    # ---- Build summary ----
    type_counts = {}
    for bug in classified:
        bt = bug["bug_type"]
        type_counts[bt] = type_counts.get(bt, 0) + 1

    return {
        "classified_bugs": classified,
        "bug_type_summary": type_counts,
        "total_classified": len(classified),
        "classified_at": datetime.utcnow().isoformat()
    }
    
