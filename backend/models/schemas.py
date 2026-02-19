from pydantic import BaseModel
from typing import Optional


class AnalyzeRequest(BaseModel):
    repo_url: str
    team_name: str
    leader_name: str
    github_token:str


class AnalyzeResponse(BaseModel):
    status: str
    message: Optional[str] = None