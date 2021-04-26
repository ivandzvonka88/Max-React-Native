import * as React from 'react';
import { Text, View } from '../../../components/Themed';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AppTextInput from '../../../components/AppTextInput'
import { sendResults } from '../api'

const rirChoices = [
    { label: '💀 Failed', value: -1 },
    { label: '😱 RIR 0', value: 0 },
    { label: '😰 RIR 1', value: 1 },
    { label: '😧 RIR 2', value: 2 },
    { label: '😯 RIR 3', value: 3 },
    { label: '🙂 RIR 4', value: 4 },
    { label: '😀 RIR 5', value: 5 },
]

function handleResult(
    text,
    idxs,
    parent
) {
    console.log(text)
    var items = parent.state.items;
    var errors = parent.state.errors;
    // console.log(e.target, 'idxs:', idxs);

    // const name = e.target.name;
    // const value = e.target.value;
    // const id = e.target.id;

    // if (errors.includes(id)) {
    //     errors.splice(errors.indexOf(id), 1);
    //     parent.setState(() => ({ errors }))
    // }

    items[idxs[0]].days[idxs[1]]
        .movements[idxs[2]].sets[idxs[3]]['rir'] = text;
    items[idxs[0]].days[idxs[1]]
        .movements[idxs[2]].sets[idxs[3]].written = false;

    parent.setState(() => ({ items }))

    submitResult(
        idxs,
        parent
    )
};

function submitResult(
    idxs,
    parent,
) {
    var micro = parent.state.items[idxs[0]]
    var day = micro.days[idxs[1]];
    var movement = day.movements[idxs[2]];
    var next_movement = day.movements[parseInt(idxs[2]) + 1];
    var set = JSON.parse(JSON.stringify(movement.sets[idxs[3]]));
    var err_var = null
    var errors = parent.state.errors

    set['cognito_id'] = parent.state.cognito_id;
    set['program_id'] = parent.state.stripe_id;

    parent.setState({ loadingMovement: movement.movement_id })

    console.log('SUBMIT SET:', set)

    // check for validation errors
    if (set.weight === null || set.weight === '') {
        err_var = set.set_id + '_weight'
        errors.push(err_var)
        parent.setState({ errors })
    }
    if (set.reps === null || set.reps === '') {
        err_var = set.set_id + '_reps'
        errors.push(err_var)
        parent.setState({ errors })
    }
    if (set.rir === null || set.rir === '') {
        err_var = set.set_id + '_rir'
        errors.push(err_var)
        parent.setState({ errors })
    }

    if (err_var == null) {
        set.rir = parseInt(set.rir)
        set.written = true;
        console.log('sending results...')
        sendResults(set, parent).then((e) => {
            console.log('then e:', e);
            parent.setState({ loadingMovement: '' })
            if (e === 'error') {
                set.written = false;
                console.log('ERROR! ' + e);
                setDialog(<Translate id="screens.workouts.layout.error" />, parent); //error
            } else {
                console.log('No error on result submission, e:', e)
                var items = parent.state.items;
                items[idxs[0]] = e.data.program;
                var new_move = items[idxs[0]].days[idxs[1]].movements[idxs[2]]

                console.log('target after', items[idxs[0]])

                if (new_move.sets.length === set.set_order + 1 || set.rir === -1) {
                    console.log('next_movement:', next_movement);
                    if (day.movements.length === movement.movement_order + 1) {
                        parent.setState({
                            items,
                            expandedMovement: null,
                        });
                    } else {
                        parent.setState({ items });
                    }
                } else {
                    parent.setState({
                        items,
                    });
                }

                if ('snackbar_message' in e.data) {
                    parent.setState({
                        snackbarMessage: e.data.snackbar_message,
                        snackbarOpen: true
                    })
                }
            }
        });
    }
};

function isDisabled(movement, this_set, set_before) {
    if (Object.keys(this_set).includes('movement_name') &&
        movement.movement_name.en !== this_set.movement_name.en) {
        return true
    } else {
        return set_before ? (set_before.written ? false : true) : false
    }
}

function setStyle(set, style, setDisabled) {
    if (setDisabled) {
        return [style, { borderColor: 'gray' }]
    } else {
        if (set.written) {
            return style
        } else {
            return [style, { borderColor: '#f3e000' }]
        }
    }
}

export default class SetForm extends React.Component {
    state = { show: false }

    onTextPress() {
        // handles moving the screen to fit the keyboard
        this.rirButton.measure((x, y, width, height, pageX, pageY) => {
            const keyboardLine = Dimensions.get('window').height - 350
            const contentOffsets = this.props.parent.state.contentOffset
            const keyboardCrossover = pageY + contentOffsets.y - keyboardLine

            if (keyboardCrossover > 0 && keyboardCrossover > contentOffsets.y) {
                this.props.parent.scrollViewRef.scrollTo(
                    { x: 0, y: keyboardCrossover + 50, animated: true }
                )
            }
        })
    }

    showDropDown(rirStyle, this_set) {
        console.log('sup, showDropDown')
        const micro = this.props.parent.state.items[this.props.idxs[0]]
        const day = micro.days[this.props.idxs[1]]
        const movement = day.movements[this.props.idxs[2]]
        const last_set = movement.sets[this.props.idxs[3] - 1]
        const setDisabled = isDisabled(movement, this_set, last_set)
        if(!movement.disabled)
        {
            this.rirButton.measure((x, y, width, height, pageX, pageY) => {
                const position = { pageX, pageY, width, height };
                this.props.parent.setState({
                    show: true,
                    openSet: this_set,
                    idxs: this.props.idxs,
                    position, rirButton: this.rirButton,
                    dropdownButtonStyle: rirStyle,
                    dropdownChoices: rirChoices
                })
            });
        }
        
    }

    render() {
        const micro = this.props.parent.state.items[this.props.idxs[0]]
        const day = micro.days[this.props.idxs[1]]
        const movement = day.movements[this.props.idxs[2]]
        const this_set = movement.sets[this.props.idxs[3]]
        const last_set = movement.sets[this.props.idxs[3] - 1]
        const setDisabled = isDisabled(movement, this_set, last_set)

        const rirStyle = setStyle(this_set, styles.touchableRir, movement.disabled)
        const dropdownLabel = this_set.written ? rirChoices.filter(x => x.value === this_set.rir)[0].label : 'RIR'

        return (
            <>
            <Text style={{fontSize:12,paddingLeft:8}}>{movement.note}</Text>
            <View style={styles.resultContainer} >
                <AppTextInput
                    endAdornment={<Text style={styles.adornmentText}>reps</Text>}
                    containerStyle={setStyle(this_set, styles.inputContainer, movement.disabled)}
                    value={String(this_set.reps)}
                    onChangeText={text => console.log(text)}
                    keyboardType='number-pad'
                    disabled={movement.disabled}
                    set={this_set}
                    editable={!movement.disabled}
                    onFocus={(event) => this.onTextPress()}
                />
                <AppTextInput
                    endAdornment={<Text style={styles.adornmentText}>kg</Text>}
                    containerStyle={setStyle(this_set, styles.inputContainer, movement.disabled)}
                    value={String(this_set.weight)}
                    onChangeText={text => console.log(text)}
                    keyboardType='decimal-pad'
                    disabled={movement.disabled}
                    set={this_set}
                    editable={!movement.disabled}
                    onFocus={(event) => this.onTextPress()}
                />
                <TouchableOpacity
                    style={rirStyle}
                    onPress={() => this.showDropDown(rirStyle, this_set)}
                    ref={view => { this.rirButton = view; }}
                    disabled={this.props.parent.state.show}
                    onLayout={this._onLayout}
                    activeOpacity={1}
                >
                    <Text style={{ fontSize: 14, color: 'black' }}>
                        {dropdownLabel}
                    </Text>
                </TouchableOpacity>
            </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    resultContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 7,
        paddingVertical: 2,
        paddingHorizontal: 6,
        backgroundColor: 'transparent'
    },
    touchableRir: {
        backgroundColor: 'white',
        width: '30.0%',
        alignItems: "center",
        padding: 8,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        marginVertical: 2,
        flex: 1,
    },
    pickerInput: {
        backgroundColor: 'white',
        width: '30.0%',
        fontSize: 20,
        color: 'black',
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        marginVertical: 2,
        flex: 1,
        borderColor: 'green',
        borderWidth: 2
    },
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 4,
        marginHorizontal: 4,
        marginVertical: 2,
        flex: 1,
        borderColor: 'green',
        borderWidth: 2
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: 14,
        color: 'black',
        borderRadius: 5,
        padding: 1,
        margin: 2,
        flex: 1
    },
    adornmentText: {
        textAlign: 'right',
        color: 'black'
    }
});