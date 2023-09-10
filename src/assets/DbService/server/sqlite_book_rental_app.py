import sqlite3

# Data
bookList = [
    {
        "book_id": 1,
        "title": "1Q84",
        "author": "Haruki Murakami",
        "isbn": "9780099549062, 9780099549055",
        "publisher": "Vintage Books, London, 2012, ©2011",
        "image_path": "1Q84.jpg",
    },
    {
        "book_id": 2,
        "title": "Being and Time",
        "author": "Martin Heidegger",
        "isbn": "9781684223282, 1684223288",
        "publisher": "Martino Fine Books, Eastford, CT, 2019",
        "image_path": "being_and_time.jpg",
    },
    {
        "book_id": 3,
        "title": "Das Kapital",
        "author": "Karl Marx",
        "isbn": "9781512111521, 151211152X",
        "publisher": "Createspace, U.S, 2015",
        "image_path": "das_kapital.jpg",
    },
    {
        "book_id": 4,
        "title": "Harry Potter",
        "author": "Joanne K. Rowling",
        "isbn": "9781408855652",
        "publisher": "Bloomsbury, London, 2014",
        "image_path": "harry_potter.jpg",
    },
    {
        "book_id": 5,
        "title": "The Wealth of Nations",
        "author": "Adam Smith",
        "isbn": "9786178289515, 6178289510",
        "publisher": "Tovarystvo z obmezhenoiu vidpovidalnistiu ""Vydavnychyi soiuz ""Andronum"", 2023",
        "image_path": "the_wealth_of_nations.jpg",
    },
    {
        "book_id": 6,
        "title": "The Dark Forest",
        "author": "Cixin Liu",
        "isbn": "9780765386694, 0765386690",
        "publisher": "Tor, A Tom Doherty Associates Book, New York, 2019",
        "image_path": "the_dark_forest.jpg",
    },
]

# Connect to SQLite database (creates if doesn't exist)
conn = sqlite3.connect("./book_rental_app.db")
cursor = conn.cursor()

# Create the users table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        user_name TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        phone_no TEXT,
        isMember BOOLEAN
    )
''')

# Create the books table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS books (
        book_id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT NOT NULL,
        publisher TEXT,
        image_path TEXT
    )
''')

# Create the bookshelves table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS bookshelves (
        user_id INTEGER,
        book_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (user_id),
        FOREIGN KEY (book_id) REFERENCES books (book_id)
    )
''')

# Insert data into the table
for book in bookList:
    cursor.execute('''
        INSERT INTO books (book_id, title, author, isbn, publisher, image_path)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        book["book_id"],
        book["title"],
        book["author"],
        book["isbn"],
        book["publisher"],
        book["image_path"]
    ))

# Add a record to the users table
cursor.execute('''
    INSERT INTO users (user_name, password, email, phone_no, isMember)
    VALUES (?, ?, ?, ?, ?)
''', ('john', 'john', 'john@example.com', '555-1234', 0))

# Add a record to the bookshelves table
cursor.execute('''
    INSERT INTO bookshelves (user_id, book_id)
    VALUES (?, ?)
''', (1, 1))  # Assuming the user_id and book_id values correspond to the records you inserted above

# Commit changes and close the connection
conn.commit()
conn.close()

print("Data inserted successfully into the SQLite database.")
