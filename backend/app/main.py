import os
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import time

from app.core.config import settings
from app.api.api import api_router
from app.db.session import engine, Base, SessionLocal
from app.db.seed_districts import seed_districts_and_destinations

# Create DB tables if they do not exist (Automatic DB setup for simple initialization)
Base.metadata.create_all(bind=engine)

# Seed districts and tourist attractions safely & idempotently
try:
    with SessionLocal() as db_session:
        seed_districts_and_destinations(db_session)
except Exception as e:
    print(f"Warning: District seeding encountered an issue: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# simple custom in-memory rate limiter middleware for protection
IP_REQUESTS = {}
RATE_LIMIT_MAX = 60 # 60 requests
RATE_LIMIT_WINDOW = 60 # per 60 seconds

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host
    current_time = time.time()
    
    # Clean old requests
    IP_REQUESTS[client_ip] = [
        t for t in IP_REQUESTS.get(client_ip, [])
        if current_time - t < RATE_LIMIT_WINDOW
    ]
    
    if len(IP_REQUESTS[client_ip]) >= RATE_LIMIT_MAX:
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={"detail": "Too many requests. Please try again later."}
        )
        
    IP_REQUESTS[client_ip].append(current_time)
    response = await call_next(request)
    return response

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount(f"/{settings.UPLOAD_DIR}", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

@app.get("/health", tags=["health"])
def health_check():
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "timestamp": time.time()
    }

app.include_router(api_router, prefix=settings.API_V1_STR)
