from fastapi import APIRouter

from app.api import auth, bookings, vehicles, packages, gallery, testimonials, contacts, ai, payments, districts

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(bookings.router, prefix="/bookings", tags=["bookings"])
api_router.include_router(vehicles.router, prefix="/vehicles", tags=["vehicles"])
api_router.include_router(packages.router, prefix="/packages", tags=["packages"])
api_router.include_router(gallery.router, prefix="/gallery", tags=["gallery"])
api_router.include_router(testimonials.router, prefix="/testimonials", tags=["testimonials"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["contacts"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(districts.router, prefix="/districts", tags=["districts"])


