import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text
from app.db.session import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(String, unique=True, index=True, nullable=False) # e.g., TSR-100293
    customer_name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    customer_email = Column(String, nullable=True) # New Field
    pickup_location = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    dropoff_location = Column(String, nullable=True) # New Field
    trip_date = Column(DateTime, nullable=False)
    vehicle_name = Column(String, nullable=False) # Mahindra Mini Bus or Maruti Omni Van
    passengers = Column(Integer, nullable=False)
    trip_type = Column(String, nullable=False) # e.g. Family Trip, Temple Tour
    special_notes = Column(Text, nullable=True)
    status = Column(String, default="pending")  # pending, confirmed, completed, cancelled
    payment_status = Column(String, default="unpaid") # unpaid, paid
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
