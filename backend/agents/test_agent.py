import random
from datetime import datetime


SIMULATED_FAILURES = [
    {
        "test_file": "tests/test_utils.py",
        "test_name": "test_format_date",
        "source_file": "src/utils.py",
        "line": 15,
        "raw_error": "ImportError: No module named 'os'",
        "error_snippet": "import os\nimport sys\nimport re  # unused",
    },
    {
        "test_file": "tests/test_validator.py",
        "test_name": "test_email_validation",
        "source_file": "src/validator.py",
        "line": 8,
        "raw_error": "SyntaxError: invalid syntax — missing colon after if statement",
        "error_snippet": "if email is None\n    return False",
    },
    {
        "test_file": "tests/test_utils.py",
        "test_name": "test_calculate_total",
        "source_file": "src/utils.py",
        "line": 42,
        "raw_error": "AssertionError: expected 100 but got 110 — off-by-one logic error",
        "error_snippet": "total = sum(items) + 10  # incorrect bonus added",
    },
    {
        "test_file": "tests/test_auth.py",
        "test_name": "test_hash_password",
        "source_file": "src/services/auth.py",
        "line": 67,
        "raw_error": "TypeError: argument of type 'int' is not iterable",
        "error_snippet": "if user_id in 12345:  # should be a list",
    },
    {
        "test_file": "tests/test_auth.py",
        "test_name": "test_token_expiry",
        "source_file": "src/services/auth.py",
        "line": 92,
        "raw_error": "ImportError: cannot import name 'jwt_decode' from 'jwt'",
        "error_snippet": "from jwt import jwt_decode  # wrong function name",
    },
    {
        "test_file": "tests/test_validator.py",
        "test_name": "test_parse_json",
        "source_file": "src/validator.py",
        "line": 34,
        "raw_error": "IndentationError: expected an indented block after function definition",
        "error_snippet": "def parse_json(data):\nreturn json.loads(data)",
    },
]


def run(input_data: dict) -> dict:
    """
    Discover all test files and simulate running them.
    Returns: test results with failures list.
    """
    repo_meta = input_data.get("repo_meta", {})
    test_files = repo_meta.get("test_files", [])

    # Simulate some tests passing, some failing
    total_tests = random.randint(18, 25)
    failures = SIMULATED_FAILURES  # In real agent, parse pytest/unittest output

    passed = total_tests - len(failures)

    return {
        "test_files_discovered": test_files,
        "total_tests": total_tests,
        "passed": passed,
        "failed": len(failures),
        "failures": failures,
        "runner": "pytest",
        "run_command": "pytest tests/ --tb=short -q",
        "executed_at": datetime.utcnow().isoformat()
    }