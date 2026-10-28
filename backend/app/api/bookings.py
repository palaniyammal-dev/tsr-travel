import random
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from datetime import datetime

from app.db.session import get_db
from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingResponse, BookingUpdate
from app.api import deps

router = APIRouter()

def generate_booking_id(db: Session) -> str:
    while True:
        booking_id = f"TSR-{random.randint(100000, 999999)}"
        # Verify uniqueness
        exists = db.query(Booking).filter(Booking.booking_id == booking_id).first()
        if not exists:
            return booking_id

@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking(
    booking_in: BookingCreate,
    db: Session = Depends(get_db)
):
    booking_id = generate_booking_id(db)
    
    db_booking = Booking(
        booking_id=booking_id,
        customer_name=booking_in.customer_name,
        phone_number=booking_in.phone_number,
        pickup_location=booking_in.pickup_location,
        destination=booking_in.destination,
        trip_date=booking_in.trip_date,
        vehicle_name=booking_in.vehicle_name,
        passengers=booking_in.passengers,
        trip_type=booking_in.trip_type,
        special_notes=booking_in.special_notes,
        status="pending"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[BookingResponse])
def get_bookings(
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin),
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    search: Optional[str] = None
):
    query = db.query(Booking)
    
    if status:
        query = query.filter(Booking.status == status)
    
    if search:
        query = query.filter(
            (Booking.customer_name.ilike(f"%{search}%")) |
            (Booking.phone_number.ilike(f"%{search}%")) |
            (Booking.booking_id.ilike(f"%{search}%"))
        )
        
    return query.order_by(Booking.created_at.desc()).offset(skip).limit(limit).all()

@router.get("/{booking_id_str}", response_model=BookingResponse)
def get_booking_by_id(
    booking_id_str: str,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    booking = db.query(Booking).filter(Booking.booking_id == booking_id_str).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.put("/{booking_id_str}", response_model=BookingResponse)
def update_booking(
    booking_id_str: str,
    booking_in: BookingUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    booking = db.query(Booking).filter(Booking.booking_id == booking_id_str).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
        
    update_data = booking_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(booking, field, value)
        
    db.commit()
    db.refresh(booking)
    return booking

@router.delete("/{booking_id_str}", status_code=status.HTTP_204_NO_CONTENT)
def delete_booking(
    booking_id_str: str,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.RoleChecker(["super-admin", "admin"]))
):
    booking = db.query(Booking).filter(Booking.booking_id == booking_id_str).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return None
