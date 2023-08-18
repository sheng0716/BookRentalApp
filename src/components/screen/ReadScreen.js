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
            </View>

            <ScrollView style={styles.contentContainer}>
                <Text style={styles.bookContent}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dapibus orci
                    eu nisl egestas, in euismod nisi viverra. Fusce in velit id libero venenatis
                    vehicula. Fusce varius dui a purus euismod euismod. Maecenas eget malesuada arcu.
                    Proin non ultrices metus. Vestibulum id libero non est tincidunt finibus.

                    Mauris id urna massa. Integer vitae purus vel justo bibendum feugiat. Sed
                    condimentum, felis et congue euismod, dui libero sagittis orci, id vehicula
                    augue ex quis urna. Curabitur in turpis et ante pellentesque faucibus sit amet
                    vel arcu. Etiam varius justo eu tincidunt auctor. Sed at mi vestibulum, posuere
                    lectus vel, euismod justo. Proin quis lectus felis. Nulla facilisi. Vivamus
                    faucibus a libero at auctor. Suspendisse rhoncus risus et elit euismod
                    tincidunt. Quisque eleifend justo et ligula convallis tincidunt. Integer aliquet
                    tortor vel nibh cursus, a consectetur lorem interdum. Cras viverra euismod quam,
                    a volutpat metus gravida ut. Quisque facilisis velit vel dui suscipit dictum.

                    In et sapien a enim tincidunt lacinia non a libero. Aliquam fermentum ligula
                    quam, sed viverra neque tincidunt quis. Praesent congue, ipsum id feugiat
                    tincidunt, quam odio lacinia velit, ut viverra odio justo id dui. Nam sit amet
                    euismod est. Curabitur consequat luctus libero. Ut auctor, nunc eu dictum
                    faucibus, nisl ligula tincidunt elit, non eleifend enim quam nec mi. Nunc vitae
                    turpis vel quam vulputate bibendum. Aenean feugiat odio nec libero efficitur
                    fermentum. Nullam non laoreet purus. Vestibulum pharetra sapien non diam
                    tristique, ac iaculis tellus bibendum.

                    ... (Repeat or extend the content to make it longer)
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
    },

    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },

    bookContent: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 20,
    },
});

export default ReadScreen;
