from fastapi import APIRouter
from models.schemas import AnalyzeRequest, AnalyzeResponse

# create router
router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(data: AnalyzeRequest):
    """
    Runs the AI DevOps agent pipeline.
    IMPORTANT:
    Heavy imports are kept inside the function
    so the server can start without crashing.
    """

    # lazy import (VERY IMPORTANT for deployment)
    from orchestrator.agent_runner import run_pipeline

    # run agent pipeline
    run_pipeline(
        repo_url=data.repo_url,
        github_token=data.github_token
    )

    # response returned to frontend
    return AnalyzeResponse(
        status="success",
        message="Agent pipeline executed successfully"
    )