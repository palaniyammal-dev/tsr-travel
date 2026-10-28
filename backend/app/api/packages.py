from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.package import TourPackage
from app.schemas.package import PackageCreate, PackageResponse, PackageUpdate
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[PackageResponse])
def get_packages(
    db: Session = Depends(get_db),
    active_only: bool = True
):
    query = db.query(TourPackage)
    if active_only:
        query = query.filter(TourPackage.is_active == True)
    return query.order_by(TourPackage.destination).all()

@router.post("/", response_model=PackageResponse, status_code=status.HTTP_201_CREATED)
def create_package(
    package_in: PackageCreate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    existing = db.query(TourPackage).filter(TourPackage.destination == package_in.destination).first()
    if existing:
        raise HTTPException(status_code=400, detail="Package for this destination already exists")
        
    db_package = TourPackage(**package_in.model_dump())
    db.add(db_package)
    db.commit()
    db.refresh(db_package)
    return db_package

@router.put("/{package_id}", response_model=PackageResponse)
def update_package(
    package_id: int,
    package_in: PackageUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    package = db.query(TourPackage).filter(TourPackage.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Tour package not found")
        
    update_data = package_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(package, field, value)
        
    db.commit()
    db.refresh(package)
    return package

@router.delete("/{package_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_package(
    package_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.RoleChecker(["super-admin", "admin"]))
):
    package = db.query(TourPackage).filter(TourPackage.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Tour package not found")
    db.delete(package)
    db.commit()
    return None
