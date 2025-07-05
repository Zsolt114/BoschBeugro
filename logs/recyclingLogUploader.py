import mysql.connector

# 💡 Állítsd be a saját adatbázis kapcsolatod
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'repont',
    'raise_on_warnings': True
}

# Kapcsolódás
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Log fájl elérési útja
log_file_path = 'recycling.log'

with open(log_file_path, 'r') as file:
    for line in file:
        # Sor "tisztítása" (sortörés eltávolítása)
        line = line.strip()
        if not line:
            continue  # Üres sort kihagy

        # Feldarabolás
        parts = line.split(',')
        if len(parts) != 4:
            print(f"Hibás sor: {line}")
            continue

        machine = parts[0]
        product = int(parts[1])
        event_type = parts[2]
        event_date = parts[3]

        # Beszúrás
        sql = """
            INSERT INTO recycling (machine, product, event_type, event_date)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(sql, (machine, product, event_type, event_date))

# Commit és zárás
conn.commit()
cursor.close()
conn.close()

print("✅ Feltöltés kész!")
