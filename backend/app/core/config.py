import os
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    PROJECT_NAME: str = "TSR TRAVEL API"
    API_V1_STR: str = "/api"
    
    # Security
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    
    # DB
    DATABASE_URL: str = "sqlite:///./tsr_travel.db"
    
    # Redis
    REDIS_URL: str = "redis://redis:6379/0"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "*"]
    
    # Cloudinary (Optional, with local fallback)
    CLOUDINARY_CLOUD_NAME: Optional[str] = None
    CLOUDINARY_API_KEY: Optional[str] = None
    CLOUDINARY_API_SECRET: Optional[str] = None
    
    # Local uploads directory (fallback)
    UPLOAD_DIR: str = "uploads"

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
