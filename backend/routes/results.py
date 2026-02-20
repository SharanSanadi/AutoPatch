from fastapi import APIRouter
import json
import os

router = APIRouter()

RESULT_FILE = "results.json"


@router.get("/results")
async def get_results():
    if os.path.exists(RESULT_FILE):
        with open(RESULT_FILE, "r") as f:
            return json.load(f)

    return {"message": "No results yet"}