import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# Ensure env var for SQLite
os.environ["DATABASE_URL"] = "sqlite:///./tsr_db.db"

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_district_apis():
    print("Testing GET /api/districts...")
    r = client.get("/api/districts")
    assert r.status_code == 200, f"Districts list failed: {r.status_code} {r.text}"
    districts = r.json()
    print(f"-> Success: Retrieved {len(districts)} districts.")
    assert len(districts) >= 38, f"Expected 38 districts, got {len(districts)}"

    print("\nTesting GET /api/districts/Tiruchirappalli...")
    r = client.get("/api/districts/Tiruchirappalli")
    assert r.status_code == 200, f"District detail failed: {r.status_code} {r.text}"
    trichy = r.json()
    print(f"-> Success: Found {trichy['name']} with {len(trichy.get('destinations', []))} destinations.")

    print("\nTesting GET /api/districts/destinations/all...")
    r = client.get("/api/districts/destinations/all?district=Tiruchirappalli")
    assert r.status_code == 200, f"Destinations search failed: {r.status_code} {r.text}"
    dests = r.json()
    print(f"-> Success: Found {len(dests)} destinations in Trichy.")

    print("\nTesting POST /api/districts/route-plan...")
    route_payload = {
        "destination_ids": [d["id"] for d in dests[:3]],
        "start_hub": "Tiruchirappalli Junction"
    }
    r = client.post("/api/districts/route-plan", json=route_payload)
    assert r.status_code == 200, f"Route plan failed: {r.status_code} {r.text}"
    route_data = r.json()
    print(f"-> Success: Total distance {route_data.get('total_distance_km')} km, estimated time {route_data.get('total_duration_hours')} hrs.")
    print(f"-> Recommended vehicle: {route_data.get('recommended_vehicle')}")

    print("\nTesting POST /api/ai/district-assistant (English)...")
    ai_payload_en = {
        "district_name": "Tiruchirappalli",
        "trip_duration": "1_day",
        "language": "en",
        "passenger_count": 6
    }
    r = client.post("/api/ai/district-assistant", json=ai_payload_en)
    assert r.status_code == 200, f"AI assistant failed: {r.status_code} {r.text}"
    ai_res_en = r.json()
    print(f"-> Success: Vehicle recommendation: {ai_res_en.get('recommended_vehicle')}")
    print(f"-> Itinerary title: {ai_res_en.get('itinerary_title')}")
    print(f"-> Booking prefill: {ai_res_en.get('booking_prefill')}")

    print("\nTesting POST /api/ai/district-assistant (Tamil)...")
    ai_payload_ta = {
        "district_name": "Madurai",
        "trip_duration": "2_days",
        "language": "ta",
        "passenger_count": 15
    }
    r = client.post("/api/ai/district-assistant", json=ai_payload_ta)
    assert r.status_code == 200, f"AI assistant Tamil failed: {r.status_code} {r.text}"
    ai_res_ta = r.json()
    print(f"-> Success: Tamil Vehicle recommendation: {ai_res_ta.get('recommended_vehicle')}")
    print(f"-> Tamil Itinerary title: {ai_res_ta.get('itinerary_title')}")
    print(f"-> Tamil booking prefill: {ai_res_ta.get('booking_prefill')}")

    print("\nALL BACKEND DISTRICT & AI ENDPOINTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_district_apis()
