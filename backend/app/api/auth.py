from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.db.session import get_db
from app.models.admin import Admin
from app.schemas.admin import AdminCreate, AdminResponse, Token
from app.core import security
from app.core.config import settings
from app.api import deps

router = APIRouter()

@router.post("/register", response_model=AdminResponse)
def register_admin(
    admin_in: AdminCreate,
    db: Session = Depends(get_db),
    # Optional dependency: only allow existing super-admin to create admins unless DB has no admins
):
    # Check if this email is already registered
    existing_admin = db.query(Admin).filter(Admin.email == admin_in.email).first()
    if existing_admin:
        raise HTTPException(
            status_code=400,
            detail="An admin with this email already exists."
        )

    # First user registered in the system becomes the super-admin automatically
    admin_count = db.query(Admin).count()
    assigned_role = "super-admin" if admin_count == 0 else admin_in.role

    hashed_password = security.get_password_hash(admin_in.password)
    db_admin = Admin(
        email=admin_in.email,
        hashed_password=hashed_password,
        full_name=admin_in.full_name,
        role=assigned_role,
        is_active=True
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@router.post("/login", response_model=Token)
def login_admin(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    admin = db.query(Admin).filter(Admin.email == form_data.username).first()
    if not admin or not security.verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive admin account"
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        admin.email, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": admin.role,
        "full_name": admin.full_name
    }

@router.get("/me", response_model=AdminResponse)
def read_current_admin(
    current_admin: Admin = Depends(deps.get_current_active_admin)
):
    return current_admin
