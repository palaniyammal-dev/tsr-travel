from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class TestimonialBase(BaseModel):
    name: str
    rating: int = Field(5, gte=1, lte=5)
    comment: str
    avatar_url: Optional[str] = None
    is_approved: Optional[bool] = True

class TestimonialCreate(TestimonialBase):
    pass

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    rating: Optional[int] = None
    comment: Optional[str] = None
    avatar_url: Optional[str] = None
    is_approved: Optional[bool] = None

class TestimonialResponse(TestimonialBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
