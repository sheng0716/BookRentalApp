import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, message, onDismiss }) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.container}>
                <View style={styles.alert}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onDismiss}>
                            <Text style={styles.dismissText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alert: {
        backgroundColor: 'white',
        padding: 30, // Increase padding for larger container
        borderRadius: 10,
    },
    message: {
        fontSize: 18, // Increase fontSize for larger text
        marginBottom: 10, // Add margin bottom for spacing
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center horizontally
    },
    dismissText: {
        marginTop: 10,
        color: 'blue',
        justifyContent: 'center',
    },
});

export default CustomAlert;
