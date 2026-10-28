import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from app.db.session import Base

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True) # e.g. Mahindra Mini Bus, Maruti Omni Van
    capacity = Column(String, nullable=False) # e.g. 20+ seats
    features = Column(Text, nullable=False) # e.g. AC, GPS, Music System
    image_url = Column(String, nullable=False) # Local or Cloudinary URL
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
