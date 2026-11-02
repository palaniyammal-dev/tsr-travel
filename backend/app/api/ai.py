from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import random

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    page_context: Optional[str] = "home" # e.g. "/packages/ooty"

class TripPlannerRequest(BaseModel):
    destination: str
    days: int
    adults: int
    children: int
    budget: str # budget, standard, luxury
    vehicle_preference: Optional[str] = None

# Context library for chatbot covering all 12 destinations
DESTINATION_INFO = {
    "ooty": {
        "name": "Ooty (Udhagamandalam)",
        "weather": "Ooty has a pleasant climate, with temperatures ranging from 12°C to 20°C. Best time to visit is from October to June.",
        "food": "Famous foods in Ooty include hot fresh homemade chocolates, Ooty varkey biscuits, fresh organic carrots, and hot Nilgiri tea.",
        "attractions": "Top spots: Ooty Botanical Garden, Rose Garden, Doddabetta Peak, Ooty Lake boating, and Pykara Waterfalls.",
        "time": "Driving distance from Trichy is approximately 260 km, taking around 5.5 to 6 hours.",
        "hotels": "Sterling Ooty Fern Hill, Hotel Lakeview, and Accord Highland.",
        "emergency": "Ooty General Hospital: +91 423 244 2212, TSR Support: +91 97914 65995"
    },
    "kodaikanal": {
        "name": "Kodaikanal",
        "weather": "Misty and cool in Kodaikanal. Temperatures are between 14°C and 22°C. Carry light jackets.",
        "food": "Famous items: Local farm-fresh cheese, warm plums, peaches, and homemade chocolates.",
        "attractions": "Top spots: Kodaikanal Lake (rowing/cycling), Coaker's Walk, Pillar Rocks, Guna Caves, and Pine Forest.",
        "time": "Distance from Trichy is 200 km, taking about 4.5 hours.",
        "hotels": "The Carlton, Villa Retreat, and Kodai Resort.",
        "emergency": "Kodai Govt Hospital: +91 4542 241 292, TSR Support: +91 97914 65995"
    },
    "yercaud": {
        "name": "Yercaud",
        "weather": "Cool and pleasant. Temperatures range from 18°C to 26°C.",
        "food": "Famous local spice tea, fresh organic oranges, and bajji near the lake.",
        "attractions": "Top spots: Emerald Lake, Lady's Seat, Killiyur Falls, Pagoda Point, and Shevaroy Temple.",
        "time": "Distance from Trichy is 140 km, taking about 3 hours.",
        "hotels": "GRT Nature Trails Sky Rocca and Sterling Yercaud.",
        "emergency": "Yercaud Govt Hospital: +91 4281 222 234, TSR Support: +91 97914 65995"
    },
    "rameswaram": {
        "name": "Rameswaram",
        "weather": "Warm and coastal breeze. Temperatures range from 26°C to 32°C. Cotton clothes are best.",
        "food": "Famous foods: Fresh coastal seafood meals, and traditional South Indian vegetarian food.",
        "attractions": "Top spots: Ramanathaswamy Temple, 22 Holy wells, Dhanushkodi, and APJ Abdul Kalam Memorial.",
        "time": "Distance from Trichy is 230 km, taking about 4 hours.",
        "hotels": "Daiwik Hotel and Hyatt Place Rameswaram.",
        "emergency": "Govt Hospital Rameswaram: +91 4573 221 233, TSR Support: +91 97914 65995"
    },
    "madurai": {
        "name": "Madurai",
        "weather": "Warm and sunny. Temperatures range from 28°C to 36°C.",
        "food": "Famous foods: Madurai Jigarthanda, soft idlis, mutton chukka, and paruthi paal.",
        "attractions": "Top spots: Meenakshi Amman Temple, Thirumalai Nayakkar Palace, and Gandhi Museum.",
        "time": "Distance from Trichy is 130 km, taking about 2.5 hours.",
        "hotels": "Heritage Madurai and Hotel Supreme.",
        "emergency": "Rajaji Hospital: +91 452 253 2535, TSR Support: +91 97914 65995"
    },
    "kanyakumari": {
        "name": "Kanyakumari",
        "weather": "Breezy and coastal climate. Temperatures range from 25°C to 33°C.",
        "food": "Famous foods: Coastal fish curry, Kerala-style dishes, and warm banana chips.",
        "attractions": "Top spots: Vivekananda Rock Memorial, Thiruvalluvar Statue, and Sunset View Point.",
        "time": "Distance from Trichy is 380 km, taking about 7 hours.",
        "hotels": "Hotel Sparsa and Hotel Sea View.",
        "emergency": "Kanyakumari Govt Hospital: +91 4652 246 250, TSR Support: +91 97914 65995"
    },
    "velankanni": {
        "name": "Velankanni",
        "weather": "Coastal and warm. Temperatures range from 27°C to 33°C.",
        "food": "Famous foods: Coastal seafood, South Indian meals, and fish fry.",
        "attractions": "Top spots: Basilica of Our Lady of Good Health, Offering Museum, and Velankanni Beach.",
        "time": "Distance from Trichy is 150 km, taking about 3.5 hours.",
        "hotels": "Clinton Park Inn and local church rooms.",
        "emergency": "Church Office: +91 4365 263 230, TSR Support: +91 97914 65995"
    },
    "thanjavur": {
        "name": "Thanjavur",
        "weather": "Warm and sunny. Temperatures range from 28°C to 35°C.",
        "food": "Famous foods: Traditional filter coffee and Tanjore vegetarian meals.",
        "attractions": "Top spots: Brihadeeswarar Temple (Big Temple), Thanjavur Royal Palace, and Saraswathi Mahal Library.",
        "time": "Distance from Trichy is 60 km, taking about 1.2 hours.",
        "hotels": "Svatma Resort and Tanjore Hi-Resort.",
        "emergency": "Tanjavur Govt Hospital: +91 4362 230 460, TSR Support: +91 97914 65995"
    },
    "chidambaram": {
        "name": "Chidambaram",
        "weather": "Humid and warm. Temperatures range from 27°C to 34°C.",
        "food": "Famous foods: Traditional South Indian meals and temple sweet prasadam.",
        "attractions": "Top spots: Thillai Natarajar Temple and Pichavaram Mangrove Forests.",
        "time": "Distance from Trichy is 130 km, taking about 3 hours.",
        "hotels": "Hotel Saradharam.",
        "emergency": "Police: 100, TSR Support: +91 97914 65995"
    },
    "hogenakkal": {
        "name": "Hogenakkal",
        "weather": "Warm with fresh mist sprays. Temperatures range from 25°C to 34°C.",
        "food": "Famous foods: Fresh river-catch fried fish and local traditional meals.",
        "attractions": "Top spots: Roaring Hogenakkal Falls, Coracle Boating, and herbal oil massages.",
        "time": "Distance from Trichy is 220 km, taking about 5 hours.",
        "hotels": "Hotel Tamil Nadu.",
        "emergency": "Police Station: 100, TSR Support: +91 97914 65995"
    },
    "courtallam": {
        "name": "Courtallam",
        "weather": "Windy and cool during monsoon season. Temperatures range from 22°C to 30°C.",
        "food": "Famous foods: Hot onion/chili bajjis, country chicken curry, and Tirunelveli Halwa.",
        "attractions": "Top spots: Main Falls, Five Falls, Old Courtallam Falls, and Tenkasi Temple.",
        "time": "Distance from Trichy is 290 km, taking about 6 hours.",
        "hotels": "Saaral Resort.",
        "emergency": "Clinic: +91 4633 222 245, TSR Support: +91 97914 65995"
    },
    "yelagiri": {
        "name": "Yelagiri",
        "weather": "Pleasant and breezy hill station. Temperatures range from 17°C to 28°C.",
        "food": "Famous foods: Local organic honey, fresh jackfruits, and spiced tea.",
        "attractions": "Top spots: Punganoor Lake boating, Nature Park, and Swamimalai trekking.",
        "time": "Distance from Trichy is 270 km, taking about 5.5 hours.",
        "hotels": "Sterling Yelagiri.",
        "emergency": "Govt Clinic: +91 4179 245 230, TSR Support: +91 97914 65995"
    }
}

# Tamil Translations
TAMIL_DESTINATION_INFO = {
    "ooty": {
        "weather": "ஊட்டியில் தற்போது இதமான காலநிலை உள்ளது (12°C முதல் 20°C வரை). மாலை நேரத்தில் குளிர் அதிகமாக இருக்கும் என்பதால் ஸ்வெட்டர் கொண்டு செல்லவும்.",
        "food": "ஊட்டி வர்க்கி, வீட்டிலேயே தயாரிக்கப்படும் சாக்லேட்டுகள், ஃப்ரெஷ் கேரட் மற்றும் ஊட்டியில் விளையும் சுடச்சுட தேநீர் ஆகியவை மிகவும் பிரசித்தி பெற்றவை.",
        "attractions": "முக்கிய இடங்கள்: தாவரவியல் பூங்கா (Botanical Garden), ரோஜா பூங்கா, தொட்டபெட்டா சிகரம், ஊட்டி ஏரி படகு சவாரி மற்றும் பொம்மை ரயில்.",
        "time": "திருச்சியிலிருந்து சுமார் 260 கி.மீ தூரம். கரூா் மற்றும் கோயம்புத்தூர் வழியாக செல்ல 5.5 முதல் 6 மணி நேரம் ஆகும்."
    },
    "kodaikanal": {
        "weather": "கொடைக்கானலில் தற்போது பனிமூட்டமான இதமான குளிர் நிலவுகிறது (14°C முதல் 22°C வரை). செப்டம்பர் முதல் மே வரை செல்ல சிறந்த காலம்.",
        "attractions": "முக்கிய இடங்கள்: கொடைக்கானல் ஏரி, கோக்கர்ஸ் வாக் (Coaker's Walk), தூண் பாறைகள் (Pillar Rocks), குணா குகைகள் மற்றும் பைன் காடுகள்."
    }
}

@router.post("/chat")
def chatbot_assistant(req: ChatRequest):
    msg = req.message.lower()
    context = req.page_context.lower() if req.page_context else "home"
    
    # Detect if user asks in Tamil
    is_tamil = any(word in msg for word in ["வணக்கம்", "எப்படி", "நன்றி", "மழை", "வெயில்", "சாப்பாடு", "ஊட்டி", "கொடைக்கானல்"])
    
    # Extract destination from context path
    dest_key = None
    for key in DESTINATION_INFO.keys():
        if key in context:
            dest_key = key
            break
            
    # Default fallback destination if none in context but mentioned in message
    if not dest_key:
        for key in DESTINATION_INFO.keys():
            if key in msg:
                dest_key = key
                break

    # If destination identified, query destination specific knowledge base
    if dest_key:
        info = DESTINATION_INFO[dest_key]
        t_info = TAMIL_DESTINATION_INFO.get(dest_key, {})
        
        # Keyword triggers
        if any(w in msg for w in ["weather", "climate", "temp", "வானிலை", "குளிர்", "வெப்பநிலை"]):
            return {"reply": t_info.get("weather", info["weather"]) if is_tamil else info["weather"]}
        elif any(w in msg for w in ["food", "eat", "famous food", "சாப்பாடு", "உணவு"]):
            return {"reply": t_info.get("food", info.get("food", "We recommend local vegetarian and traditional dishes.")) if is_tamil else info["food"]}
        elif any(w in msg for w in ["attraction", "place", "visit", "spot", "பார்க்க வேண்டிய", "இடங்கள்", "சுற்றுலா"]):
            return {"reply": t_info.get("attractions", info["attractions"]) if is_tamil else info["attractions"]}
        elif any(w in msg for w in ["distance", "time", "hours", "how far", "தூரம்", "நேரம்"]):
            return {"reply": t_info.get("time", info["time"]) if is_tamil else info["time"]}
        elif any(w in msg for w in ["hotel", "stay", "room", "தங்குமிடம்", "விடுதி"]):
            return {"reply": f"Here are popular hotels in {info['name']}: {info['hotels']}"}
        elif any(w in msg for w in ["emergency", "phone", "police", "help", "ஆபத்து"]):
            return {"reply": info.get("emergency", "You can reach TSR Travels Owner Ravitharan at +91 97914 65995 for any on-road emergency.")}

        # Context-aware general question (e.g. "best places", "what to do here?")
        if is_tamil:
            return {
                "reply": f"வணக்கம்! நீங்கள் {info['name']} பக்கத்தில் உள்ளீர்கள். இந்த இடம் பற்றிய முக்கிய சுற்றுலா இடங்கள்: {t_info.get('attractions', info['attractions'])} ஆகும். வேறு ஏதேனும் விவரம் வேண்டுமா?"
            }
        else:
            return {
                "reply": f"You are browsing the {info['name']} package. Famous sights are: {info['attractions']}. Weather: {info['weather']}. Famous food: {info['food']}. Let me know if you want to book this route!"
            }

    # General Fallbacks
    if is_tamil:
        if "வணக்கம்" in msg:
            return {"reply": "வணக்கம்! நான் TSR TRAVEL-ன் செயற்கை நுண்ணறிவு பயண உதவியாளர். உங்களுக்கு என்ன உதவ வேண்டும்? தமிழ்நாட்டின் எந்த சுற்றுலாத் தலத்தை பற்றி அறிய விரும்புகிறீர்கள்?"}
        return {"reply": "திருச்சியிலிருந்து ஓட்டி, கொடைக்கானல், இராமேஸ்வரம் போன்ற இடங்களுக்குச் செல்ல எங்களிடம் சொகுசு மினி பஸ் மற்றும் ஓம்னி வேன் வசதிகள் உள்ளன. முன்பதிவு செய்ய 'Book Now' படிவத்தைப் பூர்த்தி செய்யவும்."}
    else:
        if "hello" in msg or "hi" in msg:
            return {"reply": "Hello! I am your TSR TRAVEL AI Assistant. How can I help you plan your Tamil Nadu tour today? Ask me about tour packages, vehicle recommendations, or specific destinations!"}
        return {"reply": "TSR TRAVEL offers reliable transport from Trichy. We have Mahindra Mini Bus (20+ seats) and Maruti Omni Van (7-8 seats) in our fleet. Let me know if you need route timings, pricing, or hotel recommendations!"}

@router.post("/plan-trip")
def plan_trip_assistant(req: TripPlannerRequest):
    total_passengers = req.adults + req.children
    
    # 1. Vehicle recommendation logic
    if total_passengers <= 8:
        recommended_vehicle = "Maruti Omni Van"
        vehicle_reason = f"Based on your group size of {total_passengers} passenger(s), we recommend the Maruti Omni Van. It fits up to 8 passengers comfortably and is highly cost-effective for smaller groups."
        estimated_rent = 3500 * req.days
    else:
        recommended_vehicle = "Mahindra Mini Bus"
        vehicle_reason = f"Since your group has {total_passengers} passengers, we recommend our Mahindra Mini Bus (20+ seats). It provides luxury push-back seating, AC, and plenty of space for large families or friends tours."
        estimated_rent = 8000 * req.days

    # 2. Package estimations based on budget level
    multiplier = 1.0 if req.budget == "budget" else (1.4 if req.budget == "standard" else 2.0)
    hotel_cost_per_day = 2000 * multiplier
    food_cost_per_day = 800 * total_passengers
    
    total_hotel_est = int(hotel_cost_per_day * (req.days - 1)) if req.days > 1 else 0
    total_food_est = int(food_cost_per_day * req.days)
    total_sightseeing = 300 * total_passengers * req.days
    
    total_trip_cost = estimated_rent + total_hotel_est + total_food_est + total_sightseeing

    # 3. Dynamic itinerary generator
    itinerary = []
    
    for day in range(1, req.days + 1):
        itinerary.append({
            "day": day,
            "morning": f"Start the morning with a hot traditional breakfast. Head out early to explore {req.destination}.",
            "afternoon": f"Lunch at a premium local restaurant. Explore local scenic spots and parks.",
            "evening": f"Enjoy street shopping, local spice markets, and return to hotel."
        })

    # Adjust final day for return
    itinerary[-1]["evening"] = f"Pack bags, complete checkout, board your {recommended_vehicle}, and start the safe return journey back to Trichy."

    # Seeding hotels
    hotels_db = [
        {"name": f"Grand Resort {req.destination}", "rating": "4.5★", "price": f"₹{int(hotel_cost_per_day)}/night", "facilities": "Free WiFi, Parking, AC"},
        {"name": f"Nature Inn {req.destination}", "rating": "4.2★", "price": f"₹{int(hotel_cost_per_day * 0.8)}/night", "facilities": "Mountain view, Restaurant"}
    ]

    # Packing checklist
    packing = ["Comfortable walking shoes", "Mobile chargers & Power banks", "Personal medicines & first-aid kit", "Identification cards (Aadhaar/Voter ID)"]
    if req.destination.lower() in ["ooty", "kodaikanal", "yercaud", "yelagiri"]:
        packing.extend(["Warm jackets / Sweaters", "Umbrella or raincoat"])
    else:
        packing.extend(["Cotton clothes", "Sunscreen lotion", "Sunglasses & hats"])

    return {
        "destination": req.destination,
        "days": req.days,
        "passengers": total_passengers,
        "recommended_vehicle": recommended_vehicle,
        "vehicle_reason": vehicle_reason,
        "budget_breakdown": {
            "vehicle_rental": f"₹{estimated_rent}",
            "accommodation_est": f"₹{total_hotel_est}",
            "food_est": f"₹{total_food_est}",
            "sightseeing_and_entry": f"₹{total_sightseeing}",
            "total_estimated_budget": f"₹{total_trip_cost}"
        },
        "itinerary": itinerary,
        "hotels": hotels_db,
        "packing_list": packing,
        "travel_tips": [
            f"Start your driving journey from Trichy early around 5:00 AM to beat highway traffic.",
            "Always follow the driver's recommendations regarding hilly terrains and weather closures.",
            "Keep emergency contact numbers handy (TSR Travels Support +91 97914 65995)."
        ]
    }


# =====================================================================
# BILINGUAL SMART DISTRICT AI TRAVEL ASSISTANT
# =====================================================================

class DistrictAIAssistantRequest(BaseModel):
    district_name: str
    language: Optional[str] = "en" # "en" or "ta"
    trip_duration: Optional[str] = "1_day" # "1_day", "2_days", "multi_day"
    preferences: Optional[List[str]] = []
    selected_destinations: Optional[List[str]] = []
    passenger_count: Optional[int] = 4
    starting_location: Optional[str] = "TSR Hub, Kattur, Trichy"
    budget: Optional[str] = "standard"

@router.post("/district-assistant", response_model=Dict[str, Any])
def district_ai_assistant(req: DistrictAIAssistantRequest):
    """
    Intelligent bilingual AI assistant for Tamil Nadu district exploration and vehicle bookings.
    Generates culturally rich, verified itineraries in English or Tamil.
    """
    lang = req.language if req.language in ["en", "ta"] else "en"
    district = req.district_name.strip()
    passengers = max(1, req.passenger_count or 4)
    duration = req.trip_duration or "1_day"

    # Vehicle selection rule: strictly between Maruti Omni Van & Mahindra Mini Bus
    if passengers <= 8:
        vehicle = "Maruti Omni Van"
        vehicle_tam = "மாருதி ஆம்னி வேன் (7-8 இருக்கைகள்)"
        capacity_str = "7–8 Seats"
        rationale_en = f"Selected for your intimate group of {passengers} passengers. Ideal for smooth city navigation and economical family travel."
        rationale_ta = f"உங்கள் {passengers} பேர் கொண்ட குடும்பத்திற்கு ஏற்றது. குறைந்த வாடகையில் எளிதாக சென்று வரலாம்."
    else:
        vehicle = "Mahindra Mini Bus"
        vehicle_tam = "மகிந்திரா மினி பஸ் (20+ இருக்கைகள்)"
        capacity_str = "20+ Seats"
        rationale_en = f"Selected for your group of {passengers} passengers. Spacious push-back luxury seats with ample luggage capacity."
        rationale_ta = f"உங்கள் {passengers} பேர் கொண்ட பெரிய குழுவிற்கு ஏற்றது. சொகுசு இருக்கைகள் மற்றும் கூடுதல் லக்கேஜ் வசதி கொண்டது."

    # Verified places mapping for priority districts
    known_places = {
        "tiruchirappalli": [
            ("Rockfort Ucchi Pillayar Temple", "மலைக்கோட்டை உச்சிப் பிள்ளையார் கோயில்", "Temples"),
            ("Sri Ranganathaswamy Temple, Srirangam", "ஸ்ரீரங்கம் ரங்கநாதசுவாமி கோயில்", "Temples"),
            ("Kallanai Dam (Grand Anicut)", "கல்லணை", "Dams"),
            ("Mukkombu Upper Anicut", "முக்கொம்பு மேலணை பூங்கா", "Picnic Spots")
        ],
        "thanjavur": [
            ("Brihadisvara Big Temple", "தஞ்சை பெரிய கோயில்", "Heritage"),
            ("Thanjavur Maratha Palace & Art Gallery", "தஞ்சாவூர் மராட்டிய அரண்மனை", "Heritage"),
            ("Saraswathi Mahal Library", "சரஸ்வதி மஹால் நூலகம்", "Heritage")
        ],
        "madurai": [
            ("Arulmigu Meenakshi Sundareswarar Temple", "மதுரை மீனாட்சி அம்மன் கோயில்", "Temples"),
            ("Thirumalai Nayakar Mahal", "திருமலை நாயக்கர் அரண்மனை", "Heritage"),
            ("Alagar Kovil Temple & Hills", "அழகர் கோயில்", "Temples")
        ],
        "dindigul": [
            ("Kodaikanal Lake & Coaker's Walk", "கொடைக்கானல் ஏரி & கோக்கர்ஸ் வாக்", "Hill Stations"),
            ("Pillar Rocks & Guna Caves", "பில்லர் ராக்ஸ் & குணா குகை", "Hill Stations"),
            ("Silver Cascade Falls", "சில்வர் காஸ்கேட் அருவி", "Waterfalls")
        ],
        "the nilgiris": [
            ("Government Botanical Garden, Ooty", "ஊட்டி அரசு தாவரவியல் பூங்கா", "Hill Stations"),
            ("Doddabetta Peak", "தொட்டபெட்டா சிகரம்", "Hill Stations"),
            ("Pykara Waterfalls & Lake", "பைகாரா நீர்வீழ்ச்சி & ஏரி", "Waterfalls"),
            ("Ooty Lake Boating", "ஊட்டி ஏரி படகு சவாரி", "Picnic Spots")
        ],
        "ramanathapuram": [
            ("Ramanathaswamy Temple & 22 Theerthams", "இராமேஸ்வரம் ராமநாதசுவாமி கோயில்", "Temples"),
            ("Dhanushkodi & Arichal Munai", "தனுஷ்கோடி & அரிச்சல் முனை", "Beaches"),
            ("APJ Abdul Kalam Memorial", "அப்துல் கலாம் நினைவகம்", "Heritage")
        ],
        "kanyakumari": [
            ("Vivekananda Rock Memorial", "விவேகானந்தர் பாறை நினைவு மண்டபம்", "Heritage"),
            ("Thiruvalluvar 133ft Statue", "திருவள்ளுவர் 133 அடி சிலை", "Heritage"),
            ("Sunset Point & Triveni Sangam", "முக்கடல் சங்கமம் & சூரிய அஸ்தமன முனை", "Beaches")
        ]
    }

    dist_key = district.lower()
    places_list = known_places.get(dist_key, [
        (f"{district} Main Historic Site", f"{district} வரலாற்று தளம்", "Heritage"),
        (f"{district} Sacred Temple / Shrine", f"{district} புனித தலம்", "Temples"),
        (f"{district} Scenic Lake / Park", f"{district} இயற்கை பூங்கா", "Picnic Spots")
    ])

    if req.selected_destinations:
        places_names = req.selected_destinations
    else:
        places_names = [p[0] if lang == "en" else p[1] for p in places_list]

    # Generate bilingual schedule
    if lang == "ta":
        title = f"{district} மாவட்டத்திற்கான சிறப்பு சுற்றுலா திட்டம்"
        tips = [
            "கோயில்களுக்கு செல்லும்போது பாரம்பரிய உடை அணிவது நன்று (வேஷ்டி/சேலை).",
            "வெயில் நேரத்தை தவிர்க்க அதிகாலை 5:30 மணிக்கு திருச்சியிலிருந்து பயணத்தைத் தொடங்கவும்.",
            "TSR பயணப் பாதுகாப்பு எண்: +91 97914 65995."
        ]
        if duration == "1_day":
            schedule = [
                {
                    "day": "நாள் 1 (முழு நாள் பயணம்)",
                    "morning": f"காலை 06:00 மணிக்கு {req.starting_location} கிளம்பி, {places_names[0] if len(places_names) > 0 else 'முதல் தளம்'} தரிசனம்.",
                    "afternoon": f"மதியம் பாரம்பரிய தமிழ் உணவுக்குப் பின் {places_names[1] if len(places_names) > 1 else 'இரண்டாவது தளம்'} பார்வை.",
                    "evening": f"மாலை {places_names[2] if len(places_names) > 2 else 'இயற்கை பூங்கா'} அமைதியை ரசித்துவிட்டு, {vehicle_tam} மூலம் பாதுகாப்பாக திருச்சி திரும்புதல்."
                }
            ]
        else:
            schedule = [
                {
                    "day": "நாள் 1",
                    "morning": f"காலை திருச்சி {req.starting_location} புறப்பட்டு {places_names[0] if len(places_names) > 0 else 'முக்கிய தளம்'} சென்று அடைதல்.",
                    "afternoon": f"மதிய உணவு மற்றும் ஓய்வுக்குப் பின் வரலாற்று இடங்கள் பார்வை.",
                    "evening": f"மாலை உள்ளூர் சந்தை மற்றும் முக்கிய கோயில்கள் தரிசனம்."
                },
                {
                    "day": "நாள் 2",
                    "morning": f"காலை இயற்கை எழில் கொஞ்சும் பகுதிகள் மற்றும் நீர்வீழ்ச்சி/ஏரி பார்வை.",
                    "afternoon": f"மதிய உணவுக்குப் பின் {places_names[-1] if places_names else 'சுற்றுலா தளம்'} பயணம்.",
                    "evening": f"{vehicle_tam} மூலம் திருப்திகரமாக தாயகம் திரும்புதல்."
                }
            ]
    else:
        title = f"Exclusive Smart Travel Itinerary for {district}"
        tips = [
            "Dress respectfully in traditional attire (dhoti/saree) when visiting holy temples.",
            "Depart early at 5:30 AM from Trichy to beat highway heat and daytime traffic.",
            "Keep TSR 24x7 Driver and Travel Support handy: +91 97914 65995."
        ]
        if duration == "1_day":
            schedule = [
                {
                    "day": "Day 1 (Full Day Circuit)",
                    "morning": f"06:00 AM Departure from {req.starting_location} in your {vehicle}. Visit {places_names[0] if len(places_names) > 0 else 'primary site'}.",
                    "afternoon": f"Authentic South Indian lunch, followed by an afternoon tour of {places_names[1] if len(places_names) > 1 else 'second attraction'}.",
                    "evening": f"Sunset viewpoint at {places_names[2] if len(places_names) > 2 else 'cultural landmark'}, followed by smooth highway return to Trichy."
                }
            ]
        else:
            schedule = [
                {
                    "day": "Day 1",
                    "morning": f"Early morning start from {req.starting_location}. Scenic road trip to {district} with morning breakfast halt.",
                    "afternoon": f"Check-in, relax, and explore {places_names[0] if len(places_names) > 0 else 'heritage highlights'}.",
                    "evening": f"Local traditional bazaar exploration and evening cultural visit."
                },
                {
                    "day": "Day 2",
                    "morning": f"Breathtaking sunrise viewpoints and excursion to {places_names[1] if len(places_names) > 1 else 'natural wonders'}.",
                    "afternoon": f"Leisurely lunch and photography stops at {places_names[-1] if places_names else 'final destination'}.",
                    "evening": f"Safe and comfortable chauffeured return journey in your {vehicle} back to Trichy."
                }
            ]

    return {
        "district": district,
        "language": lang,
        "itinerary_title": title,
        "recommended_vehicle": vehicle,
        "vehicle_capacity": capacity_str,
        "vehicle_rationale": rationale_ta if lang == "ta" else rationale_en,
        "suggested_order": places_names,
        "schedule": schedule,
        "practical_tips": tips,
        "booking_prefill": {
            "pickup": req.starting_location,
            "drop": f"{district} Tour ({', '.join(places_names[:2])})",
            "vehicleType": "Mini Van" if passengers <= 8 else "Mini Bus",
            "passengers": passengers,
            "district": district
        }
    }

