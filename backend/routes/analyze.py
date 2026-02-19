from fastapi import APIRouter
from models.schemas import AnalyzeRequest, AnalyzeResponse
from orchestrator.agent_runner import run_pipeline

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(data: AnalyzeRequest):

    # run pipeline
    run_pipeline(
    repo_url=data.repo_url,
    github_token=data.github_token
)
        

    return AnalyzeResponse(
        status="success",
        message="Agent pipeline executed successfully"
    )