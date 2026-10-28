import sqlite3

for db_path in ["tsr_travel.db", "tsr_db.db"]:
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        
        # Check columns of bookings
        cur.execute("PRAGMA table_info(bookings)")
        cols = [row[1] for row in cur.fetchall()]
        print(f"{db_path} columns in bookings: {cols}")
        
        if "customer_email" not in cols:
            print(f"Adding customer_email to {db_path}...")
            cur.execute("ALTER TABLE bookings ADD COLUMN customer_email VARCHAR")
            conn.commit()
            
        if "dropoff_location" not in cols:
            print(f"Adding dropoff_location to {db_path}...")
            cur.execute("ALTER TABLE bookings ADD COLUMN dropoff_location VARCHAR")
            conn.commit()
            
        conn.close()
        print(f"{db_path} migration complete!")
    except Exception as e:
        print(f"Error checking {db_path}: {e}")
