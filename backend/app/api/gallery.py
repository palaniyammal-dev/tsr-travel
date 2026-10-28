from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.gallery import GalleryItem
from app.schemas.gallery import GalleryCreate, GalleryResponse, GalleryUpdate
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[GalleryResponse])
def get_gallery_items(
    db: Session = Depends(get_db),
    category: Optional[str] = None,
    active_only: bool = True
):
    query = db.query(GalleryItem)
    if active_only:
        query = query.filter(GalleryItem.is_active == True)
    if category:
        query = query.filter(GalleryItem.category == category)
    return query.order_by(GalleryItem.created_at.desc()).all()

@router.post("/", response_model=GalleryResponse, status_code=status.HTTP_201_CREATED)
def create_gallery_item(
    item_in: GalleryCreate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    db_item = GalleryItem(**item_in.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=GalleryResponse)
def update_gallery_item(
    item_id: int,
    item_in: GalleryUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
        
    update_data = item_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
        
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_gallery_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.RoleChecker(["super-admin", "admin"]))
):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return None
