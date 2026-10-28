from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class GalleryBase(BaseModel):
    image_url: str
    caption: Optional[str] = None
    category: str  # vehicle, temple, family, hill_station, scenery
    is_active: Optional[bool] = True

class GalleryCreate(GalleryBase):
    pass

class GalleryUpdate(BaseModel):
    image_url: Optional[str] = None
    caption: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None

class GalleryResponse(GalleryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
