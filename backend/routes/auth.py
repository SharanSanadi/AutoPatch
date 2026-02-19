import os
import requests 
from fastapi import APIRouter
from fastapi.responses import RedirectResponse

router = APIRouter()

CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")


# Step 1: redirect user to GitHub login
@router.get("/login")
def github_login():
    github_auth_url = (
        f"https://github.com/login/oauth/authorize"
        f"?client_id={CLIENT_ID}&scope=repo"
    )
    return RedirectResponse(github_auth_url)


# Step 2: GitHub sends code here
@router.get("/callback")
def github_callback(code: str):

    token_url = "https://github.com/login/oauth/access_token"

    response = requests.post(
        token_url,
        headers={"Accept": "application/json"},
        data={
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
        },
    )

    access_token = response.json().get("access_token")

    return {"access_token": access_token}