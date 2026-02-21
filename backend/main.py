from dotenv import load_dotenv
load_dotenv()

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers from routes folder
from routes.analyze import router as analyze_router
from routes.status import router as status_router
from routes.results import router as results_router
from routes.auth import router as auth_router


app = FastAPI(
    title="My FastAPI App",
    description="FastAPI with folder-based routing",
    version="1.0.0"
)

def _parse_cors_origins() -> list[str]:
    configured_origins = os.getenv("BACKEND_CORS_ORIGINS", "")
    origins = [origin.strip().rstrip("/") for origin in configured_origins.split(",") if origin.strip()]

    frontend_url = os.getenv("FRONTEND_URL", "").strip().rstrip("/")
    if frontend_url:
        origins.append(frontend_url)

    if not origins:
        origins = [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "https://auto-patch-git-main-1nt24cs258sharan-2909s-projects.vercel.app",
        ]

    return list(dict.fromkeys(origins))


cors_allow_origin_regex = os.getenv("BACKEND_CORS_ORIGIN_REGEX")
cors_origins = _parse_cors_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=cors_allow_origin_regex or None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Include Routers --------------------
app.include_router(analyze_router, prefix="/api", tags=["Analyze"])
app.include_router(status_router, prefix="/api", tags=["Status"])
app.include_router(results_router, prefix="/api", tags=["Results"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

# -------------------- Root Route --------------------
@app.get("/")
def root():
    return {"message": "FastAPI running with folder-based routing 🚀"}
