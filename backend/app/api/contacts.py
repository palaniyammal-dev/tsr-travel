from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.contact import ContactMessage
from app.schemas.contact import ContactCreate, ContactResponse, ContactUpdate
from app.api import deps

router = APIRouter()

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact_message(
    message_in: ContactCreate,
    db: Session = Depends(get_db)
):
    db_message = ContactMessage(**message_in.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/", response_model=List[ContactResponse])
def get_contact_messages(
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin),
    unread_only: bool = False
):
    query = db.query(ContactMessage)
    if unread_only:
        query = query.filter(ContactMessage.is_read == False)
    return query.order_by(ContactMessage.created_at.desc()).all()

@router.put("/{message_id}", response_model=ContactResponse)
def update_contact_message_status(
    message_id: int,
    message_in: ContactUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Contact message not found")
        
    update_data = message_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(message, field, value)
        
    db.commit()
    db.refresh(message)
    return message

@router.delete("/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.RoleChecker(["super-admin", "admin"]))
):
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Contact message not found")
    db.delete(message)
    db.commit()
    return None
