from fastapi import APIRouter
from models.schemas import AnalyzeRequest, AnalyzeResponse

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(data: AnalyzeRequest):
    """
    Runs the AI DevOps agent pipeline.
    Heavy imports kept inside function for safe startup.
    """

    from orchestrator.agent_runner import run_pipeline

    run_pipeline(
        repo_url=data.repo_url,
        github_token=data.github_token
    )

    return AnalyzeResponse(
        status="success",
        message="Agent pipeline executed successfully"
    )
