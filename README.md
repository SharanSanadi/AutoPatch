# AutoPatch 
🚀 AutoPatch — Autonomous DevOps AI Agent

📌 Project Overview

AutoPatch is an Autonomous DevOps Agent designed to automatically detect, fix, and verify software failures inside CI/CD pipelines.
Instead of developers manually debugging failing builds, AutoPatch analyzes repositories, identifies bugs, generates fixes using AI, commits corrections to a new branch, and presents results through a live React dashboard.

The system reduces debugging effort and demonstrates how AI agents can automate modern DevOps workflows.

---

🎯 Problem Statement

Modern CI/CD pipelines frequently fail due to:

- Syntax errors
- Logic bugs
- Type errors
- Import issues
- Linting violations
- Indentation problems

Developers spend significant time diagnosing failures.
AutoPatch solves this by creating an end-to-end autonomous debugging pipeline.

---

🧠 Core Features

✅ Accepts GitHub repository URL from dashboard
✅ Clones and analyzes repository structure
✅ Automatically discovers test files
✅ Detects failures and classifies bug types
✅ Generates AI-powered fixes
✅ Creates a new branch with fixes
✅ Commits with "[AI-AGENT]" prefix
✅ Pushes corrected code to GitHub
✅ Simulates CI/CD reruns and scoring
✅ Displays full results in React dashboard

---

🏗️ Architecture

Multi-Agent System

React Dashboard
        ↓
FastAPI Backend (API Layer)
        ↓
Agent Orchestrator
        ↓
------------------------------------------------
Repo Agent   → Clone & scan repo
Test Agent   → Discover failures
Bug Agent    → Classify errors
Fix Agent    → Generate patches (LLM)
Git Agent    → Commit & push fixes
CI/CD Agent  → Score & pipeline simulation
------------------------------------------------
        ↓
results.json → Dashboard Visualization

---

🖥️ Tech Stack

Frontend

- React (Functional Components + Hooks)
- Context API / State Management
- Tailwind / CSS
- Hosted on Render/Vercel

Backend

- FastAPI
- Python
- GitPython
- OpenAI API
- REST API Architecture

AI / Agents

- Multi-agent orchestration
- LLM-based bug classification
- AI patch generation

---

📂 Project Structure

AutoPatch/
│
├── frontend/          # React dashboard
│
├── backend/
│   ├── agents/
│   │   ├── repo_agent.py
│   │   ├── test_agent.py
│   │   ├── bug_agent.py
│   │   ├── fix_agent.py
│   │   ├── git_agent.py
│   │   └── cicd_agent.py
│   │
│   ├── orchestrator/
│   │   └── agent_runner.py
│   │
│   ├── routes/
│   │   └── analyze.py
│   │
│   ├── services/
│   │   └── llm_service.py
│   │
│   ├── main.py
│   └── results.json
│
└── README.md

---

⚙️ Installation & Setup

1️⃣ Clone Repository

git clone https://github.com/YOUR_USERNAME/AutoPatch.git
cd AutoPatch/backend

---

2️⃣ Create Virtual Environment

python -m venv venv
venv\Scripts\activate

---

3️⃣ Install Dependencies
pip install -r requirements.txt

---
4️⃣ Environment Variables

Create ".env" file:

OPENAI_API_KEY=your_openai_key
GITHUB_TOKEN=your_github_token

---
5️⃣ Run Backend

uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000

---

6️⃣ Run Frontend

cd ../frontend
npm install
npm run dev

---

🌐 Live Deployment

- 🔗 Live Application:
- 🔗 Backend API: https://autopatch-4.onrender.com/api/analyze

---

📊 Dashboard Features

✅ Input Section

- GitHub repo URL
- Team name
- Leader name
- Run Agent button

✅ Run Summary

- Branch created
- Failures detected
- Fixes applied
- Final CI/CD status

✅ Score Breakdown

- Base Score: 100
- Speed bonus
- Efficiency penalty
- Final score visualization

✅ Fix Table

File| Bug Type| Line| Commit| Status

✅ CI/CD Timeline

- Iteration history
- Pass/fail status
- Execution timestamps
---

🌿 Branch Naming Format
TEAM_NAME_LEADER_NAME_AI_Fix
Example:
RIFT_ORGANISERS_SAIYAM_KUMAR_AI_Fix
Rules:

- Uppercase only
- Spaces → underscor
