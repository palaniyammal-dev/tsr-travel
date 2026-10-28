from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.vehicle import Vehicle
from app.schemas.vehicle import VehicleCreate, VehicleResponse, VehicleUpdate
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[VehicleResponse])
def get_vehicles(
    db: Session = Depends(get_db),
    available_only: bool = False
):
    query = db.query(Vehicle)
    if available_only:
        query = query.filter(Vehicle.is_available == True)
    return query.order_by(Vehicle.name).all()

@router.post("/", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
def create_vehicle(
    vehicle_in: VehicleCreate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    # STRICT RULE CHECK: Only "Mahindra Mini Bus" and "Maruti Omni Van" are allowed.
    allowed_names = ["Mahindra Mini Bus", "Maruti Omni Van"]
    if vehicle_in.name not in allowed_names:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid vehicle name. Only {allowed_names} are permitted."
        )

    existing = db.query(Vehicle).filter(Vehicle.name == vehicle_in.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Vehicle already exists")
        
    db_vehicle = Vehicle(**vehicle_in.model_dump())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

@router.put("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(
    vehicle_id: int,
    vehicle_in: VehicleUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.get_current_active_admin)
):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
        
    update_data = vehicle_in.model_dump(exclude_unset=True)
    
    # STRICT RULE CHECK: Do not allow renaming to unauthorized vehicles
    if "name" in update_data:
        allowed_names = ["Mahindra Mini Bus", "Maruti Omni Van"]
        if update_data["name"] not in allowed_names:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid vehicle name. Only {allowed_names} are permitted."
            )
            
    for field, value in update_data.items():
        setattr(vehicle, field, value)
        
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_admin = Depends(deps.RoleChecker(["super-admin", "admin"]))
):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(vehicle)
    db.commit()
    return None
