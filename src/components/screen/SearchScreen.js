import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import bookList from '../../assets/bookData'; // Import the initialItems array
import { Layout, Icon, Input } from '@ui-kitten/components';

const SearchIcon = (props) => (
  <Icon {...props} name='search-outline' />
);

const getItem = (item) => {
  // Function for click on an item
  alert('Id : ' + item.id + ' Title : ' + item.title);
};

const renderItem = ({ item }) => (
  <TouchableOpacity style={styles.itemContainer} onPress={() => getItem(item)}>
    <Image
      source={item.imagePath}
      style={styles.itemImage}
    />
    <View style={styles.itemInfo}>
      <Text style={styles.itemText}>{item.id}</Text>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);

const SearchScreen = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(bookList); // item list

  const goHome = () => {
    navigation.navigate('Home');
  };

  const handleSearch = (userInput) => {
    setSearchQuery(userInput);
    const filtered = bookList.filter(item =>
      item.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={goHome}>
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
        keyExtractor={(item) => item.id.toString()}
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
    borderRadius: 20,
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