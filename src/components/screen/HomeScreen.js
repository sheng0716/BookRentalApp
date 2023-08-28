import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';
import BooksDbService from '../../assets/BooksDbService'; // Import your database functions

const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);

const numColumns = 3.5; // Set numColumns inside the component
const bookWidth = Dimensions.get('window').width / numColumns;

const HomeScreen = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]); // Initialize with an empty array
    const recommendedBook = books[1]; // Recommend one book in books

    // Fetch data and update the state
    const fetchData = async () => {
        try {
            const booksData = await BooksDbService.getAllBooks();
            setBooks(booksData); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching data from the database:', error);
        }
    };

    // Use useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    });

    const handleSearchSubmit = () => {
        navigation.navigate('SearchScreen', { query: searchQuery });
    };

    const getItem = (book) => {
        // Function for click on an book
        navigation.navigate('BookDetailScreen', { bookDetail: book });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.bookContainer} onPress={() => getItem(item)}>
            <Image
                source={{ uri: 'asset:/img/' + item.image_path }}
                style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>{item.title}</Text>
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

            <FlatList
                data={books}
                keyExtractor={(item) => item.book_id.toString()}
                renderItem={renderItem}
                horizontal={true} // Set horizontal to true for horizontal scrolling
            />

            <TouchableOpacity style={styles.recomendedContainer} onPress={() => getItem(recommendedBook)}>
                <Text style={styles.recommendedTitle}>Recommended</Text>

                {recommendedBook ? ( // Check if recommendedBook exists
                    <View style={styles.recommendedItemContainer}>
                        <Image
                            source={{ uri: 'asset:/img/' + recommendedBook.image_path }}
                            style={styles.recommendedItemImage}
                        />
                        <View style={styles.recommendedItemInfo}>
                            <Text style={{ ...styles.recommendedItemText, fontSize: 25, fontWeight: 'bold' }}>{recommendedBook.title}</Text>
                            <Text style={styles.recommendedItemText}>Author: {recommendedBook.author}</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.recommendedItemText}>No recommended book available.</Text>
                )}
                
                <View>
                    <Text style={{ ...styles.recommendedItemText, padding: 10, textAlign: 'justify', }}>
                        This is the description of the recommended book.
                    </Text>
                </View>
            </TouchableOpacity>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#e8e6e6',
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

    bookContainer: {
        width: bookWidth,
        marginTop: 10,
        alignItems: 'center',
    },

    bookImage: {
        width: bookWidth * 0.8,
        height: bookWidth * 1.2,
        borderRadius: 5,
    },

    bookTitle: {
        marginTop: 5,
    },

    recomendedContainer: {
        margin: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    recommendedTitle: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 25,
    },

    recommendedItemContainer: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
    },

    recommendedItemInfo: {
        margin: 10,
    },

    recommendedItemImage: {
        width: 80,
        height: 120,
        borderRadius: 5,
    },

    recommendedItemText: {
        marginTop: 5,
        fontSize: 20,
    },
});

export default HomeScreen;