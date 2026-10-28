from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class TouristDestination(Base):
    __tablename__ = "tourist_destinations"

    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=False, index=True)
    name = Column(String(150), nullable=False, index=True)
    tamil_name = Column(String(150), nullable=True)
    category = Column(String(50), nullable=False, index=True) # Temples, Heritage, Waterfalls, Dams, Beaches, Hill Stations, Picnic Spots, Wildlife & Nature
    description = Column(Text, nullable=True)
    tamil_description = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    distance_from_trichy_km = Column(Float, nullable=True)
    est_travel_time_hours = Column(Float, nullable=True)
    best_time_to_visit = Column(String(100), nullable=True)
    visiting_hours = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    district = relationship("District", back_populates="destinations")
