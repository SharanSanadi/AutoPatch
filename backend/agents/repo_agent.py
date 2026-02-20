import os
import stat
import shutil
from datetime import datetime
from git import Repo, GitCommandError

TEMP_BASE = r"C:\temp_repos"


def remove_readonly(func, path, _):
    """Force delete read-only files on Windows."""
    os.chmod(path, stat.S_IWRITE)
    func(path)


def run(input_data: dict) -> dict:
    """
    Clone repository using GitHub OAuth token
    and return repository metadata.
    """

    repo_url = input_data.get("repo_url")
    github_token = input_data.get("github_token")

    if not repo_url:
        raise ValueError("repo_url is required")

    # ---- repo name ----
    repo_name = repo_url.rstrip("/").split("/")[-1].replace(".git", "")
    clone_path = os.path.join(TEMP_BASE, repo_name)

    # ---- clean old repo if exists ----
    if os.path.exists(clone_path):
        shutil.rmtree(clone_path, onerror=remove_readonly)

    os.makedirs(TEMP_BASE, exist_ok=True)

    # ---- build authenticated URL ----
    if github_token:
        auth_url = repo_url.replace(
            "https://",
            f"https://{github_token}@"
        )
    else:
        auth_url = repo_url

    # ---- shallow clone (stable + fast) ----
    try:
        Repo.clone_from(
            auth_url,
            clone_path,
            depth=1,
            single_branch=True
        )
    except GitCommandError as e:
        raise Exception(f"Git clone failed: {str(e)}")

    # ---- scan files ----
    all_files = []
    source_files = []
    test_files = []

    for root, _, files in os.walk(clone_path):
        for file in files:
            path = os.path.relpath(os.path.join(root, file), clone_path)

            file_info = {
                "path": path,
                "lines": 0,
                "language": "Unknown",
            }

            if path.endswith(".py"):
                file_info["language"] = "Python"
            elif path.endswith(".md"):
                file_info["language"] = "Markdown"
            elif path.endswith(".txt"):
                file_info["language"] = "Text"

            try:
                with open(
                    os.path.join(root, file),
                    "r",
                    encoding="utf-8",
                    errors="ignore",
                ) as f:
                    file_info["lines"] = sum(1 for _ in f)
            except Exception:
                pass

            all_files.append(file_info)

            if "tests" in path.lower():
                test_files.append(path)
            else:
                source_files.append(path)

    return {
        "repo_name": repo_name,
        "repo_url": repo_url,
        "clone_path": clone_path,
        "primary_language": "Python",
        "file_count": len(all_files),
        "source_files": source_files,
        "test_files": test_files,
        "all_files": all_files,
        "default_branch": "main",
        "commit_sha": "real_clone",
        "scanned_at": datetime.utcnow().isoformat(),
    }