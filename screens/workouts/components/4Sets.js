import * as React from 'react';
import { Text, View,Pressable } from 'react-native';
import SetForm from './5SetForms'
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default class Sets extends React.Component {
    state = {
        days: [],
        dayIdx: 0
    }

    handleInput(text) {
        console.log(text)
    }

    render() {
        const micro = this.props.parent.state.items[this.props.idxs[0]]
        const day = micro.days[this.props.idxs[1]]
        const movement = day.movements[this.props.idxs[2]]

        return (
            <View style={styles.accordionContainer}>
                <View style={styles.noteBoxContainer}>
                    <Text style={{ padding: 15, lineHeight: 20, flexWrap: 'wrap' }} >
                        {movement.movement_note ? movement.movement_note.en : ''}
                    </Text>
                    <View style={styles.movementIcons}>
                        <Pressable style={styles.swapIconContainer} onPress={this.props.swap}>
                            <Icon name="swap" size={24} style={{ margin: 'auto' }} />
                            <Text style={{ fontSize: 10 }}>swap</Text>
                        </Pressable>
                    </View>
                </View>
                {movement.sets.map((set) => {
                    return (
                        <SetForm
                            parent={this.props.parent}
                            idxs={this.props.idxs.concat([set.set_order])}
                            key={set.set_id}
                        />
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    accordionContainer: {
        backgroundColor: "transparent",
        paddingVertical: 10,
        margin: 0,
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    noteBoxContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        padding: 5,
        backgroundColor: "#f1f1f17d"
    },
    movementIcons: {
        textAlign: "right",
        marginBottom: 10,
        marginRight: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    swapIconContainer: {
        margin: 'auto',
        alignItems: 'center',
        width: 38,
        height: 42,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOffset: { height: 4, width: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: "gray",
        elevation: 8,
    }
});