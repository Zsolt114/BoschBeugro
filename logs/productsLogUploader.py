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
log_file_path = 'products.log'

with open(log_file_path, 'r', encoding='utf-8') as file:
    for line in file:
        # Sor "tisztítása" (sortörés eltávolítása)
        line = line.strip()
        if not line:
            continue  # Üres sort kihagy

        # Feldarabolás
        parts = line.split(',')
        if len(parts) != 2:
            print(f"Hibás sor: {line}")
            continue

        type_number = parts[0]
        product_name = parts[1]

        # Beszúrás
        sql = """
            INSERT INTO products (type_number, product_name)
            VALUES (%s, %s)
        """
        cursor.execute(sql, (type_number, product_name))

# Commit és zárás
conn.commit()
cursor.close()
conn.close()

print("✅ Feltöltés kész!")
