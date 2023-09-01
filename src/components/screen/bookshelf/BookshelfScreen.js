import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Layout, Icon, Input, Modal } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import BooksDbService from '../../../assets/BooksDbService';
import BookshelvesDbService from '../../../assets/BookshelvesDbService'; // Import database functions

const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);

const numColumns = 3; // Set numColumns inside the component
const itemWidth = Dimensions.get('window').width / numColumns;

const BookshelfScreen = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]); // Initialize with an empty array
    const [items, setItems] = useState([]); // item list

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const handleSearchSubmit = () => {
        navigation.navigate('SearchScreen', { query: searchQuery });
    };

    const goReadScreen = (bookDetail) => {
        navigation.navigate('ReadScreen', { bookDetail: bookDetail })
    };

    const hideDeleteConfirmation = () => {
        setItemToDelete(null);
        setIsDeleteModalVisible(false);
    };

    const deleteBook = async () => {
        try {
            const userId = 1;
            const bookId = itemToDelete.book_id;

            // Call the BooksDbService to insert the record
            const result = await BookshelvesDbService.removeFromBookshelves(userId, bookId);

            // Handle success
            console.log(result);

            hideDeleteConfirmation();

        } catch (error) {
            // Handle errors
            console.error("Error removing book from bookshelf: ", error);
        }
    }

    // Fetch data
    const fetchData = async () => {
        try {
            const booksData = await BooksDbService.getAllBooks();
            setBooks(booksData); // Update the state with the fetched data
            console.log('Fetched Data.');

        } catch (error) {
            console.error('Error fetching data from the database:', error);
        }
    };

    // Fetch book IDs associated with the user every time the screen gains focus
    useFocusEffect(
        useCallback(() => {
            async function fetchUserBooks() {
                try {
                    // const userId = route.params?.userId; // pass the userId when navigating to this screen
                    const userId = 1;

                    // Fetch book IDs associated with the user from your database
                    const userBookIds = await BookshelvesDbService.getBookshelfByUserId(userId);

                    console.log("Books id: " + userBookIds);

                    // Filter the initial bookList to only include the user's books
                    const userBooks = books.filter(book => userBookIds.includes(book.book_id));

                    setItems(userBooks);

                } catch (error) {
                    console.error('Error fetching user bookshelf:', error);
                }
            }
            fetchUserBooks();
        }, [books, itemToDelete])
        // }, [route.params?.userId])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => goReadScreen(item)}
            onLongPress={() => setItemToDelete(item)}
        >
            <View style={styles.itemContainer}>
                <Image
                    source={{ uri: 'asset:/img/' + item.image_path }}
                    style={styles.itemImage}
                />
                <Text style={styles.itemTitle}>{item.title}</Text>

                {itemToDelete === item && (
                    <TouchableOpacity
                        onPress={() => setIsDeleteModalVisible(true)}
                        style={styles.deleteIconContainer}
                    >
                        <Icon name="trash-2-outline" width={24} height={24} fill="#FF0000" />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <Layout style={styles.container}>
            <View style={styles.searchBar}>
                <Input
                    accessoryLeft={SearchIcon}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearchSubmit} // Use onSubmitEditing instead of onKeyPress
                    style={styles.searchInput}
                />
                <Button
                    style={styles.searchButton}
                    title="Search"
                    onPress={handleSearchSubmit}
                />
            </View>

            <View>
                <Text style={styles.title}>Bookshelf</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.book_id.toString()}
                renderItem={renderItem}
                numColumns={numColumns} // set number of coloumn
            />

            <Modal
                visible={isDeleteModalVisible}
                backdropStyle={styles.modalBackdrop}
                onBackdropPress={hideDeleteConfirmation}
            >
                <Layout style={styles.deleteModalContainer}>
                    <Text style={styles.deleteModalText}>Are you sure you want to delete this item?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '50%' }}>
                        <Button
                            onPress={() => deleteBook()}
                            title='Yes'
                            appearance="outline"
                        />
                        <Button
                            onPress={hideDeleteConfirmation}
                            title='No'
                            appearance="outline"
                        />
                    </View>
                </Layout>
            </Modal>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    searchBar: {
        margin: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchInput: {
        flex: 1,
        height: 40,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
    },

    searchButton: {
        borderRadius: 5,
    },

    title: {
        padding: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 0.5,
    },

    itemContainer: {
        width: itemWidth,
        marginTop: 15,
        alignItems: 'center',
    },

    itemImage: {
        width: itemWidth * 0.8,
        height: itemWidth * 1.2,
        borderRadius: 5,
    },

    itemTitle: {
        marginTop: 5,
    },

    deleteIconContainer: {

    },

    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    deleteModalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },

    deleteModalText: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default BookshelfScreen;