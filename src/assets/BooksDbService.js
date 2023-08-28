import SQLite from 'react-native-sqlite-storage';

// Open a connection to the database
const db = SQLite.openDatabase({ name: 'books.db', createFromLocation: '~/book_rental_app.db' });

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

export default {
    getAllBooks,
    // addBook,
    // updateBook,
    // deleteBook,
};