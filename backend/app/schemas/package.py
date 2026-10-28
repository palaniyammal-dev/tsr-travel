from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PackageBase(BaseModel):
    destination: str
    duration: str
    distance: str
    price: int
    image_url: str
    is_active: Optional[bool] = True

class PackageCreate(PackageBase):
    pass

class PackageUpdate(BaseModel):
    destination: Optional[str] = None
    duration: Optional[str] = None
    distance: Optional[str] = None
    price: Optional[int] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None

class PackageResponse(PackageBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
