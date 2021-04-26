import Carousel from 'react-native-snap-carousel';
import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator,Dimensions } from 'react-native';
import Sets from './4Sets'
import Accordion from './accordion'
import Swiper from 'react-native-swiper'

export default class Movement extends React.Component {
    state = {
        dayIdx: 0,
        idxs: [],
        day: {},
        this_move: { movement_id: '' },
        last_move: {},
        next_move: {},
        isDisabled: false,
        index:0
    }

    swiper = null;
    handlePress(movement_id) {
        this.setState({index:0})
        if (this.props.parent.state.expanded == movement_id) {
            this.props.parent.setState({ expanded: '' })
        } else {
            this.props.parent.setState({ expanded: movement_id })
        }
    }

    calcDisabled(last_move, mainLiftsCompleted) {
        // if (mainLiftsCompleted) {
        //     return false
        // }

        if (last_move) {
            if (last_move.movement_completed !== false) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }

    indicatorDot(finished) {
        return (
            <View
                style={{
                    marginHorizontal: 4,
                    height: 8,
                    width: 8,
                    borderRadius: 8,
                    backgroundColor: finished ? 'green' : '#f3e000'
                }}
            />
        )
    }

    loadingIndicator(movement) {
        if (this.props.parent.state.loadingMovement === movement.movement_id) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="gray" />
                </View>
            )
        } else {
            return null
        }
    }

    swapeMovement(movement,indices)
    {
        const move_name = movement.movement_name.en
        const options = movement.options

        for(const ops in options)
        {
            const option = options[ops]
            if(move_name == option.name.en)
            {
                const new_move = options[(parseInt(ops) + 1) % options.length]
                
                movement.movement_name = new_move.name
                for(const idx in movement.sets)
                {
                    var set = movement.sets[idx]
                    if(!set.written)
                    {
                        movement.sets[idx].weight = new_move.weight
                        movement.sets[idx].movement_name = new_move.name
                    }
                }

                if(this.swiper)
                {
                    var items = this.props.parent.state.items;
                    console.log(ops)
                    if(ops != options.length - 1)
                    {
                        movement.disabled = true;
                        movement.note = "it was done as " + move_name;
                    }
                    else
                    {
                        movement.disabled = false;
                        movement.note = ""
                    }
                    
                    items[this.props.idxs[0]].days[this.props.idxs[1]].movements[indices] = movement
                    
                    this.props.parent.setState({
                        items:items
                    })
                    this.swiper.scrollBy((parseInt(ops) + 1) % options.length + 1,true)
                    
                }
            }
            
        }
    }

    renderAccordion(movement,index) {
        const open = this.props.parent.state.expanded === movement.movement_id
        const width = Dimensions.get("window").width;
        return open?(
            <Swiper
                key={movement.movement_id + "swiper"}
                ref={component=>this.swiper = component}
                showsButtons={false}
                scrollEnabled={false}
                style={{}}
                showsPagination={false}
                height="100%"
                width={width}
            >
                {
                    movement.options.map((option,indexitem)=>{
                        return (
                            <View key={movement.movement_id + option.name.en + "g"} style={[styles.cardInactiveUnwritten,{flex:1}]}>
                                <Accordion
                                    titledata={movement.movement_name.en}
                                    expanded={open}
                                    left={this.indicatorDot(movement.movement_completed)}
                                    right={this.loadingIndicator(movement)}
                                    onPress={() => this.handlePress(movement.movement_id)}
                                    key={movement.movement_id + option.name.en}
                                >
                                    <Sets
                                        parent={this.props.parent}
                                        idxs={this.props.idxs.concat([movement.movement_order])}
                                        swap = {()=>this.swapeMovement(movement,index)}
                                    />
                                </Accordion>
                            </View>
                        )
                    })
                }
            </Swiper>
        ):(
            <View style={styles.cardInactiveUnwritten} key={movement.movement_id}>
                <Accordion
                        titledata={movement.movement_name.en}
                        expanded={open}
                        left={this.indicatorDot(movement.movement_completed)}
                        right={this.loadingIndicator(movement)}
                        onPress={() => this.handlePress(movement.movement_id)}
                        key={movement.movement_id + '_a'}
                    >
                        <Sets
                            parent={this.props.parent}
                            idxs={this.props.idxs.concat([movement.movement_order])}
                            swap = {()=>this.swapeMovement(movement,index)}
                        />
                    </Accordion>
                </View>
            )
    }

    render() {
        const day = this.props.parent.state.items[this.props.idxs[0]].days[this.props.idxs[1]]
        
        return (
            <View style={{
                backgroundColor: "white",
                borderRadius: 5,
                padding: 0,
                marginLeft: 0,
                marginRight: 0,
                flex: 1,
                width: '100%',
                marginTop: 10
            }}>
                {day.movements.map((movement,index) =>
                    this.renderAccordion(movement,index)
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    accordionStyleClosed: {
        color: 'black',
        borderRadius: 5,
        backgroundColor: 'white',
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        shadowColor: "gray",
        backgroundColor: 'white',
        elevation: 1
    },
    accordionStyleOpened: {
        color: 'black',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'white',
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 3,
        shadowOpacity: 0.6,
        shadowColor: "gray",
        backgroundColor: 'white',
        elevation: 1
    },
    cardInactiveUnwritten: {
        margin: 8,
        borderRadius: 5,
        shadowOffset: { height: 4, width: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
        shadowColor: "gray",
        backgroundColor: 'white',
        zIndex: 500,
        elevation: 6
    },
    loadingContainer: {
        padding: 15
    }
});