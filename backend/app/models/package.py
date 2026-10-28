import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.db.session import Base

class TourPackage(Base):
    __tablename__ = "tour_packages"

    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String, nullable=False, unique=True) # e.g. "Ooty", "Kodaikanal"
    duration = Column(String, nullable=False) # e.g. "2 Days / 1 Night"
    distance = Column(String, nullable=False) # e.g. "260 km"
    price = Column(Integer, nullable=False) # e.g. 5000 (starting price)
    image_url = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
