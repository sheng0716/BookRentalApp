import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';

const ReadScreen = ({ route, navigation }) => {
    const { bookDetail } = route.params; // not used

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <Layout style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={goBack}>
                    <Icon
                        name='chevron-left-outline'
                        style={{ width: 40, height: 50 }}
                    />
                </TouchableOpacity>
                <Text style={{ ...styles.bookContent, fontWeight: 'bold' }}>Read</Text>
            </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={{ ...styles.bookContent, fontWeight: 'bold', marginBottom: 20, }}>Content:</Text>
                <Text style={styles.bookContent}>
                    In the heart of a bustling city, 'The Secrets of Serendipity' unfolds the captivating story of Jane, an aspiring young artist, and her serendipitous encounters with an enigmatic stranger named Leo. Drawn together by the whims of fate, their lives become entwined in a web of mystery and intrigue.
                </Text>
                <Text style={styles.bookContent}>
                    {'\n'}As Jane delves deeper into her art and Leo's world, she discovers an ancient and mystical connection between them, one that transcends time and space. Together, they embark on a thrilling journey to unravel the secrets of their shared destiny.
                </Text>
                <Text style={styles.bookContent}>
                    {'\n'}Through a tapestry of vivid prose and rich character development, 'The Secrets of Serendipity' explores themes of love, destiny, and the power of serendipitous moments in our lives. It takes readers on a mesmerizing ride through the bustling streets of the city, into hidden realms of art and spirituality, and ultimately, to a profound understanding of the interconnectedness of all things.
                </Text>
                <Text style={styles.bookContent}>
                    {'\n'}With its compelling narrative and thought-provoking themes, 'The Secrets of Serendipity' is a literary gem that will leave readers pondering the serendipitous moments in their own lives long after they turn the final page.
                </Text>
            </ScrollView>
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
    },

    contentContainer: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    bookContent: {
        fontSize: 20,
        textAlign: 'justify', 
    },
});

export default ReadScreen;
