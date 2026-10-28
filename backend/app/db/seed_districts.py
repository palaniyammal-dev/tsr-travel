import logging
from sqlalchemy.orm import Session
from app.models.district import District
from app.models.destination import TouristDestination

logger = logging.getLogger("tsr_seed")

TAMIL_NADU_DISTRICTS = [
    {"name": "Tiruchirappalli", "tamil_name": "திருச்சிராப்பள்ளி", "code": "TRZ", "center_lat": 10.7905, "center_lng": 78.7047, "description": "The geographical and spiritual heart of Tamil Nadu, famous for the ancient Rockfort and Kaveri river.", "banner_image": "/images/landmarks/rockfort.jpg"},
    {"name": "Thanjavur", "tamil_name": "தஞ்சாவூர்", "code": "TJ", "center_lat": 10.7870, "center_lng": 79.1378, "description": "The cultural capital of the Chola Empire, home to the UNESCO World Heritage Brihadisvara Temple.", "banner_image": "/images/landmarks/thanjavur.jpg"},
    {"name": "Madurai", "tamil_name": "மதுரை", "code": "MDU", "center_lat": 9.9252, "center_lng": 78.1198, "description": "The historic temple city of jasmine and Tamil literature, crowned by the grand Meenakshi Amman Temple.", "banner_image": "/images/landmarks/madurai.jpg"},
    {"name": "Dindigul", "tamil_name": "திண்டுக்கல்", "code": "DG", "center_lat": 10.3673, "center_lng": 77.9803, "description": "Gateway to the misty princess of hill stations, Kodaikanal, and famous for historical rock forts.", "banner_image": "/images/packages/kodaikanal.jpg"},
    {"name": "The Nilgiris", "tamil_name": "நீலகிரி", "code": "NIL", "center_lat": 11.4102, "center_lng": 76.6950, "description": "The Blue Mountains with sprawling tea estates, cool climate, and Queen of Hills, Ooty.", "banner_image": "/images/packages/ooty.jpg"},
    {"name": "Ramanathapuram", "tamil_name": "இராமநாதபுரம்", "code": "RAM", "center_lat": 9.3639, "center_lng": 78.8395, "description": "Sacred coastal land of Rameswaram, pristine Dhanushkodi sands, and the historic Pamban Bridge.", "banner_image": "/images/packages/rameswaram.jpg"},
    {"name": "Kanyakumari", "tamil_name": "கன்னியாகுமரி", "code": "KK", "center_lat": 8.0883, "center_lng": 77.5385, "description": "The southernmost tip of India where three seas meet, famed for sunrise, sunset, and Vivekananda Rock.", "banner_image": "/images/packages/kanyakumari.jpg"},
    {"name": "Salem", "tamil_name": "சேலம்", "code": "SLM", "center_lat": 11.6643, "center_lng": 78.1460, "description": "Land of steel, mangoes, and the scenic jewel of Shevaroy hills, Yercaud.", "banner_image": "/images/packages/yercaud.jpg"},
    {"name": "Tenkasi", "tamil_name": "தென்காசி", "code": "TS", "center_lat": 8.9594, "center_lng": 77.3152, "description": "The spa of South India, celebrated for mineral-rich medicinal waterfalls at Courtallam.", "banner_image": "/images/packages/courtallam.jpg"},
    {"name": "Tirunelveli", "tamil_name": "திருநெல்வேலி", "code": "TNV", "center_lat": 8.7139, "center_lng": 77.7567, "description": "Historic city along the Thamirabarani river, famous for Nellaiappar Temple, halwa, and dams.", "banner_image": "/images/packages/tirunelveli.jpg"},
    {"name": "Nagapattinam", "tamil_name": "நாகப்பட்டினம்", "code": "NGP", "center_lat": 10.7672, "center_lng": 79.8424, "description": "Spiritual coastal district renowned for the world-famous Velankanni Basilica and Nagore Dargah.", "banner_image": "/images/packages/velankanni.jpg"},
    {"name": "Mayiladuthurai", "tamil_name": "மயிலாடுதுறை", "code": "MYD", "center_lat": 11.1075, "center_lng": 79.6523, "description": "Ancient temple district with Navagraha circuits, Poompuhar heritage beach, and Dutch Fort.", "banner_image": "/images/landmarks/poompuhar.jpg"},
    {"name": "Cuddalore", "tamil_name": "கடலூர்", "code": "CUD", "center_lat": 11.7480, "center_lng": 79.7714, "description": "Famous for the cosmic dance temple at Chidambaram and the dense Pichavaram mangrove forests.", "banner_image": "/images/packages/chidambaram.jpg"},
    {"name": "Dharmapuri", "tamil_name": "தருமபுரி", "code": "DHP", "center_lat": 12.1211, "center_lng": 78.1582, "description": "Scenic gorge region where the Kaveri drops dramatically as the Niagara of India, Hogenakkal.", "banner_image": "/images/packages/hogenakkal.jpg"},
    {"name": "Tiruvannamalai", "tamil_name": "திருவண்ணாமலை", "code": "TVM", "center_lat": 12.2253, "center_lng": 79.0747, "description": "Sacred fire element shrine of Lord Shiva and spiritual haven of Sri Ramana Maharshi's Arunachala.", "banner_image": "/images/landmarks/tiruvannamalai.jpg"},
    {"name": "Chennai", "tamil_name": "சென்னை", "code": "CHN", "center_lat": 13.0827, "center_lng": 80.2707, "description": "The vibrant capital gateway of Tamil Nadu with historic Marina Beach and colonial landmarks.", "banner_image": "/images/landmarks/chennai.jpg"},
    {"name": "Kanchipuram", "tamil_name": "காஞ்சிபுரம்", "code": "KPM", "center_lat": 12.8342, "center_lng": 79.7036, "description": "The city of a thousand temples and world-renowned Kanchipuram silk sarees.", "banner_image": "/images/landmarks/kanchipuram.jpg"},
    {"name": "Coimbatore", "tamil_name": "கோயம்புத்தூர்", "code": "CBE", "center_lat": 11.0168, "center_lng": 76.9558, "description": "The Manchester of South India, foothills of the Western Ghats with Marudhamalai and Adiyogi.", "banner_image": "/images/landmarks/coimbatore.jpg"},
    {"name": "Erode", "tamil_name": "ஈரோடு", "code": "ERD", "center_lat": 11.3410, "center_lng": 77.7172, "description": "The turmeric city, famous for Bhavani Sangameshwarar confluence and Bhavanisagar Dam.", "banner_image": "/images/landmarks/erode.jpg"},
    {"name": "Tiruppur", "tamil_name": "திருப்பூர்", "code": "TPR", "center_lat": 11.1085, "center_lng": 77.3411, "description": "Knitwear capital of India, with historic temples, dams, and proximity to Anamalai Tiger Reserve.", "banner_image": "/images/landmarks/tiruppur.jpg"},
    {"name": "Theni", "tamil_name": "தேனி", "code": "THN", "center_lat": 10.0104, "center_lng": 77.4768, "description": "Surrounded by Western Ghats cardamom valleys, Suruli waterfalls, and Meghamalai hills.", "banner_image": "/images/landmarks/theni.jpg"},
    {"name": "Karur", "tamil_name": "கரூர்", "code": "KRR", "center_lat": 10.9601, "center_lng": 78.0766, "description": "Ancient Chera capital on the Amaravathi river, famed for Pasupatheeswarar temple and textiles.", "banner_image": "/images/landmarks/karur.jpg"},
    {"name": "Namakkal", "tamil_name": "நாமக்கல்", "code": "NKL", "center_lat": 11.2189, "center_lng": 78.1674, "description": "Dominated by the massive single-stone Namakkal Anjaneyar fort temple and Kolli Hills.", "banner_image": "/images/landmarks/namakkal.jpg"},
    {"name": "Perambalur", "tamil_name": "பெரம்பலூர்", "code": "PER", "center_lat": 11.2342, "center_lng": 78.8820, "description": "Gateway to Ranjankudi Fort and ancient fossil beds near Trichy.", "banner_image": "/images/landmarks/perambalur.jpg"},
    {"name": "Ariyalur", "tamil_name": "அரியலூர்", "code": "ARI", "center_lat": 11.1401, "center_lng": 79.0786, "description": "Famed for the UNESCO monument Gangaikonda Cholapuram, capital of Rajendra Chola.", "banner_image": "/images/landmarks/ariyalur.jpg"},
    {"name": "Pudukkottai", "tamil_name": "புதுக்கோட்டை", "code": "PDK", "center_lat": 10.3797, "center_lng": 78.8208, "description": "Former princely state steeped in rock-cut temples, Sittanavasal caves, and Thirumayam Fort.", "banner_image": "/images/landmarks/pudukkottai.jpg"},
    {"name": "Sivaganga", "tamil_name": "சிவகங்கை", "code": "SVG", "center_lat": 9.8433, "center_lng": 78.4809, "description": "Land of brave queen Rani Velu Nachiyar, Chettinad heritage mansions, and Pillayarpatti temple.", "banner_image": "/images/landmarks/sivaganga.jpg"},
    {"name": "Virudhunagar", "tamil_name": "விருதுநகர்", "code": "VRD", "center_lat": 9.5680, "center_lng": 77.9624, "description": "Birthplace of Kamarajar, famous for Srivilliputhur Andal Temple gopuram emblem of Tamil Nadu.", "banner_image": "/images/landmarks/virudhunagar.jpg"},
    {"name": "Thoothukudi", "tamil_name": "தூத்துக்குடி", "code": "TUT", "center_lat": 8.7642, "center_lng": 78.1348, "description": "The Pearl City, renowned for Lady of Snows Basilica, Tiruchendur Murugan Temple by the sea.", "banner_image": "/images/landmarks/thoothukudi.jpg"},
    {"name": "Tiruvarur", "tamil_name": "திருவாரூர்", "code": "TVR", "center_lat": 10.7725, "center_lng": 79.6365, "description": "Birthplace of the Trinity of Carnatic music and home to the gigantic Thyagaraja Temple car.", "banner_image": "/images/landmarks/tiruvarur.jpg"},
    {"name": "Viluppuram", "tamil_name": "விழுப்புரம்", "code": "VLP", "center_lat": 11.9401, "center_lng": 79.4861, "description": "Historical stronghold featuring Gingee Fort, the impregnable Troy of the East.", "banner_image": "/images/landmarks/viluppuram.jpg"},
    {"name": "Kallakurichi", "tamil_name": "கள்ளக்குறிச்சி", "code": "KLK", "center_lat": 11.7383, "center_lng": 78.9639, "description": "Picturesque district nestled against the Kalvarayan Hills and Megam Falls.", "banner_image": "/images/landmarks/kallakurichi.jpg"},
    {"name": "Chengalpattu", "tamil_name": "செங்கல்பட்டு", "code": "CGL", "center_lat": 12.6841, "center_lng": 79.9836, "description": "Coastal heritage corridor featuring UNESCO monuments at Mahabalipuram and Vedanthangal Bird Sanctuary.", "banner_image": "/images/landmarks/chengalpattu.jpg"},
    {"name": "Tiruvallur", "tamil_name": "திருவள்ளூர்", "code": "TLR", "center_lat": 13.1433, "center_lng": 79.9083, "description": "Historic district famous for Veeraraghava Swamy Temple and Pulicat Lake lagoon.", "banner_image": "/images/landmarks/tiruvallur.jpg"},
    {"name": "Ranipet", "tamil_name": "ராணிப்பேட்டை", "code": "RNP", "center_lat": 12.9224, "center_lng": 79.3330, "description": "Industrial town on the Palar river with rich historical origins dating to the Arcot era.", "banner_image": "/images/landmarks/ranipet.jpg"},
    {"name": "Vellore", "tamil_name": "வேலூர்", "code": "VEL", "center_lat": 12.9165, "center_lng": 79.1325, "description": "Famed for the 16th-century stone Vellore Fort, Jalakanteswarar temple, and Sripuram Golden Temple.", "banner_image": "/images/landmarks/vellore.jpg"},
    {"name": "Tirupathur", "tamil_name": "திருப்பத்தூர்", "code": "TPT", "center_lat": 12.4934, "center_lng": 78.5678, "description": "Gateway to the quiet, serene orchards and rose gardens of Yelagiri Hills.", "banner_image": "/images/landmarks/tirupathur.jpg"},
    {"name": "Krishnagiri", "tamil_name": "கிருஷ்ணகிரி", "code": "KRI", "center_lat": 12.5186, "center_lng": 78.2137, "description": "Land of mango orchards, Krishnagiri Dam reservoir park, and hill forts.", "banner_image": "/images/landmarks/krishnagiri.jpg"}
]

TOURIST_DESTINATIONS = [
    # 1. TIRUCHIRAPPALLI
    {
        "district_name": "Tiruchirappalli",
        "name": "Rockfort Ucchi Pillayar Temple",
        "tamil_name": "மலைக்கோட்டை உச்சிப் பிள்ளையார் கோயில்",
        "category": "Temples",
        "description": "Perched atop an ancient 3.8-billion-year-old rock, this iconic temple offers breathtaking 360-degree panoramic views of Tiruchirappalli and the sacred Kaveri river.",
        "tamil_description": "3.8 பில்லியன் ஆண்டுகள் பழமையான பாறை மீது அமைந்த வரலாற்று சிறப்புமிக்க கோயில். திருச்சிராப்பள்ளி நகரின் அழகிய முழு காட்சியை காணலாம்.",
        "image_url": "/images/landmarks/rockfort.jpg",
        "lat": 10.8284,
        "lng": 78.6967,
        "distance_from_trichy_km": 5.0,
        "est_travel_time_hours": 0.25,
        "best_time_to_visit": "October to March (Early morning or evening climb)",
        "visiting_hours": "06:00 AM - 08:00 PM"
    },
    {
        "district_name": "Tiruchirappalli",
        "name": "Sri Ranganathaswamy Temple, Srirangam",
        "tamil_name": "ஸ்ரீரங்கம் ரங்கநாதசுவாமி திருக்கோயில்",
        "category": "Temples",
        "description": "The largest functioning Hindu temple complex in the world with 21 majestic gopurams, enclosed within 7 concentric courtyards on an island in the Kaveri river.",
        "tamil_description": "உலகிலேயே மிகப்பெரிய செயல்பாட்டு இந்து கோயில் வளாகம். 21 பிரம்மாண்ட கோபுரங்கள் மற்றும் 7 சுற்று பிரகாரங்களுடன் காவிரியின் நடுவே அமைந்துள்ளது.",
        "image_url": "/images/landmarks/srirangam.jpg",
        "lat": 10.8624,
        "lng": 78.6901,
        "distance_from_trichy_km": 9.0,
        "est_travel_time_hours": 0.35,
        "best_time_to_visit": "November to February (Vaikunta Ekadasi season)",
        "visiting_hours": "06:00 AM - 09:00 PM"
    },
    {
        "district_name": "Tiruchirappalli",
        "name": "Kallanai Dam (Grand Anicut)",
        "tamil_name": "கல்லணை (கிராண்ட் அணைக்கட்டு)",
        "category": "Dams",
        "description": "Built by King Karikala Chola in the 2nd century AD, this is one of the world's oldest water-diversion dams still in active use, a triumph of ancient hydraulic engineering.",
        "tamil_description": "கி.பி. 2-ஆம் நூற்றாண்டில் கரிகால சோழனால் கட்டப்பட்ட உலகின் மிகப்பழமையான பயன்பாட்டில் உள்ள அணைக்கட்டு. சோழர் கால நீர்மேலாண்மையின் அதிசயம்.",
        "image_url": "/images/landmarks/kallanai.jpg",
        "lat": 10.8354,
        "lng": 78.8198,
        "distance_from_trichy_km": 18.0,
        "est_travel_time_hours": 0.45,
        "best_time_to_visit": "August to January (During river flow)",
        "visiting_hours": "08:00 AM - 06:30 PM"
    },
    {
        "district_name": "Tiruchirappalli",
        "name": "Mukkombu Upper Anicut",
        "tamil_name": "முக்கொம்பு மேலணை பூங்கா",
        "category": "Picnic Spots",
        "description": "A picturesque picnic spot where the Kaveri branches into Kollidam, surrounded by lush landscaped gardens, boating facilities, and a children's play area.",
        "tamil_description": "காவிரி மற்றும் கொள்ளிடம் ஆறுகள் பிரியும் இடத்தில் அமைந்துள்ள இயற்கை எழில் சூழ்ந்த குடும்ப சுற்றுலா மற்றும் பூங்கா தளம்.",
        "image_url": "/images/landmarks/kallanai.jpg",
        "lat": 10.8753,
        "lng": 78.5836,
        "distance_from_trichy_km": 16.0,
        "est_travel_time_hours": 0.4,
        "best_time_to_visit": "September to February",
        "visiting_hours": "09:00 AM - 06:00 PM"
    },

    # 2. THANJAVUR
    {
        "district_name": "Thanjavur",
        "name": "Brihadisvara Big Temple",
        "tamil_name": "தஞ்சை பெரிய கோயில் (பிரகதீஸ்வரர்)",
        "category": "Heritage",
        "description": "UNESCO World Heritage Site built by Raja Raja Chola I in 1010 AD. Its 66-meter granite vimana and single-stone monolithic dome are architectural masterpieces.",
        "tamil_description": "முதலாம் இராஜராஜ சோழனால் கட்டப்பட்ட உலக பாரம்பரிய சின்னம். 216 அடி உயர விமானமும் 80 டன் ஒற்றைக்கல் கலசமும் கொண்ட கட்டிடக்கலை அதிசயம்.",
        "image_url": "/images/landmarks/thanjavur.jpg",
        "lat": 10.7828,
        "lng": 79.1318,
        "distance_from_trichy_km": 58.0,
        "est_travel_time_hours": 1.15,
        "best_time_to_visit": "October to March",
        "visiting_hours": "06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM"
    },
    {
        "district_name": "Thanjavur",
        "name": "Thanjavur Maratha Palace & Art Gallery",
        "tamil_name": "தஞ்சாவூர் மராட்டிய அரண்மனை & அருங்காட்சியகம்",
        "category": "Heritage",
        "description": "The regal palace of the Nayaks and Marathas, housing the world-famous Saraswathi Mahal Library, rare Chola bronze sculptures, and royal Durbar halls.",
        "tamil_description": "நாயக்கர் மற்றும் மராட்டிய மன்னர்களின் அரண்மனை. சரஸ்வதி மஹால் நூலகம் மற்றும் அரிய சோழர் கால வெண்கலச் சிலைகள் இங்குள்ளன.",
        "image_url": "/images/landmarks/thanjavur.jpg",
        "lat": 10.7925,
        "lng": 79.1384,
        "distance_from_trichy_km": 60.0,
        "est_travel_time_hours": 1.2,
        "best_time_to_visit": "Year-round",
        "visiting_hours": "09:00 AM - 05:30 PM"
    },

    # 3. MADURAI
    {
        "district_name": "Madurai",
        "name": "Arulmigu Meenakshi Sundareswarar Temple",
        "tamil_name": "மதுரை அருள்மிகு மீனாட்சி சுந்தரேஸ்வரர் திருக்கோயில்",
        "category": "Temples",
        "description": "Centuries-old architectural wonder dedicated to Goddess Meenakshi, featuring 14 towering gopurams, the Hall of Thousand Pillars, and intricate stone carvings.",
        "tamil_description": "மீனாட்சி அம்மனுக்காக அமைக்கப்பட்ட பிரம்மாண்ட ஆன்மீக தளம். 14 வண்ணமயமான கோபுரங்கள் மற்றும் ஆயிரங்கால் மண்டபம் கொண்ட தமிழரின் பெருமை.",
        "image_url": "/images/landmarks/madurai.jpg",
        "lat": 9.9195,
        "lng": 78.1193,
        "distance_from_trichy_km": 135.0,
        "est_travel_time_hours": 2.2,
        "best_time_to_visit": "October to March (Chithirai Festival in April)",
        "visiting_hours": "05:00 AM - 12:30 PM, 04:00 PM - 10:00 PM"
    },
    {
        "district_name": "Madurai",
        "name": "Thirumalai Nayakar Mahal",
        "tamil_name": "திருமலை நாயக்கர் அரண்மனை",
        "category": "Heritage",
        "description": "Grand 17th-century palace built by King Thirumalai Nayak in Indo-Saracenic style, famous for its colossal pillars, dome ceiling, and evening sound-and-light show.",
        "tamil_description": "17-ஆம் நூற்றாண்டில் கட்டப்பட்ட பிரம்மாண்ட அரண்மனை. பிரம்மாண்ட தூண்கள் மற்றும் மாலை நேர ஒலி-ஒளி காட்சிகளுக்கு புகழ்பெற்றது.",
        "image_url": "/images/landmarks/madurai.jpg",
        "lat": 9.9154,
        "lng": 78.1242,
        "distance_from_trichy_km": 136.0,
        "est_travel_time_hours": 2.25,
        "best_time_to_visit": "October to March",
        "visiting_hours": "09:00 AM - 05:00 PM"
    },

    # 4. DINDIGUL / KODAIKANAL
    {
        "district_name": "Dindigul",
        "name": "Kodaikanal Lake & Coaker's Walk",
        "tamil_name": "கொடைக்கானல் ஏரி மற்றும் கோக்கர்ஸ் வாக்",
        "category": "Hill Stations",
        "description": "A serene star-shaped artificial lake surrounded by pine slopes, offering pedal boating, horse riding, cycling, and walking promenade above the clouds.",
        "tamil_description": "குளுமையான நட்சத்திர வடிவ ஏரி. படகு சவாரி, சைக்கிளிங் மற்றும் மேகக் கூட்டங்களை ரசிக்கும் கோக்கர்ஸ் வாக் நடைபாதை.",
        "image_url": "/images/packages/kodaikanal.jpg",
        "lat": 10.2381,
        "lng": 77.4892,
        "distance_from_trichy_km": 198.0,
        "est_travel_time_hours": 4.2,
        "best_time_to_visit": "April to June (Summer) and September to January (Winter mist)",
        "visiting_hours": "07:00 AM - 07:00 PM"
    },
    {
        "district_name": "Dindigul",
        "name": "Pillar Rocks & Guna Caves",
        "tamil_name": "பில்லர் ராக்ஸ் மற்றும் குணா குகை",
        "category": "Hill Stations",
        "description": "Three vertical granite rock pillars standing 122 meters high amidst drifting mist, accompanied by the mysterious deep pine chambers of Guna Caves.",
        "tamil_description": "122 மீட்டர் உயரமுள்ள மூன்று இயற்கையான செங்குத்து பாறைத் தூண்கள் மற்றும் பசுமையான பைன் மரக்காடுகளுக்கு இடையே உள்ள குணா குகை.",
        "image_url": "/images/packages/kodaikanal.jpg",
        "lat": 10.2114,
        "lng": 77.4665,
        "distance_from_trichy_km": 205.0,
        "est_travel_time_hours": 4.4,
        "best_time_to_visit": "September to May",
        "visiting_hours": "09:00 AM - 05:00 PM"
    },

    # 5. THE NILGIRIS / OOTY
    {
        "district_name": "The Nilgiris",
        "name": "Government Botanical Garden, Ooty",
        "tamil_name": "ஊட்டி அரசு தாவரவியல் பூங்கா",
        "category": "Hill Stations",
        "description": "Sprawling across 55 acres of terraced Nilgiri hillsides, showcasing over a thousand species of exotic flora, fossilized tree trunks, and Italian gardens.",
        "tamil_description": "55 ஏக்கர் பரப்பளவில் அமைந்துள்ள அழகிய தாவரவியல் பூங்கா. அரிய தாவரங்கள், 20 மில்லியன் ஆண்டுகள் பழமையான மர படிமம் கொண்டது.",
        "image_url": "/images/packages/ooty.jpg",
        "lat": 11.4178,
        "lng": 76.7118,
        "distance_from_trichy_km": 260.0,
        "est_travel_time_hours": 5.5,
        "best_time_to_visit": "October to June (Flower Show in May)",
        "visiting_hours": "07:00 AM - 06:30 PM"
    },
    {
        "district_name": "The Nilgiris",
        "name": "Pykara Waterfalls & Lake",
        "tamil_name": "பைகாரா நீர்வீழ்ச்சி & ஏரி",
        "category": "Waterfalls",
        "description": "Sacred Toda river cascading into tiered waterfalls surrounded by shola forests and rolling Nilgiri grassland hills, featuring speedboat rides.",
        "tamil_description": "சோலை காடுகளுக்கு நடுவே தவழ்ந்து பாயும் அழகிய நீர்வீழ்ச்சி மற்றும் ஸ்பீட் போட் படகு சவாரி வசதி கொண்ட பைகாரா ஏரி.",
        "image_url": "/images/packages/ooty.jpg",
        "lat": 11.4554,
        "lng": 76.5982,
        "distance_from_trichy_km": 280.0,
        "est_travel_time_hours": 6.0,
        "best_time_to_visit": "July to January (Full waterfall flow)",
        "visiting_hours": "08:30 AM - 05:30 PM"
    },

    # 6. RAMANATHAPURAM / RAMESWARAM
    {
        "district_name": "Ramanathapuram",
        "name": "Ramanathaswamy Temple & 22 Theerthams",
        "tamil_name": "இராமேஸ்வரம் ராமநாதசுவாமி திருக்கோயில் & 22 தீர்த்தங்கள்",
        "category": "Temples",
        "description": "Sacred Jyotirlinga shrine featuring the world's longest pillared corridor stretching over 1.2 kilometers, with 22 holy freshwater bathing wells.",
        "tamil_description": "உலகின் மிக நீளமான 1200 மீட்டர் திருச்சுற்று பிரகாரம் மற்றும் 22 புனித தீர்த்த கிணறுகள் கொண்ட புகழ்பெற்ற ஜோதிர்லிங்க தலம்.",
        "image_url": "/images/packages/rameswaram.jpg",
        "lat": 9.2881,
        "lng": 79.3174,
        "distance_from_trichy_km": 230.0,
        "est_travel_time_hours": 4.0,
        "best_time_to_visit": "October to April",
        "visiting_hours": "05:00 AM - 01:00 PM, 03:00 PM - 09:00 PM"
    },
    {
        "district_name": "Ramanathapuram",
        "name": "Dhanushkodi & Arichal Munai",
        "tamil_name": "தனுஷ்கோடி & அரிச்சல் முனை",
        "category": "Beaches",
        "description": "The ghost town between the Bay of Bengal and Indian Ocean, leading to the dramatic tip of Arichal Munai and the historic Rama Setu sandbanks.",
        "tamil_description": "வங்காள விரிகுடாவும் இந்திய பெருங்கடலும் சங்கமிக்கும் நில முனை. வரலாற்று சிறப்புமிக்க ராமர் பாலம் மற்றும் அமைதியான கடற்கரை.",
        "image_url": "/images/packages/rameswaram.jpg",
        "lat": 9.1764,
        "lng": 79.4182,
        "distance_from_trichy_km": 250.0,
        "est_travel_time_hours": 4.5,
        "best_time_to_visit": "October to March (Daylight hours only)",
        "visiting_hours": "06:00 AM - 06:00 PM"
    },

    # 7. KANYAKUMARI
    {
        "district_name": "Kanyakumari",
        "name": "Vivekananda Rock Memorial & Thiruvalluvar Statue",
        "tamil_name": "விவேகானந்தர் பாறை நினைவு மண்டபம் & திருவள்ளுவர் சிலை",
        "category": "Heritage",
        "description": "Majestic rock monuments located off the coast where Swami Vivekananda meditated, adjacent to the towering 133-foot stone statue of Tamil saint poet Thiruvalluvar.",
        "tamil_description": "முக்கடல் சங்கமத்தில் அமைந்துள்ள 133 அடி உயர திருவள்ளுவர் சிலை மற்றும் விவேகானந்தர் பாறை நினைவு மண்டபம். படகு வழி பயணம்.",
        "image_url": "/images/packages/kanyakumari.jpg",
        "lat": 8.0780,
        "lng": 77.5552,
        "distance_from_trichy_km": 385.0,
        "est_travel_time_hours": 6.5,
        "best_time_to_visit": "October to March (Spectacular Chitra Pournami full moon)",
        "visiting_hours": "08:00 AM - 04:30 PM (Ferry service hours)"
    },
    {
        "district_name": "Kanyakumari",
        "name": "Kanyakumari Sunset & Triveni Sangam",
        "tamil_name": "கன்னியாகுமரி முக்கடல் சங்கமம் & சூரிய அஸ்தமன முனை",
        "category": "Beaches",
        "description": "The sacred Triveni Sangam where the Arabian Sea, Indian Ocean, and Bay of Bengal converge, famous for viewing both sunrise and sunset across the open ocean.",
        "tamil_description": "அரபிக்கடல், இந்தியப் பெருங்கடல் மற்றும் வங்கக்கடல் சங்கமிக்கும் இடம். ஒரே இடத்தில் சூரிய உதயம் மற்றும் மறைவை ரசிக்கலாம்.",
        "image_url": "/images/packages/kanyakumari.jpg",
        "lat": 8.0815,
        "lng": 77.5502,
        "distance_from_trichy_km": 383.0,
        "est_travel_time_hours": 6.4,
        "best_time_to_visit": "October to March",
        "visiting_hours": "05:30 AM - 07:30 PM"
    },

    # 8. SALEM / YERCAUD
    {
        "district_name": "Salem",
        "name": "Yercaud Emerald Lake & Lady's Seat",
        "tamil_name": "ஏற்காடு ஏரி & லேடிஸ் சீட்",
        "category": "Hill Stations",
        "description": "Charming hilltop lake nestled in the Shevaroy range with lush gardens, orange groves, and high cliff vantage points overlooking the Salem valley below.",
        "tamil_description": "சேர்வராயன் மலைகளில் அமைந்துள்ள ஏரி. படகு சவாரி மற்றும் சேலம் நகரின் அழகை மேலிருந்து பார்க்கும் லேடிஸ் சீட் காட்சி முனை.",
        "image_url": "/images/packages/yercaud.jpg",
        "lat": 11.7766,
        "lng": 78.2094,
        "distance_from_trichy_km": 165.0,
        "est_travel_time_hours": 3.4,
        "best_time_to_visit": "October to June",
        "visiting_hours": "07:00 AM - 06:30 PM"
    },
    {
        "district_name": "Salem",
        "name": "Killiyur Falls",
        "tamil_name": "கிள்ளியூர் நீர்வீழ்ச்சி",
        "category": "Waterfalls",
        "description": "A stunning 300-foot waterfall cascading into the tranquil valley of Yercaud, accessible via a short scenic trek through lush forest canopy.",
        "tamil_description": "ஏற்காட்டில் 300 அடி உயரத்தில் இருந்து பாயும் நீர்வீழ்ச்சி. வனப் பாதையில் நடைபயணம் மேற்கொண்டு இயற்கை அழகை ரசிக்கலாம்.",
        "image_url": "/images/packages/yercaud.jpg",
        "lat": 11.7942,
        "lng": 78.2014,
        "distance_from_trichy_km": 170.0,
        "est_travel_time_hours": 3.6,
        "best_time_to_visit": "September to January (Post-monsoon rush)",
        "visiting_hours": "08:00 AM - 05:00 PM"
    },

    # 9. TENKASI / TIRUNELVELI
    {
        "district_name": "Tenkasi",
        "name": "Courtallam Main Falls",
        "tamil_name": "குற்றாலம் பேரருவி",
        "category": "Waterfalls",
        "description": "The spa of South India, Courtallam cascades over therapeutic herbal forests in the Western Ghats, renowned for soothing and rejuvenating herbal water showers.",
        "tamil_description": "மேற்கு தொடர்ச்சி மலையின் மூலிகை செடிகள் வழியாக பாய்ந்து வரும் மருத்துவ குணம் கொண்ட குற்றால பேரருவி.",
        "image_url": "/images/packages/courtallam.jpg",
        "lat": 8.9288,
        "lng": 77.2687,
        "distance_from_trichy_km": 290.0,
        "est_travel_time_hours": 5.2,
        "best_time_to_visit": "June to September (Southwest Monsoon season)",
        "visiting_hours": "06:00 AM - 07:00 PM"
    },
    {
        "district_name": "Tirunelveli",
        "name": "Arulmigu Nellaiappar Temple",
        "tamil_name": "திருநெல்வேலி அருள்மிகு நெல்லையப்பர் திருக்கோயில்",
        "category": "Temples",
        "description": "Sprawling 14-acre Chola-Pandya temple complex celebrated for its musical stone pillars that resonate with musical notes when tapped and the Golden Lotus Tank.",
        "tamil_description": "இசை தூண்கள், தங்கத் தாமரை குளம் மற்றும் மாபெரும் கோபுரங்கள் கொண்ட வரலாற்று சிறப்புமிக்க நெல்லையப்பர் காந்திமதி அம்மன் கோயில்.",
        "image_url": "/images/packages/tirunelveli.jpg",
        "lat": 8.7291,
        "lng": 77.6853,
        "distance_from_trichy_km": 280.0,
        "est_travel_time_hours": 4.8,
        "best_time_to_visit": "October to March",
        "visiting_hours": "05:30 AM - 12:30 PM, 04:30 PM - 09:00 PM"
    },

    # 10. NAGAPATTINAM / MAYILADUTHURAI
    {
        "district_name": "Nagapattinam",
        "name": "Basilica of Our Lady of Good Health, Velankanni",
        "tamil_name": "வேளாங்கண்ணி ஆரோக்கிய மாதா திருத்தலம்",
        "category": "Heritage",
        "description": "World-renowned Catholic shrine drawing millions of pilgrims of all faiths to the Coromandel coast, crowned by Gothic architecture.",
        "tamil_description": "உலகெங்கிலும் இருந்து பலதரப்பட்ட மக்கள் வந்து வழிபடும் கோதிக் கட்டிடக்கலை அமைப்பிலான புகழ்பெற்ற புனித ஆரோக்கிய அன்னை பேராலயம்.",
        "image_url": "/images/packages/velankanni.jpg",
        "lat": 10.6807,
        "lng": 79.8494,
        "distance_from_trichy_km": 150.0,
        "est_travel_time_hours": 3.2,
        "best_time_to_visit": "August to March (Feast day on Sept 8)",
        "visiting_hours": "05:00 AM - 09:00 PM"
    },
    {
        "district_name": "Mayiladuthurai",
        "name": "Poompuhar Heritage Beach & Silappadikaram Art Gallery",
        "tamil_name": "பூம்புகார் கடற்கரை & சிலப்பதிகார கலைக்கூடம்",
        "category": "Beaches",
        "description": "Ancient submerged port capital of the early Cholas, commemorated with monuments and seven-tiered sculptural galleries celebrating the Tamil epic Silappadikaram.",
        "tamil_description": "சோழர்களின் தொன்மை துறைமுக நகரம். சிலப்பதிகார காப்பிய காட்சிகளை சித்தரிக்கும் சிற்ப கலைக்கூடம் மற்றும் அழகிய கடற்கரை.",
        "image_url": "/images/landmarks/poompuhar.jpg",
        "lat": 11.1444,
        "lng": 79.8558,
        "distance_from_trichy_km": 165.0,
        "est_travel_time_hours": 3.5,
        "best_time_to_visit": "October to March",
        "visiting_hours": "08:30 AM - 06:00 PM"
    },

    # 11. CUDDALORE
    {
        "district_name": "Cuddalore",
        "name": "Thillai Nataraja Temple, Chidambaram",
        "tamil_name": "சிதம்பரம் தில்லை நடராஜர் திருக்கோயில்",
        "category": "Temples",
        "description": "The sacred cosmic dance shrine representing the element of Space (Akasha), with its gold-plated roof, jewel-adorned gopurams, and deep esoteric traditions.",
        "tamil_description": "பஞ்சபூத தலங்களில் ஆகாய தலமான தில்லை நடராஜர் திருக்கோயில். பொற்கூரை மற்றும் நடனக் கலைச் சிற்பங்களின் பொக்கிஷம்.",
        "image_url": "/images/packages/chidambaram.jpg",
        "lat": 11.3993,
        "lng": 79.6934,
        "distance_from_trichy_km": 138.0,
        "est_travel_time_hours": 2.8,
        "best_time_to_visit": "November to March (Natyanjali Festival in Feb/Mar)",
        "visiting_hours": "06:00 AM - 12:30 PM, 04:30 PM - 10:00 PM"
    },
    {
        "district_name": "Cuddalore",
        "name": "Pichavaram Mangrove Forest",
        "tamil_name": "பிச்சாவரம் அலையாத்திக் காடுகள்",
        "category": "Wildlife and Nature",
        "description": "The world's second-largest mangrove ecosystem, featuring over 4,400 water channels where rowboats glide under canopies of interlocking mangrove roots.",
        "tamil_description": "உலகின் இரண்டாவது மிகப்பெரிய அலையாத்தி காடுகள். படகில் சென்று அடர்ந்த சதுப்புநில கால்வாய்களை கண்டு ரசிக்கலாம்.",
        "image_url": "/images/packages/chidambaram.jpg",
        "lat": 11.4287,
        "lng": 79.7820,
        "distance_from_trichy_km": 150.0,
        "est_travel_time_hours": 3.1,
        "best_time_to_visit": "September to February (Migratory birds season)",
        "visiting_hours": "08:00 AM - 05:00 PM"
    },

    # 12. DHARMAPURI
    {
        "district_name": "Dharmapuri",
        "name": "Hogenakkal Waterfalls & Coracle Rides",
        "tamil_name": "ஒகேனக்கல் நீர்வீழ்ச்சி & பரிசல் சவாரி",
        "category": "Waterfalls",
        "description": "Known as the Niagara of India, where the Kaveri river plunges into a deep carbonatite gorge; famed for round coracle boat rides and fresh river fish meals.",
        "tamil_description": "இந்தியாவின் நயாகரா என்றழைக்கப்படும் ஒகேனக்கல். வட்ட வடிவ பரிசல் படகு சவாரி மற்றும் காவிரி நதியின் பிரம்மாண்ட நீர்வீழ்ச்சி.",
        "image_url": "/images/packages/hogenakkal.jpg",
        "lat": 12.1182,
        "lng": 77.7766,
        "distance_from_trichy_km": 235.0,
        "est_travel_time_hours": 4.5,
        "best_time_to_visit": "July to December (Post-monsoon water roar)",
        "visiting_hours": "07:00 AM - 05:30 PM"
    },

    # 13. TIRUVANNAMALAI
    {
        "district_name": "Tiruvannamalai",
        "name": "Arulmigu Annamalaiyar Temple & Girivalam",
        "tamil_name": "திருவண்ணாமலை அருணாசலேஸ்வரர் திருக்கோயில் & கிரிவலம்",
        "category": "Temples",
        "description": "The sacred Fire element (Agni) lingam temple beneath Arunachala hill with four grand gopurams, celebrated for the 14 km full-moon Girivalam pilgrimage path.",
        "tamil_description": "பஞ்சபூத தலங்களில் அக்னி தலம். அருணாசல மலையை சுற்றியுள்ள 14 கி.மீ கிரிவலப் பாதை மற்றும் கார்த்திகை தீப பெருவிழாவுக்கு புகழ்பெற்றது.",
        "image_url": "/images/landmarks/tiruvannamalai.jpg",
        "lat": 12.2319,
        "lng": 79.0677,
        "distance_from_trichy_km": 185.0,
        "est_travel_time_hours": 3.6,
        "best_time_to_visit": "October to March (Karthigai Deepam in Nov/Dec)",
        "visiting_hours": "05:30 AM - 12:30 PM, 03:30 PM - 09:30 PM"
    },

    # 14. CHENNAI & KANCHIPURAM
    {
        "district_name": "Chennai",
        "name": "Marina Beach & San Thome Basilica",
        "tamil_name": "மெரினா கடற்கரை & சாந்தோம் பேராலயம்",
        "category": "Beaches",
        "description": "The second longest natural urban beach in the world along the Bay of Bengal, anchored by colonial monuments, lighthouses, and historical cathedrals.",
        "tamil_description": "உலகின் இரண்டாவது மிக நீளமான இயற்கை கடற்கரை. மாலை நேர நடைபயணம் மற்றும் சாந்தோம் தேவாலயம் கொண்ட சென்னையின் அடையாளம்.",
        "image_url": "/images/landmarks/chennai.jpg",
        "lat": 13.0500,
        "lng": 80.2824,
        "distance_from_trichy_km": 330.0,
        "est_travel_time_hours": 5.8,
        "best_time_to_visit": "November to February",
        "visiting_hours": "Open 24 hours (Best 05:00 AM - 08:00 PM)"
    },
    {
        "district_name": "Kanchipuram",
        "name": "Kailasanathar & Ekambareswarar Temple",
        "tamil_name": "காஞ்சிபுரம் கைலாசநாதர் & ஏகாம்பரேஸ்வரர் திருக்கோயில்",
        "category": "Temples",
        "description": "The ancient Pallava-era sandstone masterpiece with intricate friezes alongside the grand Earth (Prithvi) element shrine featuring a 3500-year-old mango tree.",
        "tamil_description": "பல்லவர் காலத்து மணற்கல் சிற்பக்கலை அற்புதம் மற்றும் மண் தத்துவத்தை உணர்த்தும் ஏகாம்பரேஸ்வரர் பஞ்சபூத திருத்தலம்.",
        "image_url": "/images/landmarks/kanchipuram.jpg",
        "lat": 12.8422,
        "lng": 79.6897,
        "distance_from_trichy_km": 285.0,
        "est_travel_time_hours": 5.0,
        "best_time_to_visit": "October to March",
        "visiting_hours": "06:00 AM - 12:00 PM, 04:00 PM - 08:30 PM"
    }
]

def seed_districts_and_destinations(db: Session):
    """
    Idempotent seeding function.
    Populates all 38 districts of Tamil Nadu and verified tourist attractions.
    Safe against repeated application startups.
    """
    try:
        # 1. Seed or update districts
        existing_district_count = db.query(District).count()
        if existing_district_count < len(TAMIL_NADU_DISTRICTS):
            logger.info("Seeding Tamil Nadu districts...")
            for dist_data in TAMIL_NADU_DISTRICTS:
                existing = db.query(District).filter(District.name == dist_data["name"]).first()
                if not existing:
                    new_dist = District(**dist_data)
                    db.add(new_dist)
            db.commit()
            logger.info(f"Districts seeded successfully. Total: {db.query(District).count()}")
        else:
            logger.info(f"Districts already seeded ({existing_district_count} districts).")

        # 2. Seed tourist destinations
        district_map = {d.name: d.id for d in db.query(District).all()}
        
        for dest in TOURIST_DESTINATIONS:
            dist_id = district_map.get(dest["district_name"])
            if not dist_id:
                continue

            existing_dest = db.query(TouristDestination).filter(
                TouristDestination.name == dest["name"],
                TouristDestination.district_id == dist_id
            ).first()

            if not existing_dest:
                dest_payload = dest.copy()
                del dest_payload["district_name"]
                dest_payload["district_id"] = dist_id
                new_dest = TouristDestination(**dest_payload)
                db.add(new_dest)
        
        db.commit()
        total_destinations = db.query(TouristDestination).count()
        logger.info(f"Tourist destinations seeded successfully. Total: {total_destinations}")

    except Exception as e:
        db.rollback()
        logger.error(f"Error seeding districts and destinations: {e}")
