import Carousel from 'react-native-snap-carousel';
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { List, Modal, Portal } from 'react-native-paper';
import Max from '../../../assets/images/max_sketch.png'

export default class MicroNotes extends React.Component {
    state = {}

    async componentDidMount() { }


    render() {
        const micro = this.props.parent.state.items[this.props.idxs[0]]
        return (
            <View style={styles.container}>
                <View style={styles.imageAndNoteContainer}>
                    <Image
                        source={Max}
                        style={{ width: 100, height: 100 }}
                    />
                    <View style={styles.noteContainer}>
                        <Text style={{ width: '65%' }}>{micro.micro_note.en}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        marginTop: 14,
        padding: 8
    },
    imageAndNoteContainer: {
        flexDirection: 'row'
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%"
    }
});