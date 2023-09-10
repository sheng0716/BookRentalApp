import axios from 'axios';

let config = require('../Config');
let pre_url = config.settings.serverPath;

function transformBooksData(response) {
    return response.map((row) => ({
        book_id: row[0],
        title: row[1],
        author: row[2],
        isbn: row[3],
        publisher: row[4],
        image_path: row[5],
    }));
}

// Function to get all books from the database
const getAllBooks = async () => {
    try {
        const response = await axios.get(`${pre_url}/api/books`);
        return transformBooksData(response.data.books);

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getAllBooks,
};

// import SQLite from 'react-native-sqlite-storage';

// // Open a connection to the database
// const db = SQLite.openDatabase({ name: 'book_rental_app.db', createFromLocation: '~/book_rental_app.db' });

// // Function to get all books from the database
// const getAllBooks = () => {
//     return new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//             tx.executeSql(
//                 'SELECT * FROM books',
//                 [],
//                 (tx, results) => {
//                     const len = results.rows.length;
//                     const books = [];

//                     for (let i = 0; i < len; i++) {
//                         // Get each book row and add it to the books array
//                         const row = results.rows.item(i);
//                         books.push(row);
//                     }

//                     // Resolve the promise with the array of books
//                     resolve(books);
//                 },
//                 (tx, error) => {
//                     // Reject the promise with the error
//                     reject(error);
//                 }
//             );
//         });
//     });
// };