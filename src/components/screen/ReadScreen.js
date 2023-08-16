import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Layout, Icon, Input } from '@ui-kitten/components';
import bookList from '../../assets/bookData'; // Import the initialItems array

const SearchIcon = (props) => (
    <Icon {...props} name='search-outline' />
);

const numColumns = 3; // Set numColumns inside the component
const itemWidth = Dimensions.get('window').width / numColumns;

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
        <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
);

const ReadScreen = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [items] = useState(bookList); // item list

    const handleSearch = () => {
        navigation.navigate('SearchScreen', { query: searchQuery });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigation.navigate('SearchScreen', { query: searchQuery });
        }
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.searchBar}>
                <Input
                    accessoryLeft={SearchIcon}
                    placeholder="Search..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onKeyPress={handleKeyPress}
                    style={styles.searchInput}
                />
                <Button
                    style={styles.searchButton}
                    title="Search"
                    onPress={handleSearch}
                />
            </View>

            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                numColumns={numColumns} // set number of coloumn
            />
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

    itemContainer: {
        width: itemWidth,
        marginTop: 10,
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
});

export default ReadScreen;