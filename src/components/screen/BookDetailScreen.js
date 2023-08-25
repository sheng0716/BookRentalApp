import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Icon, Button, Modal } from '@ui-kitten/components';

const BookDetailScreen = ({ route, navigation }) => {

    const { bookDetail } = route.params; // Get the book data from the route params
    const [isBookDetailModalVisible, setIsBookDetailModalVisible] = useState(false);

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
            <ScrollView style={{ flex: 1 }}>
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

                <TouchableOpacity style={styles.itemContainer} onPress={() => setIsBookDetailModalVisible(true)}>
                    <Image
                        source={bookDetail.image_path} // Display the book image
                        style={styles.itemImage}
                    />
                    <View style={styles.itemInfo}>
                        <Text style={{ ...styles.itemText, fontWeight: 'bold' }}>{bookDetail.title}</Text>
                        <Text style={styles.itemText}>{bookDetail.author}</Text>
                        <Text style={styles.itemText} ellipsizeMode="tail" numberOfLines={1}>{bookDetail.isbn}</Text>
                        <Text style={styles.itemText} ellipsizeMode="tail" numberOfLines={1}>{bookDetail.publisher}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ ...styles.itemContainer, flexDirection: 'column' }}>
                    <Text style={{ ...styles.itemText, fontWeight: 'bold' }}>Abstract</Text>
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

            {/* Modal */}
            <Modal
                visible={isBookDetailModalVisible}
                backdropStyle={styles.modalBackdrop}
                onBackdropPress={() => setIsBookDetailModalVisible(false)}>
                {/* Modal content goes here */}
                <View style={styles.modalContainer}>
                    <Image
                        source={bookDetail.image_path} // Display the book image
                        style={{
                            width: 100,
                            height: 150,
                            borderRadius: 5,
                        }}
                    />

                    <Text style={styles.itemTextLabel}>Book Detail</Text>
                    <Text style={styles.itemTextLabel}>Title:</Text>
                    <Text style={styles.itemText}>{bookDetail.title}</Text>

                    <Text style={styles.itemTextLabel}>Author:</Text>
                    <Text style={styles.itemText}>{bookDetail.author}</Text>

                    <Text style={styles.itemTextLabel}>Publisher:</Text>
                    <Text style={styles.itemText}>{bookDetail.publisher}</Text>

                    <Text style={styles.itemTextLabel}>ISBN:</Text>
                    <Text style={styles.itemText}>{bookDetail.isbn}</Text>
                </View>
            </Modal>
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
        width: 100,
        height: 150,
        borderRadius: 5,
    },

    itemText: {
        fontSize: 20,
        marginTop: 10,
        maxWidth: '90%',
    },

    itemTextLabel: {
        fontSize: 20,
        marginTop: 30,
        maxWidth: '90%',
        fontWeight: 'bold',
    },

    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 20,
    },

    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default BookDetailScreen;