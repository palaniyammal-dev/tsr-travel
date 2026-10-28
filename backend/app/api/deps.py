from typing import Generator, List
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.core import security
from app.core.config import settings
from app.db.session import get_db
from app.models.admin import Admin
from app.schemas.admin import TokenData

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

def get_current_admin(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> Admin:
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenData(email=payload.get("sub"))
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    admin = db.query(Admin).filter(Admin.email == token_data.email).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin user not found")
    return admin

def get_current_active_admin(
    current_admin: Admin = Depends(get_current_admin),
) -> Admin:
    if not current_admin.is_active:
        raise HTTPException(status_code=400, detail="Inactive admin user")
    return current_admin

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(
        self, current_admin: Admin = Depends(get_current_active_admin)
    ) -> Admin:
        if current_admin.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have enough permissions to perform this action",
            )
        return current_admin
