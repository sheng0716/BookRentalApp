import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, Alert } from 'react-native';
import { Layout } from '@ui-kitten/components';

const MemberScreen = ({ route, navigation }) => {
    const goBack = (params) => {
        navigation.goBack();
    };

    const handlePurchase = () => {

        //Update database

        Alert.alert("Purchased Successfully!!\nThank You!!", "",
            [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate('ProfileScreen', { isMember: true });
                    },
                },
            ]
        );

        route.params = true;
    }

    const { isMember } = route.params;

    return (
        <Layout style={styles.container}>
            <View>
                {isMember ? (
                    <View>
                        <Text style={styles.aMember}>You are a member already.{"\n"}Thank You!!</Text>
                        <TouchableNativeFeedback
                            onPress={goBack}
                            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>OK</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                ) : (

                    <View>
                        <Text style={styles.title}>Member Packages</Text>
                        <View style={styles.subcontainer}>
                            <Text style={styles.subtitle}>RM 10 / week</Text>
                            <TouchableNativeFeedback
                                onPress={handlePurchase}
                                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                                <View style={styles.buttonPurchase}>
                                    <Text style={styles.buttonTextPurchase}>Subscribe</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                        <View style={styles.subcontainer}>
                            <Text style={styles.subtitle}>RM 30 / month</Text>
                            <TouchableNativeFeedback
                                onPress={handlePurchase}
                                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                                <View style={styles.buttonPurchase}>
                                    <Text style={styles.buttonTextPurchase}>Subscribe</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>

                        <View style={styles.subcontainer}>
                            <Text style={styles.subtitle}>RM 300 / year</Text>
                            <TouchableNativeFeedback
                                onPress={handlePurchase}
                                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                                <View style={styles.buttonPurchase}>
                                    <Text style={styles.buttonTextPurchase}>Subscribe</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>


                )}
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    subcontainer:
    {
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: '90%',
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10,
        elevation: 15,
        marginTop: 5,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subtitle:
    {
        fontSize: 25,
        color: 'black',
        marginTop: 8,
    },

    switch: {
        width: 65,
        height: 30,
        borderRadius: 15,
        borderBlockColor: 'black',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'grey',
    },
    switchThumb: {
        width: '50%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'white',
        position: 'static',
        borderWidth: 1,
        borderColor: 'grey',
    },
    aMember: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        margin: 50,
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        marginLeft: 150,
        marginRight: 150,
        height: 50,
        width: 100,
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        padding: 6,
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginBottom: 20,

    },
    buttonPurchase: {
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#ade1ff',
        width: 125,
        height: 50,
        borderRadius: 10,

    },
    buttonTextPurchase: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        padding: 6,
    }

});

export default MemberScreen;