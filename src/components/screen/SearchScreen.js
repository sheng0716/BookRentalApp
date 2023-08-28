import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';
import BooksDbService from '../../assets/BooksDbService'; // Import your database functions

const SearchIcon = (props) => (
  <Icon {...props} name='search-outline' />
);

const SearchScreen = ({ route, navigation }) => {

  const [books, setBooks] = useState([]); // Initialize with an empty array
  const { query } = route.params; // Get the query from the route params
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(books); // item list

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

  const goBack = () => {
    navigation.goBack();
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate('BookDetailScreen', { bookDetail: item });
  };

  useEffect(() => {
    // Call the handleSearch function when the component mounts
    handleSearch(query);
  }, [query]);

  const handleSearch = (userInput) => {
    setSearchQuery(userInput);

    const filtered = books.filter(item =>
      item.title.toLowerCase().includes(userInput.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => getItem(item)}>
      <Image
        source={{ uri: 'asset:/img/' + item.image_path }}
        style={styles.itemImage}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemText}>{item.author}</Text>
        <Text style={styles.itemText}>{item.publisher}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Layout style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={goBack}>
          <Icon
            name='chevron-left-outline'
            style={{ width: 40, height: 50 }}
          />
        </TouchableOpacity>

        <Input
          accessoryLeft={SearchIcon}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        style={styles.flatList}
        data={filteredItems}
        keyExtractor={(item) => item.book_id.toString()}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d4d4'
  },

  searchBar: {
    marginRight: 10,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4d4d4'
  },

  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },

  flatList: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  itemContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemInfo: {
    margin: 10,
  },

  itemImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },

  itemText: {
    marginTop: 5,
  },
});

export default SearchScreen;