import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface TouristDestination {
  id: number;
  district_id: number;
  name: string;
  tamil_name: string;
  category: "Temples" | "Heritage" | "Waterfalls" | "Dams" | "Beaches" | "Hill Stations" | "Picnic Spots" | string;
  lat: number;
  lng: number;
  address?: string;
  description: string;
  tamil_description?: string;
  image_url: string;
  visiting_hours: string;
  entry_fee: string;
  best_time_to_visit: string;
  ideal_duration: string;
  google_maps_url: string;
  nearby_attractions?: string;
  dress_code?: string;
  is_priority_stop: boolean;
  district_name?: string;
}

export interface District {
  id: number;
  name: string;
  tamil_name: string;
  zone?: string;
  headquarters?: string;
  lat?: number;
  lng?: number;
  center_lat?: number;
  center_lng?: number;
  code?: string;
  description: string;
  tamil_description?: string;
  hero_image_url?: string;
  banner_image?: string;
  popular_for?: string;
  best_season?: string;
  destinations_count?: number;
  destination_count?: number;
  destinations?: TouristDestination[];
}

export interface RoutePlanRequest {
  start_location?: string;
  start_lat?: number;
  start_lng?: number;
  destination_ids: number[];
  passenger_count?: number;
}

export interface OrderedDestination {
  sequence_order: number;
  id: number;
  name: string;
  tamil_name: string;
  category: string;
  district_name: string;
  lat: number;
  lng: number;
  image_url: string;
  best_time_to_visit: string;
  visiting_hours: string;
}

export interface RoutePlanResponse {
  start_location: string;
  start_coordinates: [number, number];
  total_distance_km: number;
  estimated_duration_hours: number;
  routing_type: string;
  recommended_vehicle: "Maruti Omni Van" | "Mahindra Mini Bus" | string;
  vehicle_capacity: string;
  ordered_destinations: OrderedDestination[];
  route_polyline: [number, number][];
  note: string;
}

export interface DistrictAIAssistantRequest {
  district_name: string;
  language?: "en" | "ta";
  trip_duration?: "1_day" | "2_days" | "multi_day";
  preferences?: string[];
  selected_destinations?: string[];
  passenger_count?: number;
  starting_location?: string;
}

export interface ScheduleDay {
  day: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface DistrictAIAssistantResponse {
  district: string;
  language: "en" | "ta" | string;
  itinerary_title: string;
  recommended_vehicle: string;
  vehicle_capacity: string;
  vehicle_rationale: string;
  suggested_order: string[];
  schedule: ScheduleDay[];
  practical_tips: string[];
  booking_prefill: {
    pickup: string;
    drop: string;
    vehicleType: "Mini Van" | "Mini Bus" | string;
    passengers: number;
    district: string;
  };
}

// API methods with graceful offline fallbacks
export const fetchDistricts = async (): Promise<District[]> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/districts`);
    return res.data;
  } catch (err) {
    console.warn("Failed to fetch districts from backend, using fallback data", err);
    return [];
  }
};

export const fetchDistrictDetail = async (idOrName: string | number): Promise<District | null> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/districts/${encodeURIComponent(idOrName)}`);
    return res.data;
  } catch (err) {
    console.warn(`Failed to fetch district detail for ${idOrName}`, err);
    return null;
  }
};

export const fetchDestinations = async (params?: {
  district?: string;
  category?: string;
  q?: string;
}): Promise<TouristDestination[]> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/districts/destinations/all`, { params });
    return res.data;
  } catch (err) {
    console.warn("Failed to fetch destinations from backend", err);
    return [];
  }
};

export const calculateRoutePlan = async (payload: RoutePlanRequest): Promise<RoutePlanResponse | null> => {
  try {
    const res = await axios.post(`${API_BASE_URL}/districts/route-plan`, payload);
    return res.data;
  } catch (err) {
    console.warn("Failed to calculate route plan", err);
    return null;
  }
};

export const generateDistrictItinerary = async (
  payload: DistrictAIAssistantRequest
): Promise<DistrictAIAssistantResponse | null> => {
  try {
    const res = await axios.post(`${API_BASE_URL}/ai/district-assistant`, payload);
    return res.data;
  } catch (err) {
    console.warn("Failed to generate AI district itinerary", err);
    return null;
  }
};
