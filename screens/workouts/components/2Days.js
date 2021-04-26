import Carousel from 'react-native-snap-carousel';
import * as React from 'react';
import { Text, View } from 'react-native';
import Movement from './3Movements'
import { styles } from '../styles';

export default class Day extends React.Component {
    state = {
        days: [],
        dayIdx: 0
    }

    async componentDidMount() {
        const days = this.props.days
        this.setState({ days })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{
                borderRadius: 5,
                height: 40,
                paddingLeft: 20,
                marginLeft: 0,
                marginRight: 0,
                marginHorizontal: 'auto'
            }}>
                <Text style={styles.dayHeader}>
                    {item.sliderText}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.parent.state.items[this.props.microIdx].days}
                    renderItem={this._renderItem}
                    sliderWidth={400}
                    sliderHeight={60}
                    itemWidth={400}
                    itemHeight={90}
                    onSnapToItem={index => this.props.parent.setState({ dayIdx: index })}
                />
            </View>
        );
    }
}