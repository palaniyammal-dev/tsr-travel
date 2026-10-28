import datetime
from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from app.db.session import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(String, index=True, nullable=False)
    razorpay_order_id = Column(String, unique=True, index=True, nullable=False)
    razorpay_payment_id = Column(String, nullable=True)
    razorpay_signature = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    status = Column(String, default="created")  # created, authorized, captured, failed
    payment_method = Column(String, nullable=True)  # UPI, card, netbanking, cash
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
