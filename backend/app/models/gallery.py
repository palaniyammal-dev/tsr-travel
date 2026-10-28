import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from app.db.session import Base

class GalleryItem(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    caption = Column(String, nullable=True)
    category = Column(String, nullable=False)  # vehicle, temple, family, hill_station, scenery
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
