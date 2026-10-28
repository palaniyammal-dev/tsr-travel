import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from app.db.session import Base

class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    rating = Column(Integer, nullable=False, default=5)
    comment = Column(Text, nullable=False)
    avatar_url = Column(String, nullable=True)
    is_approved = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
