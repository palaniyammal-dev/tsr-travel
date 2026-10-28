from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import math
import requests
import logging

from app.db.session import get_db
from app.models.district import District
from app.models.destination import TouristDestination

logger = logging.getLogger("tsr_districts")
router = APIRouter()

# Pydantic Schemas
class RoutePlanRequest(BaseModel):
    start_location: Optional[str] = "TSR Hub, Kattur, Trichy"
    start_lat: Optional[float] = 10.7905
    start_lng: Optional[float] = 78.7047
    destination_ids: List[int]
    optimize_order: Optional[bool] = True
    passenger_count: Optional[int] = 4

def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0 # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@router.get("", response_model=List[Dict[str, Any]])
def list_districts(db: Session = Depends(get_db)):
    """List all 38 districts of Tamil Nadu with destination count."""
    districts = db.query(District).order_by(District.name.asc()).all()
    results = []
    for d in districts:
        count = db.query(TouristDestination).filter(TouristDestination.district_id == d.id).count()
        results.append({
            "id": d.id,
            "name": d.name,
            "tamil_name": d.tamil_name,
            "code": d.code,
            "center_lat": d.center_lat,
            "center_lng": d.center_lng,
            "lat": d.center_lat,
            "lng": d.center_lng,
            "description": d.description,
            "banner_image": d.banner_image,
            "destination_count": count
        })
    return results

@router.get("/destinations/all", response_model=List[Dict[str, Any]])
def list_all_destinations(
    district_id: Optional[int] = Query(None),
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """List tourist destinations with category, district, and keyword search filters."""
    query = db.query(TouristDestination)
    
    if district_id:
        query = query.filter(TouristDestination.district_id == district_id)
        
    if category and category.lower() != "all":
        query = query.filter(TouristDestination.category.ilike(f"%{category}%"))
        
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (TouristDestination.name.ilike(search_term)) |
            (TouristDestination.tamil_name.ilike(search_term)) |
            (TouristDestination.description.ilike(search_term))
        )
        
    destinations = query.all()
    return [
        {
            "id": d.id,
            "district_id": d.district_id,
            "district_name": d.district.name if d.district else "",
            "name": d.name,
            "tamil_name": d.tamil_name,
            "category": d.category,
            "description": d.description,
            "tamil_description": d.tamil_description,
            "image_url": d.image_url,
            "lat": d.lat,
            "lng": d.lng,
            "distance_from_trichy_km": d.distance_from_trichy_km,
            "est_travel_time_hours": d.est_travel_time_hours,
            "best_time_to_visit": d.best_time_to_visit,
            "visiting_hours": d.visiting_hours
        }
        for d in destinations
    ]

@router.get("/{id_or_name}", response_model=Dict[str, Any])
def get_district_details(id_or_name: str, db: Session = Depends(get_db)):
    """Get single district details and its tourist attractions by ID or Name."""
    district = None
    if id_or_name.isdigit():
        district = db.query(District).filter(District.id == int(id_or_name)).first()
    else:
        district = db.query(District).filter(District.name.ilike(id_or_name)).first()
        
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
        
    destinations = [
        {
            "id": d.id,
            "district_id": d.district_id,
            "name": d.name,
            "tamil_name": d.tamil_name,
            "category": d.category,
            "description": d.description,
            "tamil_description": d.tamil_description,
            "image_url": d.image_url,
            "lat": d.lat,
            "lng": d.lng,
            "distance_from_trichy_km": d.distance_from_trichy_km,
            "est_travel_time_hours": d.est_travel_time_hours,
            "best_time_to_visit": d.best_time_to_visit,
            "visiting_hours": d.visiting_hours
        }
        for d in district.destinations
    ]
    
    return {
        "id": district.id,
        "name": district.name,
        "tamil_name": district.tamil_name,
        "code": district.code,
        "center_lat": district.center_lat,
        "center_lng": district.center_lng,
        "lat": district.center_lat,
        "lng": district.center_lng,
        "description": district.description,
        "banner_image": district.banner_image,
        "destinations": destinations
    }

@router.post("/route-plan", response_model=Dict[str, Any])
def plan_multi_stop_route(req: RoutePlanRequest, db: Session = Depends(get_db)):
    """
    Calculate multi-stop road distance, estimated travel time, 
    and suggested visit sequence from start point through selected tourist places.
    """
    if not req.destination_ids:
        raise HTTPException(status_code=400, detail="Please select at least one tourist destination.")
        
    destinations = db.query(TouristDestination).filter(TouristDestination.id.in_(req.destination_ids)).all()
    if not destinations:
        raise HTTPException(status_code=404, detail="Selected destinations not found.")

    start_lat = req.start_lat or 10.7905
    start_lng = req.start_lng or 78.7047
    
    # 1. Sequence optimization (Greedy Nearest-Neighbor)
    unvisited = list(destinations)
    ordered = []
    curr_lat, curr_lng = start_lat, start_lng

    while unvisited:
        nearest = min(unvisited, key=lambda d: haversine_km(curr_lat, curr_lng, d.lat, d.lng))
        ordered.append(nearest)
        curr_lat, curr_lng = nearest.lat, nearest.lng
        unvisited.remove(nearest)

    # 2. Road routing via OSRM with safe fallback
    waypoints = [[start_lng, start_lat]] + [[d.lng, d.lat] for d in ordered]
    coord_str = ";".join([f"{p[0]},{p[1]}" for p in waypoints])
    osrm_url = f"http://router.project-osrm.org/route/v1/driving/{coord_str}?overview=full&geometries=geojson"

    total_km = 0.0
    total_hours = 0.0
    route_polyline = []
    routing_type = "live_osrm"

    try:
        resp = requests.get(osrm_url, timeout=3.5)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("code") == "Ok" and data.get("routes"):
                primary_route = data["routes"][0]
                total_km = round(primary_route["distance"] / 1000.0, 1)
                total_hours = round(primary_route["duration"] / 3600.0, 1)
                coords = primary_route["geometry"]["coordinates"]
                # Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
                route_polyline = [[c[1], c[0]] for c in coords]
    except Exception as e:
        logger.warning(f"OSRM service unavailable ({e}); applying road-factor fallback.")

    # Graceful fallback if OSRM is unreachable
    if not route_polyline:
        routing_type = "estimated_road_fallback"
        # Haversine with 1.25 road winding factor for Tamil Nadu highways/ghat roads
        accum_km = 0.0
        prev_lat, prev_lng = start_lat, start_lng
        route_polyline = [[start_lat, start_lng]]
        for d in ordered:
            direct_dist = haversine_km(prev_lat, prev_lng, d.lat, d.lng)
            accum_km += direct_dist * 1.25 # road factor
            prev_lat, prev_lng = d.lat, d.lng
            route_polyline.append([d.lat, d.lng])
            
        total_km = round(accum_km, 1)
        # Average speed of 45-50 km/h accounting for halts and city transits
        total_hours = round(max(0.5, total_km / 48.0), 1)

    # Recommend strictly between Mini Van (7-8 seats) and Mini Bus (20+ seats)
    passenger_count = req.passenger_count or 4
    if passenger_count <= 8:
        recommended_vehicle = "Maruti Omni Van"
        vehicle_capacity = "7–8 Seats"
    else:
        recommended_vehicle = "Mahindra Mini Bus"
        vehicle_capacity = "20+ Seats"

    ordered_serialized = [
        {
            "sequence_order": i + 1,
            "id": d.id,
            "name": d.name,
            "tamil_name": d.tamil_name,
            "category": d.category,
            "district_name": d.district.name if d.district else "",
            "lat": d.lat,
            "lng": d.lng,
            "image_url": d.image_url,
            "best_time_to_visit": d.best_time_to_visit,
            "visiting_hours": d.visiting_hours
        }
        for i, d in enumerate(ordered)
    ]

    return {
        "start_location": req.start_location,
        "start_coordinates": [start_lat, start_lng],
        "total_distance_km": total_km,
        "estimated_duration_hours": total_hours,
        "routing_type": routing_type,
        "recommended_vehicle": recommended_vehicle,
        "vehicle_capacity": vehicle_capacity,
        "ordered_destinations": ordered_serialized,
        "route_polyline": route_polyline,
        "note": "Route calculated based on Tamil Nadu highway networks. Driving time accounts for daytime transit." if routing_type == "live_osrm" else "Live routing service temporarily offline; distance is an approximate road network calculation."
    }
