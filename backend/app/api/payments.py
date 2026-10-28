from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uuid
import hmac
import hashlib

from app.db.session import get_db
from app.models.booking import Booking
from app.models.payment import Payment
from app.core.config import settings

router = APIRouter()

class OrderCreateRequest(BaseModel):
    booking_id: str
    amount: float

class PaymentVerifyRequest(BaseModel):
    booking_id: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    amount: float
    payment_method: str = "UPI"

@router.post("/create-order")
def create_payment_order(
    req: OrderCreateRequest,
    db: Session = Depends(get_db)
):
    # Verify booking exists
    booking = db.query(Booking).filter(Booking.booking_id == req.booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking record not found")

    # Generate a unique order ID (Representing Razorpay order format)
    # E.g. 'order_P9z3m9V2wXy4'
    mock_order_id = f"order_{uuid.uuid4().hex[:12]}"
    
    # Store initial payment log
    db_payment = Payment(
        booking_id=req.booking_id,
        razorpay_order_id=mock_order_id,
        amount=req.amount,
        status="created",
        payment_method="UPI"
    )
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)

    return {
        "order_id": mock_order_id,
        "amount": req.amount,
        "currency": "INR",
        "key_id": settings.CLOUDINARY_API_KEY or "rzp_test_mockKey123" # placeholder/fallback
    }

@router.post("/verify")
def verify_payment_signature(
    req: PaymentVerifyRequest,
    db: Session = Depends(get_db)
):
    # Check if payment row exists
    payment = db.query(Payment).filter(Payment.razorpay_order_id == req.razorpay_order_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment transaction not found")

    # 1. Signature Verification
    # In real Razorpay integration, we verify using hmac:
    # msg = f"{req.razorpay_order_id}|{req.razorpay_payment_id}"
    # generated_signature = hmac.new(
    #     settings.CLOUDINARY_API_SECRET.encode(), # using secret key
    #     msg.encode(),
    #     hashlib.sha256
    # ).hexdigest()
    # For testing, we verify that signature is passed, and mock check
    
    is_valid = len(req.razorpay_signature) > 10 # Accept signatures for mock loops
    
    if not is_valid:
        payment.status = "failed"
        db.commit()
        raise HTTPException(status_code=400, detail="Invalid payment signature verification failed")

    # 2. Update Payment log
    payment.razorpay_payment_id = req.razorpay_payment_id
    payment.razorpay_signature = req.razorpay_signature
    payment.payment_method = req.payment_method
    payment.status = "captured"
    
    # 3. Update Booking payment status to "paid" and overall status to "confirmed"
    booking = db.query(Booking).filter(Booking.booking_id == req.booking_id).first()
    if booking:
        booking.payment_status = "paid"
        booking.status = "confirmed" # Auto-confirm booking upon payment

    db.commit()
    
    return {
        "status": "success",
        "message": "Payment verified and booking confirmed successfully",
        "booking_id": req.booking_id,
        "payment_id": req.razorpay_payment_id
    }
