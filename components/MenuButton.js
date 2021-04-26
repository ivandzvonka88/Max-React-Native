import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class MenuButton extends React.Component {
    render() {
        return (
            <Pressable
                onPress={() => this.props.navigation.openDrawer()}
                style={styles.pressContainer}
            >
                <View style={styles.menuButton}>
                    <Icon name="menu" size={20} color="black" />
                </View>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    pressContainer: {
        position: 'absolute',
        zIndex: 1003,
        top: 35,
        right: 10,
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        backgroundColor: 'transparent',
        zIndex: 1000
    }
})
