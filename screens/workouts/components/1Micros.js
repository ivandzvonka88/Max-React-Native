import Carousel from 'react-native-snap-carousel';
import * as React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';

export default class Micro extends React.Component {
    state = {
        activeIndex: 0,
        next_week: null
    }

    async componentDidMount() {
        const micros = this.props.parent.state.items
        this.props.parent.setState({ micros })
    }

    _renderItem = ({ item, index }) => {
        var next_week = this.props.parent.state.items[this.props.parent.state.microIdx - 1]
        var last_week = this.props.parent.state.items[this.props.parent.state.microIdx + 1]

        return (
            <View style={{
                borderRadius: 5,
                height: 30,
                paddingLeft: 20,
                maxHeight: 30,
                paddingTop: 3
            }}>
                <Text style={styles.microHeader}>
                    {item.sliderText}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} >
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.parent.state.items}
                    renderItem={this._renderItem}
                    sliderWidth={400}
                    sliderHeight={60}
                    itemWidth={400}
                    itemHeight={90}
                    onSnapToItem={index => this.props.parent.setState({ microIdx: index, dayIdx: 0 })}
                    useScrollView={true}
                />
            </View>
        );
    }
}