import SQLite from 'react-native-sqlite-storage';

// Open a connection to the database
const db = SQLite.openDatabase({ name: 'book_rental_app.db', createFromLocation: '~/book_rental_app.db' });

// Function to get all books from the database
const getAllBooks = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM books',
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const books = [];

                    for (let i = 0; i < len; i++) {
                        // Get each book row and add it to the books array
                        const row = results.rows.item(i);
                        books.push(row);
                    }

                    // Resolve the promise with the array of books
                    resolve(books);
                },
                (tx, error) => {
                    // Reject the promise with the error
                    reject(error);
                }
            );
        });
    });
};

// Function to fetch book IDs associated with the user from the bookshelves table
const getBookshelfByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT book_id FROM bookshelves WHERE user_id = ?',
                [userId],
                (tx, results) => {
                    const len = results.rows.length;
                    const bookIds = [];

                    for (let i = 0; i < len; i++) {
                        // Get each book_id and add it to the bookIds array
                        const row = results.rows.item(i);
                        bookIds.push(row.book_id);
                    }

                    // Resolve the promise with the array of book IDs
                    resolve(bookIds);
                },
                (tx, error) => {
                    // Reject the promise with the error
                    reject(error);
                }
            );
        });
    });
};

const insertIntoBookshelves = (userId, bookId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            // Check if the record already exists
            tx.executeSql(
                'SELECT * FROM bookshelves WHERE user_id = ? AND book_id = ?',
                [userId, bookId],
                (tx, results) => {
                    const existingRecord = results.rows.length > 0;

                    if (existingRecord) {
                        // Record already exists, resolve with a message
                        resolve("Record already exists");

                    } else {
                        // Record doesn't exist, perform the insertion
                        tx.executeSql(
                            'INSERT INTO bookshelves (user_id, book_id) VALUES (?, ?)',
                            [userId, bookId],
                            (tx, results) => {
                                // Check if the insertion was successful
                                if (results.rowsAffected > 0) {
                                    // Resolve with a success message or any other data you need
                                    resolve("Record inserted successfully");
                                } else {
                                    // Reject with an error message if the insertion failed
                                    reject("Failed to insert record");
                                }
                            },
                            (tx, error) => {
                                // Reject the promise with the error
                                reject(error);
                            }
                        );
                    }
                },
                (tx, error) => {
                    // Reject the promise with the error
                    reject(error);
                }
            );
        });
    });
};

const removeFromBookshelves = (userId, bookId) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM bookshelves WHERE user_id = ? AND book_id = ?',
                [userId, bookId],
                (tx, results) => {
                    // Check if the deletion was successful
                    if (results.rowsAffected > 0) {
                        // Resolve with a success message or any other data you need
                        resolve("Record removed successfully");
                    } else {
                        // Reject with an error message if the deletion failed
                        reject("Failed to remove record");
                    }
                },
                (tx, error) => {
                    // Reject the promise with the error
                    reject(error);
                }
            );
        });
    });
};

export default {
    getAllBooks,
    getBookshelfByUserId,
    insertIntoBookshelves,
    removeFromBookshelves,
};
