from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    tamil_name = Column(String(100), nullable=True)
    code = Column(String(10), nullable=True)
    center_lat = Column(Float, nullable=False)
    center_lng = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    banner_image = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    destinations = relationship("TouristDestination", back_populates="district", cascade="all, delete-orphan")
