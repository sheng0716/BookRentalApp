import sqlite3

# Connect to SQLite database (creates if doesn't exist)
conn = sqlite3.connect("./book_rental_app.db")
cursor = conn.cursor()

# Add a record to the users table
cursor.execute('''
    UPDATE users
    SET isMember = 0
    WHERE user_id = 2
''')

# Commit changes and close the connection
conn.commit()
conn.close()

print("Data inserted successfully into the SQLite database.")
