from sqlalchemy.orm import Session
from app.db.session import SessionLocal, Base, engine
from app.models.admin import Admin
from app.models.vehicle import Vehicle
from app.models.package import TourPackage
from app.models.testimonial import Testimonial
from app.core import security

def seed_db():
    # Ensure tables are created first
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        print("Starting Database Seeding...")
        
        # 1. Seed Admin
        admin_email = "tsr@gmail.com"
        admin = db.query(Admin).filter(Admin.email == admin_email).first()
        if not admin:
            print("Seeding default administrator...")
            db_admin = Admin(
                email=admin_email,
                hashed_password=security.get_password_hash("tsrtraveladmin123"),
                full_name="Ravitharan",
                role="super-admin",
                is_active=True
            )
            db.add(db_admin)
            db.commit()
            print("Admin account created (email: tsr@gmail.com, password: tsrtraveladmin123)")
        else:
            print("Admin account already exists.")

        # 2. Seed Vehicles (Only the two approved)
        vehicles = [
            {
                "name": "Mahindra Mini Bus",
                "capacity": "20+ seats",
                "features": "Air Conditioned (AC), GPS Tracking, Push-back Seats, Premium Sound System, Clean & Hygienic, Experienced Driver",
                "image_url": "/images/vehicles/mini_bus.jpeg",
                "is_available": True
            },
            {
                "name": "Maruti Omni Van",
                "capacity": "7-8 seats",
                "features": "Affordable Rent, Dynamic City Driving, Luggage Carrier, Clean Interiors, Punctual Driver, Ideal for Airport pickup & drop",
                "image_url": "/images/vehicles/omni.jpeg",
                "is_available": True
            }
        ]
        
        for v in vehicles:
            exists = db.query(Vehicle).filter(Vehicle.name == v["name"]).first()
            if not exists:
                print(f"Seeding vehicle: {v['name']}...")
                db_vehicle = Vehicle(**v)
                db.add(db_vehicle)
                db.commit()
        
        # 3. Seed Tour Packages from Trichy
        packages = [
            {"destination": "Ooty", "duration": "3 Days / 2 Nights", "distance": "260 km", "price": 12500, "image_url": "/images/packages/ooty.jpg"},
            {"destination": "Kodaikanal", "duration": "3 Days / 2 Nights", "distance": "200 km", "price": 11000, "image_url": "/images/packages/kodaikanal.jpg"},
            {"destination": "Yercaud", "duration": "2 Days / 1 Night", "distance": "140 km", "price": 7500, "image_url": "/images/packages/yercaud.jpg"},
            {"destination": "Rameswaram", "duration": "2 Days / 1 Night", "distance": "230 km", "price": 9500, "image_url": "/images/packages/rameswaram.jpg"},
            {"destination": "Madurai", "duration": "1 Day Trip", "distance": "130 km", "price": 4500, "image_url": "/images/packages/madurai.jpg"},
            {"destination": "Kanyakumari", "duration": "3 Days / 2 Nights", "distance": "380 km", "price": 16500, "image_url": "/images/packages/kanyakumari.jpg"},
            {"destination": "Velankanni", "duration": "1 Day Trip", "distance": "150 km", "price": 5000, "image_url": "/images/packages/velankanni.jpg"},
            {"destination": "Thanjavur", "duration": "1 Day Trip", "distance": "60 km", "price": 2500, "image_url": "/images/packages/thanjavur.jpg"},
            {"destination": "Chidambaram", "duration": "1 Day Trip", "distance": "130 km", "price": 4500, "image_url": "/images/packages/chidambaram.jpg"},
            {"destination": "Hogenakkal", "duration": "1 Day Trip", "distance": "220 km", "price": 6500, "image_url": "/images/packages/hogenakkal.jpg"},
            {"destination": "Courtallam", "duration": "2 Days / 1 Night", "distance": "290 km", "price": 10500, "image_url": "/images/packages/courtallam.jpg"},
            {"destination": "Yelagiri", "duration": "2 Days / 1 Night", "distance": "270 km", "price": 9800, "image_url": "/images/packages/yelagiri.jpg"}
        ]
        
        for p in packages:
            exists = db.query(TourPackage).filter(TourPackage.destination == p["destination"]).first()
            if not exists:
                print(f"Seeding package: Trichy -> {p['destination']}...")
                db_package = TourPackage(**p)
                db.add(db_package)
                db.commit()

        # 4. Seed Testimonials
        testimonials = [
            {"name": "Senthil Kumar", "rating": 5, "comment": "We booked the Mahindra Mini Bus for a family temple tour around Thanjavur and Kumbakonam. The vehicle was extremely clean and the driver was polite and knew all the routes well. Highly recommended!", "avatar_url": None},
            {"name": "Priya Dharshini", "rating": 5, "comment": "TSR TRAVEL is our go-to choice for airport drops. The Maruti Omni is perfect for our small family and luggage. Punctual, safe, and cost-effective.", "avatar_url": None},
            {"name": "Ramesh Raja", "rating": 5, "comment": "Awesome trip to Kodaikanal. Driver was expert in driving in hill areas. Very comfortable journey with TSR Travels. Ravitharan owner responded very quickly.", "avatar_url": None}
        ]
        
        for t in testimonials:
            exists = db.query(Testimonial).filter((Testimonial.name == t["name"]) & (Testimonial.comment == t["comment"])).first()
            if not exists:
                print(f"Seeding testimonial from {t['name']}...")
                db_t = Testimonial(**t)
                db.add(db_t)
                db.commit()
                
        print("Database Seeding Completed Successfully!")
    except Exception as e:
        print(f"Error during seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
