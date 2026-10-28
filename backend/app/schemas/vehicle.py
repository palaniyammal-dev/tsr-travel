from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VehicleBase(BaseModel):
    name: str
    capacity: str
    features: str
    image_url: str
    is_available: Optional[bool] = True

class VehicleCreate(VehicleBase):
    pass

class VehicleUpdate(BaseModel):
    name: Optional[str] = None
    capacity: Optional[str] = None
    features: Optional[str] = None
    image_url: Optional[str] = None
    is_available: Optional[bool] = None

class VehicleResponse(VehicleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
