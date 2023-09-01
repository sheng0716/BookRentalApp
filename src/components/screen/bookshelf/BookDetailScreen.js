import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Icon, Button, Modal, Text } from '@ui-kitten/components';
import BookshelvesDbService from '../../../assets/BookshelvesDbService';
import Share from 'react-native-share';
import CustomAlert from '../../../assets/CustomAlert';
import MembershipConfirmationDialog from '../../../assets/MembershipConfirmationDialog';

const BookDetailScreen = ({ route, navigation }) => {

    const { bookDetail } = route.params; // Get the book data from the route params
    const [isBookDetailModalVisible, setIsBookDetailModalVisible] = useState(false);

    const [isBookAddedModalVisible, setIsBookAddedModalVisible] = useState(false);
    const [isBookRemovedModalVisible, setIsBookRemovedModalVisible] = useState(false);
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(true); // Initially show the Add button

    const [isMember, setIsMember] = useState(false); // Simulated membership status
    const [membershipModalVisible, setMembershipModalVisible] = useState(false);
    const [customAlertVisible, setCustomAlertVisible] = useState(false); // State for custom alert

    const successMessage = 'Added Successfully';
    const successRemoveMessage = 'Removed Successfully';

    const goBack = () => {
        navigation.goBack();
    };

    const goReadScreen = () => {
        navigation.navigate('ReadScreen', { bookDetail: bookDetail })
    };

    const showMemberModal = () => {
        if (isMember) {
            // If the user is already a member, show an alert
            setCustomAlertVisible(true);
        } else {
            // If the user is not a member, ask them if they want to become a member
            setMembershipModalVisible(true);
        }
    };

    const handleConfirmMembership = () => {
        setIsMember(true); // Update the simulated membership status
        setMembershipModalVisible(false); // Close the confirmation modal
    };

    const handleCustomAlertDismiss = () => {
        setCustomAlertVisible(false);
    };

    const showShareModal = async () => {
        try {
            const options = {
                title: 'Share via',
                message: 'Tell your friends to check this out!',
                url: '',
                subject: 'Subject'
            };

            await Share.open(options);
        } catch (error) {
            console.error("Error sharing: ", error.message);
        }
    };

    const addToBookshelfModal = async () => {
        try {
            const userId = 1;
            const bookId = bookDetail.book_id;

            // Call the BookshelvesDbService to insert the record
            const result = await BookshelvesDbService.insertIntoBookshelves(userId, bookId);

            // Handle success
            console.log(result);

            // Close the modal or perform other actions as needed
            setIsBookAddedModalVisible(true);

            // Toggle visibility of buttons
            setIsAddButtonVisible(false);

        } catch (error) {
            // Handle errors
            console.error("Error adding book to bookshelf: ", error);
        }
    };

    const removeFromBookshelfModal = async () => {
        try {
            const userId = 1;
            const bookId = bookDetail.book_id;

            // Call the BookshelvesDbService to remove the record
            const result = await BookshelvesDbService.removeFromBookshelves(userId, bookId);

            // Handle success
            console.log(result);

            // Show the "Removed from Bookshelf" modal
            setIsBookRemovedModalVisible(true);

            // Toggle visibility of buttons
            setIsAddButtonVisible(true);

        } catch (error) {
            // Handle errors
            console.error("Error removing book from bookshelf: ", error);
        }
    };

    // Function to check if the book is in the user's bookshelf
    const checkBookInBookshelf = async () => {
        try {
            const userId = 1;
            const bookId = bookDetail.book_id;

            // Call the BookshelvesDbService to get the user's bookshelf
            const bookshelf = await BookshelvesDbService.getBookshelfByUserId(userId);

            // Check if the book is in the user's bookshelf
            const bookExists = bookshelf.includes(bookId);

            // Update the visibility of the Add button based on whether the book exists
            setIsAddButtonVisible(!bookExists);

        } catch (error) {
            // Handle errors
            console.error("Error checking bookshelf: ", error);
        }
    };

    useEffect(() => {
        // Check if the book is in the user's bookshelf when the component mounts
        checkBookInBookshelf();
    }, []);

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
                                name={isMember ? 'cube' : 'cube-outline'}
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
                        source={{ uri: 'asset:/img/' + bookDetail.image_path }} // Display the book image
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
                {isAddButtonVisible && (
                    <Button
                        onPress={addToBookshelfModal}
                        appearance='outline'>
                        Add to Bookshelf
                    </Button>
                )}

                {!isAddButtonVisible && (
                    <Button
                        onPress={removeFromBookshelfModal}
                        appearance='outline'>
                        Remove from Bookshelf
                    </Button>
                )}

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
                <View style={{ ...styles.modalContainer, alignItems: 'flex-start' }}>
                    <Image
                        source={{ uri: 'asset:/img/' + bookDetail.image_path }} // Display the book image
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

            {/* Membership modal */}
            <Modal
                visible={membershipModalVisible}
                backdropStyle={styles.modalBackdrop}
                onBackdropPress={() => setMembershipModalVisible(false)}
            >
                <MembershipConfirmationDialog
                    onConfirm={handleConfirmMembership}
                    onCancel={() => setMembershipModalVisible(false)}
                />
            </Modal>

            {/* Use the CustomAlert component for custom alerts */}
            <CustomAlert
                visible={customAlertVisible}
                message={'You are already a member.'}
                onDismiss={handleCustomAlertDismiss}
            />

            {/* "Added Successfully" Modal */}
            <Modal
                visible={isBookAddedModalVisible}
                backdropStyle={styles.modalBackdrop}
                onBackdropPress={() => setIsBookAddedModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{successMessage}</Text>
                    <Icon name="checkmark-circle-2" width={24} height={24} fill="green" />
                </View>
            </Modal>

            {/* "Removed Successfully" Modal */}
            <Modal
                visible={isBookRemovedModalVisible}
                backdropStyle={styles.modalBackdrop}
                onBackdropPress={() => setIsBookRemovedModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{successRemoveMessage}</Text>
                    <Icon name="checkmark-circle-2" width={24} height={24} fill="green" />
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
        alignItems: 'center',
    },

    modalText: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default BookDetailScreen;