from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class BookingBase(BaseModel):
    customer_name: str
    phone_number: str
    pickup_location: str
    destination: str
    trip_date: datetime
    vehicle_name: str  # Mahindra Mini Bus or Maruti Omni Van
    passengers: int = Field(..., gte=1)
    trip_type: str  # Family Trip, Airport Pickup, Temple Tour, etc.
    special_notes: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BaseModel):
    customer_name: Optional[str] = None
    phone_number: Optional[str] = None
    pickup_location: Optional[str] = None
    destination: Optional[str] = None
    trip_date: Optional[datetime] = None
    vehicle_name: Optional[str] = None
    passengers: Optional[int] = None
    trip_type: Optional[str] = None
    special_notes: Optional[str] = None
    status: Optional[str] = None # pending, confirmed, completed, cancelled

class BookingResponse(BookingBase):
    id: int
    booking_id: str
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
