import os
from openai import OpenAI
from dotenv import load_dotenv

# load .env variables
load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# -----------------------------------
# BUG CLASSIFICATION (BUG AGENT)
# -----------------------------------

VALID_CATEGORIES = {
    "IMPORT", "SYNTAX", "TYPE_ERROR",
    "INDENTATION", "LOGIC", "LINTING"
}

FALLBACK_KEYWORDS = {
    "IMPORT": ["importerror", "cannot import", "no module named"],
    "SYNTAX": ["syntaxerror", "invalid syntax", "missing colon"],
    "TYPE_ERROR": ["typeerror", "not iterable", "unsupported operand"],
    "INDENTATION": ["indentationerror", "expected an indented"],
    "LINTING": ["unused", "undefined", "pep8", "flake8"],
    "LOGIC": ["assertionerror", "expected", "wrong value"],
}


def keyword_fallback(error_text: str) -> str:
    """Rule-based classifier used if AI fails."""
    lowered = error_text.lower()
    for category, keywords in FALLBACK_KEYWORDS.items():
        if any(kw in lowered for kw in keywords):
            return category
    return "LOGIC"


def ai_classify(error_text: str) -> str:
    """
    Classify Python error into bug category using GPT.
    """

    if not error_text or not error_text.strip():
        return "LOGIC"

    prompt = f"""You are a Python bug classifier for a CI/CD agent.

Classify the error below into EXACTLY ONE of these categories:
IMPORT, SYNTAX, TYPE_ERROR, INDENTATION, LOGIC, LINTING

Respond with ONLY the category name.

Error:
{error_text.strip()}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=10,
        )

        raw = response.choices[0].message.content.strip().upper()

        if raw in VALID_CATEGORIES:
            return raw

        normalized = raw.replace(" ", "_").replace("-", "_")
        if normalized in VALID_CATEGORIES:
            return normalized

        return keyword_fallback(error_text)

    except Exception:
        return keyword_fallback(error_text)


# -----------------------------------
# FIX GENERATION (FIX AGENT)
# -----------------------------------

def generate_fix(prompt: str) -> str:
    """
    Generate code fix suggestion using GPT.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    return response.choices[0].message.content.strip()