export type DestinationDetails = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  history: string;
  distance: string;
  travelTime: string;
  price: number;
  duration: string;
  weather: {
    temp: string;
    condition: string;
    humidity: string;
    bestTime: string;
  };
  mapEmbed: string;
  included: string[];
  excluded: string[];
  attractions: string[];
  nearby: string[];
  foods: string[];
  shopping: string[];
  hotels: { name: string; rating: string; price: string; facilities: string }[];
  restaurants: { name: string; type: "Veg" | "Veg/Non-Veg"; rating: string }[];
  templeTimings?: string;
  emergencyContacts: string[];
  itinerary: { day: number; title: string; desc: string }[];
  images: string[];
};

export const DESTINATIONS_DATA: Record<string, DestinationDetails> = {
  "ooty": {
    slug: "ooty",
    name: "Ooty",
    tagline: "The Queen of Hill Stations",
    description: "Nestled in the Nilgiri Hills, Ooty is a scenic paradise featuring sprawling tea gardens, colonial architecture, and serene lakes. Perfect for family retreats and cool summer escapes.",
    history: "Originally inhabited by the Toda hill tribe, Ooty was developed as a summer resort town by the British East India Company in the early 19th century.",
    distance: "260 km from Trichy",
    travelTime: "5.5 Hours",
    price: 12500,
    duration: "3 Days / 2 Nights",
    weather: {
      temp: "15°C - 20°C",
      condition: "Misty & Pleasant",
      humidity: "65%",
      bestTime: "October to June"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62636.56846152864!2d76.67156942006766!3d11.411132711090333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8bd84b5c3d115%3A0x9400de4b9c1d1a8e!2sOoty%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Clean vehicle transport (Omni/Mini Bus)", "Fuel charges & interstate permit fee", "Experienced driver allowance", "Water bottles during transit"],
    excluded: ["Hotel accommodations", "Sightseeing entry tickets", "Personal meals & shopping"],
    attractions: ["Ooty Botanical Garden", "Rose Garden", "Doddabetta Peak", "Ooty Lake & Boating", "Pykara Waterfalls"],
    nearby: ["Coonoor (20 km)", "Mudumalai National Park (35 km)"],
    foods: ["Fresh homemade chocolates", "Ooty Varkey biscuits", "Nilgiri tea varieties"],
    shopping: ["Commercial Road spice shops", "Toda embroidery handicraft stores"],
    hotels: [
      { name: "Sterling Ooty Fern Hill", rating: "4.5★", price: "₹5,500/night", facilities: "WiFi, Restaurant, Spa" },
      { name: "Hotel Lakeview Ooty", rating: "4.1★", price: "₹2,800/night", facilities: "Cottages, Gardens" }
    ],
    restaurants: [
      { name: "Hotel Nahar Restaurant", type: "Veg", rating: "4.3★" },
      { name: "Place to Bee", type: "Veg/Non-Veg", rating: "4.5★" }
    ],
    emergencyContacts: ["Ooty Police: 100", "Government Hospital: +91 423 244 2212", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Arrival & Local Exploration", desc: "Start from Trichy. Reach Ooty by noon. Check into hotel. Visit Ooty Lake for evening boating, followed by shopping at Commercial Road." },
      { day: 2, title: "Hills & Gardens Day", desc: "Visit Doddabetta Peak for a panoramic view of the Nilgiris. Post lunch, explore the Government Botanical Garden and Rose Garden." },
      { day: 3, title: "Coonoor Sightseeing & Return", desc: "Drive to Coonoor. Visit Sim's Park and Lamb's Rock. Proceed with the scenic drive back to Trichy by evening." }
    ],
    images: [
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "kodaikanal": {
    slug: "kodaikanal",
    name: "Kodaikanal",
    tagline: "The Gift of the Forest",
    description: "Perched 2,133 meters high in the Palani Hills, Kodaikanal is characterized by its scenic misty cliffs, towering pine forests, and a beautiful star-shaped lake.",
    history: "Founded as a refuge from the hot plains by American and British missionaries in 1845.",
    distance: "200 km from Trichy",
    travelTime: "4.5 Hours",
    price: 11000,
    duration: "3 Days / 2 Nights",
    weather: {
      temp: "14°C - 22°C",
      condition: "Misty & Cloudy",
      humidity: "70%",
      bestTime: "September to May"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31411.38550186939!2d77.47895180630761!3d10.23741635835973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9df747ce65d3d%3A0xc5403fa858ea6183!2sKodaikanal%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["AC transportation from Trichy", "Toll gate & parking fees", "Driver allowance"],
    excluded: ["Hotel booking", "Meals", "Sightseeing entry charges"],
    attractions: ["Kodaikanal Lake", "Coaker's Walk", "Pillar Rocks", "Bryant Park", "Pine Forest", "Guna Caves"],
    nearby: ["Mannavanur Lake (35 km)", "Vattakanal (6 km)"],
    foods: ["Fresh local cheese", "Plums & pears", "Homemade chocolates", "Herbal hot teas"],
    shopping: ["Spices & essential oils at Anna Salai", "Handmade woolen clothes at Tibetan market"],
    hotels: [
      { name: "The Carlton Kodaikanal", rating: "4.7★", price: "₹8,500/night", facilities: "Lake view, Gym, Restaurant" },
      { name: "Villa Retreat", rating: "4.4★", price: "₹4,800/night", facilities: "WiFi, Fireplace, Near Coaker's Walk" }
    ],
    restaurants: [
      { name: "Altaf's Cafe (Vattakanal)", type: "Veg/Non-Veg", rating: "4.6★" },
      { name: "Tava Vegetarian Restaurant", type: "Veg", rating: "4.3★" }
    ],
    emergencyContacts: ["Police Station: +91 4542 241 055", "Van Allen Hospital: +91 4542 241 213", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Misty Lake Arrival", desc: "Depart Trichy at 5:30 AM. Arrive Kodai by 10 AM. Visit Coaker's Walk and enjoy boating/cycling around Kodaikanal Lake." },
      { day: 2, title: "Cliffs & Forests Exploration", desc: "Explore the Bryant Park, Pine Forest, Guna Caves, Pillar Rocks, and Green Valley View." },
      { day: 3, title: "Vattakanal Falls & Return", desc: "Enjoy sunrise at Vattakanal viewpoints, visit Kurinji Andavar Temple, check out, and drive safely back to Trichy." }
    ],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "yercaud": {
    slug: "yercaud",
    name: "Yercaud",
    tagline: "Jewel of the South",
    description: "Yercaud is a beautiful hill station located in the Shevaroy Hills of the Eastern Ghats. Quiet, peaceful, and rich in orange groves, coffee plantations, and mist.",
    history: "Discovered and developed as a cool retreat town by Sir Thomas Munroe in 1842, who introduced coffee plantations to the region.",
    distance: "140 km from Trichy",
    travelTime: "3 Hours",
    price: 7500,
    duration: "2 Days / 1 Night",
    weather: {
      temp: "18°C - 26°C",
      condition: "Cool & Pleasant",
      humidity: "62%",
      bestTime: "September to May"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31221.72147493639!2d78.19253457193976!3d11.78252277717462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1d64380f2d7%3A0xbcc0e2b4f6cf544d!2sYercaud%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transit from Trichy", "Toll fees & parking coverage", "Experienced driver allowance"],
    excluded: ["Hotel accommodations", "Personal food charges", "Sightseeing entry tickets"],
    attractions: ["Yercaud Lake (Emerald Lake)", "Lady's Seat Viewpoint", "Killiyur Falls", "Pagoda Point", "Shevaroy Temple", "Botanical Garden"],
    nearby: ["Salem City (30 km)", "Kariyakoil Dam (45 km)"],
    foods: ["Hot fresh local spices tea", "Fresh organic oranges", "Local Tamil meals", "Assorted bajji varieties near the lake"],
    shopping: ["Pure local honey", "Coffee powder", "Essential oils & natural cosmetic perfumes"],
    hotels: [
      { name: "GRT Nature Trails Sky Rocca", rating: "4.6★", price: "₹6,000/night", facilities: "Hill view, AC, WiFi, Spa" },
      { name: "Sterling Yercaud", rating: "4.3★", price: "₹4,500/night", facilities: "Restaurant, Kid zone, Gym" }
    ],
    restaurants: [
      { name: "Sweet Rascal Restaurant", type: "Veg/Non-Veg", rating: "4.5★" },
      { name: "Hotel Sri Saravana Bhavan", type: "Veg", rating: "4.1★" }
    ],
    emergencyContacts: ["Local Police: 100", "Government Hospital Yercaud: +91 4281 222 234", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Lake Boating & Sunset Views", desc: "Board the vehicle in Kattur, Trichy. Travel to Yercaud. Check in and visit Emerald Lake. Evening sightseeing at Lady's Seat and Gent's Seat for beautiful sunset valley views." },
      { day: 2, title: "Waterfalls & Return Journey", desc: "Early breakfast. Visit Killiyur Falls, Pagoda Point, and Shevaroy Temple. Check out and drive safely back to Trichy by evening." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "rameswaram": {
    slug: "rameswaram",
    name: "Rameswaram",
    tagline: "The Holy Island of India",
    description: "Rameswaram is a sacred island town connected to mainland India via the historic Pamban Bridge. A key Char Dham pilgrimage site steeped in Ramayana heritage.",
    history: "According to Hindu epics, Lord Rama built a bridge (Rama Setu) from here to Sri Lanka to rescue his wife Sita.",
    distance: "230 km from Trichy",
    travelTime: "4 Hours",
    price: 9500,
    duration: "2 Days / 1 Night",
    weather: {
      temp: "26°C - 32°C",
      condition: "Tropical Breeze",
      humidity: "75%",
      bestTime: "October to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63004.81979401768!2d79.28308432367469!3d9.289139599507914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01de2d854497ff%3A0x6b876a4df6bf5317!2sRameswaram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable transit from Trichy", "Tolls, permits & parking", "Driver allowances"],
    excluded: ["Temple special entrance fees", "Food and accommodation", "Pooja expenses"],
    attractions: ["Ramanathaswamy Temple", "22 Holy Theerthams bathing", "Agnitheertham beach", "Dhanushkodi Ghost Town", "APJ Abdul Kalam Memorial"],
    nearby: ["Devipattinam (70 km)", "Karaikudi (100 km)"],
    foods: ["Traditional South Indian meals", "Fresh coastal seafood preparations", "Sweet prasadams"],
    shopping: ["Sea shell handicrafts near temple", "Palm leaf baskets", "Religious spiritual items"],
    hotels: [
      { name: "Daiwik Hotel Rameswaram", rating: "4.3★", price: "₹3,800/night", facilities: "Pure Veg restaurant, Spa" },
      { name: "Hyatt Place Rameswaram", rating: "4.6★", price: "₹6,000/night", facilities: "Premium rooms, Gym, Pool" }
    ],
    restaurants: [
      { name: "Sabari Pure Veg Restaurant", type: "Veg", rating: "4.1★" },
      { name: "Gujarat Bhavan Restaurant", type: "Veg", rating: "4.2★" }
    ],
    templeTimings: "Morning: 5:00 AM - 1:00 PM | Evening: 3:00 PM - 9:00 PM",
    emergencyContacts: ["Police Station: +91 4573 221 210", "Govt Hospital: +91 4573 221 233", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Spiritual Baths & Temple Darshan", desc: "Leave Trichy. Cross Pamban Bridge and arrive in Rameswaram by noon. Visit Agnitheertham, bathe in 22 Holy wells inside Ramanathaswamy temple, and complete Darshan. Evening visit to APJ Abdul Kalam Memorial." },
      { day: 2, title: "Dhanushkodi Border Exploration & Return", desc: "Early morning drive to Dhanushkodi, see Rama Setu viewpoint and ghost town ruins. Drive back to mainland India. Return to Trichy by late evening." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "madurai": {
    slug: "madurai",
    name: "Madurai",
    tagline: "The Temple City that Never Sleeps",
    description: "Madurai is one of the oldest continuously inhabited cities in the world. Centered around the architectural masterpiece of the Meenakshi Amman Temple.",
    history: "The capital city of the ancient Pandyan Kingdom, renowned for Sangam Tamil literature assemblies.",
    distance: "130 km from Trichy",
    travelTime: "2.5 Hours",
    price: 4500,
    duration: "1 Day Trip",
    weather: {
      temp: "28°C - 36°C",
      condition: "Sunny & Warm",
      humidity: "58%",
      bestTime: "October to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.17646152864!2d78.07156942006766!3d9.911132711090333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582110c5d3d%3A0xc5403fa858ea6183!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private vehicle transit from Trichy", "Toll charges & parking fees", "Experienced driver allowance"],
    excluded: ["Meals & personal snacks", "Temple entrance/special tickets", "Shopping expenses"],
    attractions: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Alagar Koyil", "Gandhi Memorial Museum"],
    nearby: ["Azhagar Kovil (21 km)", "Kodaikanal (110 km)"],
    foods: ["Famous Jigarthanda sweet drink", "Madurai Idli and mutton chukka", "Paruthi paal", "Kari dosa"],
    shopping: ["Sungudi cotton sarees", "Handloom weavers streets near the temple"],
    hotels: [
      { name: "Heritage Madurai", rating: "4.7★", price: "₹6,500/night", facilities: "Pool, WiFi, Restaurant" },
      { name: "Hotel Supreme Madurai", rating: "4.0★", price: "₹2,200/night", facilities: "Rooftop dining, AC" }
    ],
    restaurants: [
      { name: "Murugan Idli Shop", type: "Veg", rating: "4.4★" },
      { name: "Simmakkal Konar Mess", type: "Veg/Non-Veg", rating: "4.2★" }
    ],
    templeTimings: "Morning: 5:00 AM - 12:30 PM | Evening: 4:00 PM - 9:30 PM",
    emergencyContacts: ["Madurai Police: 100", "Government Rajaji Hospital: +91 452 253 2535", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Full Day Madurai Heritage Tour", desc: "Start from Kattur, Trichy at 6:00 AM. Reach Madurai by 8:30 AM. Complete Meenakshi Amman Temple Darshan. Have lunch. Explore Thirumalai Nayakkar Palace and Gandhi Museum. Enjoy Jigarthanda in the evening. Drive back safely to Trichy by 10 PM." }
    ],
    images: [
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "kanyakumari": {
    slug: "kanyakumari",
    name: "Kanyakumari",
    tagline: "Where Three Oceans Merge",
    description: "Located at the southernmost tip of mainland India, Kanyakumari is famous for its unique sunrises and sunsets over the horizon, and the iconic Thiruvalluvar Statue.",
    history: "Named after Goddess Kanya Kumari, a reincarnation of Parvati, who performed penance here to marry Lord Shiva.",
    distance: "380 km from Trichy",
    travelTime: "7 Hours",
    price: 16500,
    duration: "3 Days / 2 Nights",
    weather: {
      temp: "25°C - 33°C",
      condition: "Breezy & Coastal",
      humidity: "78%",
      bestTime: "October to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31611.38550186939!2d77.53895180630761!3d8.08741635835973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f13d8066bb7f%3A0x6b876a4df6bf5317!2sKanyakumari%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transit from Trichy", "Driver night stay charges & allowances", "Toll/Parking fees"],
    excluded: ["Ferry ticket to Vivekananda Rock", "Hotel accommodation", "Personal meals"],
    attractions: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue (133 ft)", "Kanyakumari Temple", "Sunset Point & Beach", "Triveni Sangam"],
    nearby: ["Suchindram Temple (12 km)", "Padmanabhapuram Palace (35 km)"],
    foods: ["Fresh fish curry & fried fish", "Traditional Kerala-style coconut delicacies", "Hot banana chips"],
    shopping: ["Sea shell ornaments", "Decorative shell mirrors", "Multi-colored beach sands"],
    hotels: [
      { name: "Hotel Sparsa Kanyakumari", rating: "4.4★", price: "₹4,800/night", facilities: "Ocean view, AC, WiFi, Pool" },
      { name: "Hotel Sea View", rating: "4.1★", price: "₹3,500/night", facilities: "Rooftop view, Restaurant" }
    ],
    restaurants: [
      { name: "The Ocean Restaurant", type: "Veg/Non-Veg", rating: "4.2★" },
      { name: "Saravana Bhavan Kanyakumari", type: "Veg", rating: "4.0★" }
    ],
    templeTimings: "Morning: 4:30 AM - 12:30 PM | Evening: 4:00 PM - 8:30 PM",
    emergencyContacts: ["Police Station: +91 4652 246 024", "Govt Hospital: +91 4652 246 250", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Coastal Arrival & Sunset View", desc: "Depart Trichy. Reach Kanyakumari by afternoon. Visit Kanyakumari Temple, Triveni Sangam bathing, and witness a beautiful sunset at the beach." },
      { day: 2, title: "Vivekananda Rock & Memorials", desc: "Catch a spectacular sunrise. Take the morning ferry to Vivekananda Rock Memorial and Thiruvalluvar Statue. Post lunch, visit Gandhi Memorial and Kamarajar Mandapam." },
      { day: 3, title: "Suchindram Temple & Return", desc: "Visit the historic Suchindram Thanumalayan Temple and Padmanabhapuram Palace. Return safely to Trichy by late evening." }
    ],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "velankanni": {
    slug: "velankanni",
    name: "Velankanni",
    tagline: "Shrine of Our Lady of Good Health",
    description: "Velankanni is a famous Marian shrine town located on the Coromandel Coast. Known for the majestic white Basilica of Our Lady of Good Health, drawing millions of global pilgrims.",
    history: "A site of apparitions of the Blessed Virgin Mary and Jesus Christ in the late 16th to early 17th century, leading to the construction of the famous basilica.",
    distance: "150 km from Trichy",
    travelTime: "3.5 Hours",
    price: 5000,
    duration: "1 Day Trip",
    weather: {
      temp: "27°C - 33°C",
      condition: "Tropical Coastal",
      humidity: "74%",
      bestTime: "September to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15678.9619176378!2d79.81864115!3d10.7904833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5550ff2df9d7d%3A0xc48c9bb7cf3957eb!2sVelankanni%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["AC private vehicle transport from Trichy", "Toll gates and parking fees", "Driver allowance"],
    excluded: ["Lodge stay", "Meals & personal donations"],
    attractions: ["Basilica of Our Lady of Good Health", "Velankanni Church Museum", "Velankanni Beach", "Holy Path offering route"],
    nearby: ["Nagapattinam (12 km)", "Tharangambadi Danish Fort (45 km)"],
    foods: ["Fresh local seafood meals", "South Indian meals", "Dry fish varieties"],
    shopping: ["Religious candles & offerings", "Sea shell toys", "Local handlooms"],
    hotels: [
      { name: "Clinton Park Inn", rating: "4.3★", price: "₹3,500/night", facilities: "AC rooms, Veg/Non-veg restaurant" }
    ],
    restaurants: [
      { name: "Maria Restaurant", type: "Veg/Non-Veg", rating: "4.0★" }
    ],
    emergencyContacts: ["Church Office: +91 4365 263 230", "Police Station: +91 4365 263 222", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Complete Marian Pilgrimage", desc: "Start from Kattur, Trichy at 5:30 AM. Arrive in Velankanni by 9:00 AM. Visit the main Basilica, attend the holy mass, explore the offering museum, and walk on the beach. Return back to Trichy by 9:00 PM." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "thanjavur": {
    slug: "thanjavur",
    name: "Thanjavur",
    tagline: "The Cradle of Chola Art & Architecture",
    description: "Thanjavur (Tanjore) is the cultural capital of Chola history. Famously housing the UNESCO World Heritage Brihadeeswarar Temple (Big Temple), showcasing architectural marvels.",
    history: "Thanjavur rose to prominence as the capital of the Chola Empire between the 9th and 11th centuries.",
    distance: "60 km from Trichy",
    travelTime: "1.2 Hours",
    price: 2500,
    duration: "1 Day Trip",
    weather: {
      temp: "28°C - 35°C",
      condition: "Sunny & Warm",
      humidity: "55%",
      bestTime: "October to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.17646152864!2d79.13156942006766!3d10.791132711090333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab582110c5d3d%3A0xc5403fa858ea6183!2sThanjavur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transport from Trichy", "Parking and toll fees", "Driver allowance"],
    excluded: ["Meals", "Temple tour guide fees"],
    attractions: ["Brihadeeswarar Temple (Big Temple)", "Thanjavur Royal Palace", "Saraswathi Mahal Library", "Art Gallery"],
    nearby: ["Kumbakonam (40 km)", "Trichy (60 km)"],
    foods: ["Tanjore-style organic filter coffee", "Traditional Tamil vegetarian meals"],
    shopping: ["Famous Tanjore dancing dolls (Thalayatti Bommai)", "Thanjavur paintings with gold leaf", "Pith craft works"],
    hotels: [
      { name: "Svatma - Luxury Heritage", rating: "4.8★", price: "₹8,000/night", facilities: "Spa, AC, WiFi, Pool" }
    ],
    restaurants: [
      { name: "Adyar Ananda Bhavan (A2B)", type: "Veg", rating: "4.1★" }
    ],
    templeTimings: "Morning: 6:00 AM - 12:30 PM | Evening: 4:00 PM - 8:30 PM",
    emergencyContacts: ["Big Temple Office: +91 4362 223 384", "Govt Hospital: +91 4362 230 460", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Brihadeeswarar Temple & Palace Tour", desc: "Start from Kattur, Trichy at 7:30 AM. Arrive in Tanjore by 8:45 AM. Visit the majestic Brihadeeswarar Temple. Complete Palace and Museum tour after lunch. Shop for dancing dolls. Return back to Trichy by 6:00 PM." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "chidambaram": {
    slug: "chidambaram",
    name: "Chidambaram",
    tagline: "The Abode of cosmic dancer Nataraja",
    description: "Chidambaram is highly famous for its ancient Thillai Natarajar Temple dedicated to Lord Shiva's cosmic dance form (Nataraja) and representing the space (Akasha) element of Panchabhoota Sthalas.",
    history: "Associated with cosmic sage Patanjali. The temple complex was patronized by Chola, Pandya, and Pallava dynasties.",
    distance: "130 km from Trichy",
    travelTime: "3 Hours",
    price: 4500,
    duration: "1 Day Trip",
    weather: {
      temp: "27°C - 34°C",
      condition: "Humid & Coastal",
      humidity: "72%",
      bestTime: "October to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62865.17646152864!2d79.69156942006766!3d11.391132711090333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baab582110c5d3d%3A0xc5403fa858ea6183!2sChidambaram%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transit from Trichy", "Toll fees and parking charges", "Driver allowance"],
    excluded: ["Meals and guide charges", "Temple special entry"],
    attractions: ["Thillai Natarajar Temple", "Pichavaram Mangrove Forests (15 km)", "Annamalai University Campus"],
    nearby: ["Pichavaram (15 km)", "Vaitheeswaran Kovil (25 km)"],
    foods: ["Traditional South Indian meals", "Vada varieties", "Natarajar Temple sweet prasadam"],
    shopping: ["Spiritual puja books", "Brass Nataraja statues", "Traditional clay models"],
    hotels: [
      { name: "Hotel Saradharam Chidambaram", rating: "3.9★", price: "₹2,200/night", facilities: "AC rooms, WiFi" }
    ],
    restaurants: [
      { name: "Sri Krishna Vilas", type: "Veg", rating: "4.1★" }
    ],
    templeTimings: "Morning: 6:00 AM - 12:00 PM | Evening: 5:00 PM - 10:00 PM",
    emergencyContacts: ["Temple Office: +91 4144 222 265", "Police Station: 100", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Nataraja Darshan & Pichavaram Mangroves", desc: "Start from Trichy. Reach Chidambaram. Visit Natarajar temple. Post lunch, visit Pichavaram for a boat ride inside the world's second-largest mangrove forest. Return back to Trichy." }
    ],
    images: [
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "hogenakkal": {
    slug: "hogenakkal",
    name: "Hogenakkal",
    tagline: "The Niagara of India",
    description: "Famous for its roaring waterfalls on the Kaveri River, coracle boating rides (Parisal), and therapeutic herbal oil massages.",
    history: "The name Hogenakkal is derived from Kannada meaning 'Smoking Rocks' due to the mist and spray rising from water hit.",
    distance: "220 km from Trichy",
    travelTime: "5 Hours",
    price: 6500,
    duration: "1 Day Trip",
    weather: {
      temp: "25°C - 34°C",
      condition: "Warm & Mist Spray",
      humidity: "60%",
      bestTime: "July to February"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31611.38550186939!2d77.78895180630761!3d12.08741635835973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f13d8066bb7f%3A0x6b876a4df6bf5317!2sHogenakkal%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transit from Trichy", "Toll gate and parking costs", "Driver allowance"],
    excluded: ["Coracle boat riding tickets", "Oil massage charges", "Meals"],
    attractions: ["Hogenakkal Falls", "Coracle Boating (Parisal)", "Herbal Oil Massage Points", "Children's Park"],
    nearby: ["Dharmapuri (45 km)", "Yercaud (80 km)"],
    foods: ["Fresh river-catch fried fish", "Traditional South Indian meals"],
    shopping: ["Local herbal oils", "Traditional forest honey"],
    hotels: [
      { name: "Hotel Tamil Nadu Hogenakkal", rating: "3.8★", price: "₹2,000/night", facilities: "Standard rooms, AC, Bar" }
    ],
    restaurants: [
      { name: "Local River fish stalls", type: "Veg/Non-Veg", rating: "4.3★" }
    ],
    emergencyContacts: ["Police Station: 100", "Government Primary Clinic: +91 4342 250 230", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Roaring Waterfalls & Coracle Rides", desc: "Depart Trichy at 5:00 AM. Reach Hogenakkal by 10 AM. Hire coracles to go near the falls. Enjoy traditional herbal oil massages and river bath. Lunch near water banks. Return back to Trichy by night." }
    ],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "courtallam": {
    slug: "courtallam",
    name: "Courtallam",
    tagline: "Spa of South India",
    description: "Nestled in the Western Ghats, Courtallam is famous for its multiple active waterfalls whose waters carry therapeutic herbal properties.",
    history: "Associated with cosmic Sage Agastya. Mentioned in Sangam literature for its forest beauty and waterfalls.",
    distance: "290 km from Trichy",
    travelTime: "6 Hours",
    price: 10500,
    duration: "2 Days / 1 Night",
    weather: {
      temp: "22°C - 30°C",
      condition: "Windy & Cool (Seasonal)",
      humidity: "68%",
      bestTime: "June to September (Monsoon)"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63004.81979401768!2d77.28308432367469!3d8.989139599507914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01de2d854497ff%3A0x6b876a4df6bf5317!2sCourtallam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private vehicle from Trichy", "Tolls & parking charges", "Driver allowance"],
    excluded: ["Hotel booking", "Meals", "Massage fees"],
    attractions: ["Main Falls", "Five Falls (Aintharuvi)", "Old Courtallam Falls", "Tiger Falls", "Agasthiyar Temple"],
    nearby: ["Tenkasi (6 km)", "Papanasam Dam (30 km)"],
    foods: ["Hot spicy onion and chili bajjis", "Tirunelveli Halwa sweet", "Local hill honey", "Country chicken curry"],
    shopping: ["Hill station honey", "Spices", "Handicrafts from Tenkasi"],
    hotels: [
      { name: "Saaral Resort Courtallam", rating: "4.2★", price: "₹3,500/night", facilities: "AC, pool, restaurant" }
    ],
    restaurants: [
      { name: "Border Rahmath Mess", type: "Veg/Non-Veg", rating: "4.6★" }
    ],
    emergencyContacts: ["Police Station: 100", "Government Clinic: +91 4633 222 245", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Waterfalls & River Baths", desc: "Start from Trichy. Reach Courtallam. Check in. Take baths in Main Falls and Five Falls. Walk around park areas. Have hot dinner." },
      { day: 2, title: "Tenkasi Temple & Return", desc: "Early breakfast. Visit Old Courtallam Falls, then visit the massive Kasi Viswanathar Temple in Tenkasi. Check out and drive safely back to Trichy." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  },
  "yelagiri": {
    slug: "yelagiri",
    name: "Yelagiri",
    tagline: "The Peaceful Hill Station",
    description: "Yelagiri is an understated hill station nestled in Vellore, consisting of 14 tribal hamlets spread across hills. Serene and ideal for trekking.",
    history: "Formerly the private property of the Yelagiri Zamindar family, taken over by the Government in the 1950s.",
    distance: "270 km from Trichy",
    travelTime: "5.5 Hours",
    price: 9800,
    duration: "2 Days / 1 Night",
    weather: {
      temp: "17°C - 28°C",
      condition: "Pleasant & Breezy",
      humidity: "60%",
      bestTime: "November to February"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31221.72147493639!2d78.63895180630761!3d12.58741635835973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1d64380f2d7%3A0xbcc0e2b4f6cf544d!2sYelagiri%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transit from Trichy", "Driver overnight allowance & tolls", "Parking fee coverage"],
    excluded: ["Hotel accommodations", "Activity and entry tickets"],
    attractions: ["Punganoor Artificial Lake", "Nature Park", "Jalagamparai Waterfalls", "Swamimalai Hills Trekking", "Yelagiri Adventure Camp"],
    nearby: ["Jolarpet (20 km)", "Vellore Fort (90 km)"],
    foods: ["Jackfruit during season", "South Indian meals", "Spiced masala teas"],
    shopping: ["Organic local honey", "Local handcraft items"],
    hotels: [
      { name: "Sterling Yelagiri", rating: "4.2★", price: "₹3,500/night", facilities: "WiFi, Restaurant, Pool" }
    ],
    restaurants: [
      { name: "Hotel Landmark Restaurant", type: "Veg/Non-Veg", rating: "4.0★" }
    ],
    emergencyContacts: ["Police Station: 100", "Government Clinic: +91 4179 245 230", "TSR Support: +91 97914 65995"],
    itinerary: [
      { day: 1, title: "Lake Boating & Adventure Park", desc: "Leave Trichy. Arrive in Yelagiri by noon. Visit Punganoor Lake for boating. Spend evening at the Nature Park and Yelagiri Adventure Camp." },
      { day: 2, title: "Jalagamparai Falls Trek & Return", desc: "Trek to Swamimalai hills for scenic views, visit Jalagamparai Waterfalls. Return safely back to Trichy by night." }
    ],
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  }
};

export function getDestinationDetails(slug: string): DestinationDetails {
  const normalized = slug.toLowerCase();
  if (DESTINATIONS_DATA[normalized]) {
    return DESTINATIONS_DATA[normalized];
  }
  
  // Generic responsive template fallback for other slugs
  return {
    slug: normalized,
    name: normalized.charAt(0).toUpperCase() + normalized.slice(1),
    tagline: "Explore Scenic Tamil Nadu",
    description: `A beautiful and historical destination in Tamil Nadu. Book a customized tour with TSR TRAVEL from Trichy for a safe, comfortable, and affordable transit experience.`,
    history: `${normalized.charAt(0).toUpperCase() + normalized.slice(1)} has a rich historical significance dating back several centuries as part of ancient Tamil kingdoms.`,
    distance: "150 km from Trichy",
    travelTime: "3 Hours",
    price: 6000,
    duration: "2 Days / 1 Night",
    weather: {
      temp: "25°C - 30°C",
      condition: "Sunny & Pleasant",
      humidity: "60%",
      bestTime: "October to March"
    },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125345.9619176378!2d78.61864115!3d10.7904833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff2df9d7d%3A0xc48c9bb7cf3957eb!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    included: ["Comfortable private transit from Trichy", "Toll fees & parking coverage", "Experienced driver allowance"],
    excluded: ["Hotel stay bookings", "Personal food charges", "Entry fees & activities tickets"],
    attractions: ["Scenic nature spots", "Ancient local temples", "Spacious market streets"],
    nearby: ["Trichy local attractions", "Srirangam town (15 km)"],
    foods: ["South Indian filter coffee", "Hot traditional tiffins", "Traditional meals"],
    shopping: ["Handicrafts shops", "Handloom weavers stores"],
    hotels: [
      { name: "TSR Travel Partner Lodge", rating: "4.0★", price: "₹2,500/night", facilities: "AC rooms, WiFi" }
    ],
    restaurants: [
      { name: "Sri Saravana Bhavan", type: "Veg", rating: "4.2★" }
    ],
    emergencyContacts: [
      "Local Police: 100",
      "Ambulance Help: 108",
      "TSR Travels Direct Help: +91 97914 65995"
    ],
    itinerary: [
      { day: 1, title: "Trichy Departure & Transit Sightseeing", desc: "Board your mini bus or van in Kattur, Trichy. Travel to destination, check in, and visit prime viewpoints." },
      { day: 2, title: "Cultural Tour & Return Journey", desc: "Enjoy breakfast, check out, visit remaining spots and shopping streets. Return safely back to Trichy by night." }
    ],
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1626562149725-d1cbf82b0e68?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&q=80&w=600"
    ]
  };
}
