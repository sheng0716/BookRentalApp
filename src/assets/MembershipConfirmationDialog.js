import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Card } from '@ui-kitten/components';

const MembershipConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <Card disabled={true} style={styles.card}>
      <Text style={styles.title}>
        Do you want to become a member?
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={onConfirm} style={styles.confirmButton}>
          YES
        </Button>
        <Button onPress={onCancel} style={styles.cancelButton}>
          NO
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  confirmButton: {
    marginBottom: 8,
    marginRight: 8,
  },
  cancelButton: {
    marginBottom: 8,
  },
});

export default MembershipConfirmationDialog;
