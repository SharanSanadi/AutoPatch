from dotenv import load_dotenv
load_dotenv()

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

# -------------------- CORS Middleware --------------------
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"  # allow all (change in production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #hackathon safe 
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
