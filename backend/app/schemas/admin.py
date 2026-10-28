from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class AdminBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = "staff"

class AdminCreate(AdminBase):
    password: str

class AdminUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None

class AdminResponse(AdminBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    full_name: Optional[str] = None

class TokenData(BaseModel):
    email: Optional[str] = None
