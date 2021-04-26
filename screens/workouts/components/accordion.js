import * as React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

export default class Accordion extends React.Component {
    accordionBody() {
        return (
            <View style={styles.accordionBody}>
                {this.props.children}
            </View>
        )
    }

    headerLeft() {
        return (
            <View style={styles.headerLeft}>
                {this.props.left}
            </View>
        )
    }

    headerRight() {
        return (
            <View style={styles.headerRight}>
                {this.props.right}
            </View>
        )
    }

    render() {
        const expanded = this.props.expanded
        const headerStyle = [styles.accordionHeader, expanded ? styles.accordionHeaderOpen : styles.accordionHeaderClosed]

        return (
            <View style={styles.outerContainer}>
                <Pressable onPress={this.props.onPress}>
                    <View style={headerStyle}>
                        {this.props.left ? this.headerLeft() : null}
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                {this.props.titledata}
                            </Text>
                        </View>
                        {this.props.right ? this.headerRight() : null}
                    </View>
                </Pressable>
                {expanded ? this.accordionBody() : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        shadowColor: "gray",
        backgroundColor: 'white',
        borderRadius: 3,
        elevation: 5
    },
    accordionHeader: {
        backgroundColor: 'white',
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.1,
        shadowColor: "gray",
        backgroundColor: 'white',
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        flexDirection: 'row',
        elevation: 5
    },
    headerLeft: {
        maxWidth: 30,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerRight: {
        right: 0,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    accordionHeaderOpen: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowOpacity: 0.5
    },
    accordionHeaderClosed: {
        borderRadius: 5,
    },
    accordionBody: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingBottom: 10,
        backgroundColor: "#f1f1f17d"
    },
    titleContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    titleText: {
        fontSize: 16,
        flex: 1
    }
});