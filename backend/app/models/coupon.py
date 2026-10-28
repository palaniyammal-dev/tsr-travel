import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from app.db.session import Base

class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True, nullable=False)
    discount_amount = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    expiry_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
