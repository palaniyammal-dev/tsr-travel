import os
os.environ["DATABASE_URL"] = "sqlite:///./tsr_db.db"

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_booking():
    payload = {
        "customer_name": "Test Traveler",
        "phone_number": "9791465995",
        "pickup_location": "TSR Hub, Kattur, Trichy",
        "destination": "Rockfort Ucchi Pillayar Temple, Trichy",
        "trip_date": "2026-10-15T08:00:00",
        "vehicle_name": "Maruti Omni Van",
        "passengers": 6,
        "trip_type": "Family Trip",
        "special_notes": "Automated verification test"
    }
    r = client.post("/api/bookings/", json=payload)
    print(f"Status: {r.status_code}")
    print(f"Response: {r.json()}")
    assert r.status_code == 201, f"Booking creation failed: {r.text}"
    print("Booking creation verified successfully!")

if __name__ == "__main__":
    test_booking()
