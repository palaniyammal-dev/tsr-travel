from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialResponse, TestimonialUpdate
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[TestimonialResponse])
def get_testimonials(
    db: Session = Depends(get_db),
    approved_only: bool = True
):
    query = db.query(Testimonial)
    if approved_only:
        query = query.filter(Testimonial.is_approved == True)
    return query.order_by(Testimonial.created_at.desc()).all()

@router.post("/", response_model=TestimonialResponse, status_code=status.HTTP_201_CREATED)
def create_testimonial(
    testimonial_in: TestimonialCreate,
    db: Session = Depends(get_db)
):
    db_testimonial = Testimonial(**testimonial_in.model_dump())
    db.add(db_testimonial)
    db.commit()
    db.refresh(db_testimonial)
    return db_testimonial

@router.put("/{testimonial_id}", response_model=TestimonialResponse)
def update_testimonial(
    testimonial_id: int,
    testimonial_in: TestimonialUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    update_data = testimonial_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(testimonial, field, value)
        
    db.commit()
    db.refresh(testimonial)
    return testimonial

@router.delete("/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.RoleChecker(["super-admin", "admin"]))
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()
    return None
