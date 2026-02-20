from datetime import datetime


# Classification rules: keyword patterns → bug type
CLASSIFICATION_RULES = [
    ("IMPORT",      ["importerror", "cannot import", "no module named", "import name"]),
    ("SYNTAX",      ["syntaxerror", "missing colon", "invalid syntax", "unexpected token"]),
    ("TYPE_ERROR",  ["typeerror", "argument of type", "not iterable", "unsupported operand"]),
    ("INDENTATION", ["indentationerror", "expected an indented", "unindent"]),
    ("LOGIC",       ["assertionerror", "expected", "off-by-one", "incorrect", "wrong value"]),
    ("LINTING",     ["unused", "undefined", "no-unused", "flake8", "pylint", "pep8"]),
]

BUG_TYPE_DESCRIPTIONS = {
    "IMPORT":      "Missing or incorrect import statement",
    "SYNTAX":      "Python syntax violation preventing execution",
    "TYPE_ERROR":  "Incompatible type passed to function or operator",
    "INDENTATION": "Indentation does not match expected block structure",
    "LOGIC":       "Code runs but produces incorrect output",
    "LINTING":     "Code style or quality issue flagged by linter",
}


def classify_error(raw_error: str, error_snippet: str) -> str:
    combined = (raw_error + " " + error_snippet).lower()
    for bug_type, keywords in CLASSIFICATION_RULES:
        if any(kw in combined for kw in keywords):
            return bug_type
    return "LOGIC"  # default fallback


def run(input_data: dict) -> dict:
    """
    Classify each test failure into a structured bug category.
    Returns: list of classified bugs with metadata.
    """
    failures = input_data.get("failures", [])
    classified = []

    for failure in failures:
        bug_type = classify_error(
            failure.get("raw_error", ""),
            failure.get("error_snippet", "")
        )
        classified.append({
            "source_file": failure["source_file"],
            "test_file": failure["test_file"],
            "test_name": failure["test_name"],
            "line_number": failure["line"],
            "bug_type": bug_type,
            "bug_description": BUG_TYPE_DESCRIPTIONS[bug_type],
            "raw_error": failure["raw_error"],
            "error_snippet": failure["error_snippet"],
            "dashboard_label": f"{bug_type} error in {failure['source_file']} line {failure['line']}",
            "classified_at": datetime.utcnow().isoformat()
        })

    # Build type frequency summary
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