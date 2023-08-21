import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Icon, Button } from '@ui-kitten/components';

const BookDetailScreen = ({ route, navigation }) => {

    const { bookDetail } = route.params; // Get the book data from the route params

    const goBack = () => {
        navigation.goBack();
    };

    const showMemberModal = () => {
        alert("showMemberModal");
    };

    const showShareModal = () => {
        alert("showShareModal");
    };

    const AddToBookshelfModal = () => {
        alert("AddToBookshelf");
    };

    const goReadScreen = () => {
        navigation.navigate('ReadScreen', { bookDetail: bookDetail })
    };

    return (
        <Layout style={styles.container}>
            <ScrollView>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={goBack}>
                        <Icon
                            name='chevron-left-outline'
                            style={{ width: 40, height: 50 }}
                        />
                    </TouchableOpacity>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={showMemberModal}>
                            <Icon
                                name='cube-outline'
                                style={{ width: 40, height: 50 }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showShareModal}>
                            <Icon
                                name='share-outline'
                                style={{ width: 40, height: 50 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.itemContainer}>
                    <Image
                        source={bookDetail.imagePath} // Display the book image
                        style={styles.itemImage}
                    />
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemText}>{bookDetail.id}</Text>
                        <Text style={styles.itemText}>{bookDetail.title}</Text>
                        {/* Add more book data fields as needed */}
                    </View>
                </View>

                <View style={{ ...styles.itemContainer, flexDirection: 'column' }}>
                    <Text style={styles.itemText}>Abstract</Text>
                    <Text style={styles.itemText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus orci
                        eu nisl egestas, in euismod nisi viverra. Fusce in velit id libero venenatis
                        vehicula. Fusce varius dui a purus euismod euismod. Maecenas eget malesuada arcu.
                        Proin non ultrices metus. Vestibulum id libero non est tincidunt finibus.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomButtons}>
                <Button
                    onPress={AddToBookshelfModal}
                    appearance='outline'>
                    Add to Bookshelf
                </Button>

                <Button
                    onPress={goReadScreen}
                    appearance='filled'>
                    Read
                </Button>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d4d4d4'
    },

    topBar: {
        margin: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Aligns items at the start and end of the row
    },

    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemContainer: {
        margin: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
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
        fontSize: 20,
        marginTop: 5,
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
});

export default BookDetailScreen;