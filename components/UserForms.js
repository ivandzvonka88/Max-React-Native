import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import AppTextInput from './AppTextInput'

let windowHeight = Dimensions.get('window').height

let toggleConfigs = {
    male: {
        value: 'male',
        children: [
            { value: true, icon: 'human-male' },
            { value: false, icon: 'human-female' }
        ]
    },
    metric: {
        value: 'metric',
        children: [
            { value: true, icon: 'weight-kilogram' },
            { value: false, icon: 'weight-pound' }
        ]
    }
}


export const FormPersonalInfo = (parent, handleChange) => {
    parent = parent.parent

    return (
        <View style={styles.formGroup}>
            <View style={styles.formRow}>
                {parent.renderToggle(toggleConfigs.male)}
                {parent.renderToggle(toggleConfigs.metric)}
            </View>
            <View style={styles.formRow}>
                <AppTextInput
                    label="Birth year"
                    name="birth_year"
                    type="text"
                    value={parent.state.birth_year}
                    containerStyle={[
                        styles.inputContainer,
                        { borderColor: parent.state.changed.includes("birth_year") ? "#9e9900" : "green" }
                    ]}
                    keyboardType='number-pad'
                    onChangeText={(text) => handleChange(text, 'birth_year', this)}
                />
                <AppTextInput
                    label="Birth month"
                    name="birth_month"
                    type="text"
                    value={parent.state.birth_month}
                    containerStyle={[
                        styles.inputContainer,
                        { borderColor: parent.state.changed.includes("birth_month") ? "#9e9900" : "green" }
                    ]}
                    keyboardType='number-pad'
                    onChangeText={(text) => handleChange(text, 'birth_month', this)}
                />
                <AppTextInput
                    label="Birth day"
                    name="birth_day"
                    type="text"
                    value={parent.state.birth_day}
                    containerStyle={[
                        styles.inputContainer,
                        { borderColor: parent.state.changed.includes("birth_day") ? "#9e9900" : "green" }
                    ]}
                    keyboardType='number-pad'
                    onChangeText={(text) => handleChange(text, 'birth_day', this)}
                />
            </View>
            <View style={styles.formRow}>
                <AppTextInput
                    label="Weight"
                    name="bodyweight"
                    type="text"
                    value={parent.state.bodyweight}
                    endAdornment={parent.state.metric ? <Text>kg</Text> : <Text>lb</Text>}
                    containerStyle={[
                        styles.inputContainer,
                        { borderColor: parent.state.changed.includes("bodyweight") ? "#9e9900" : "green" }
                    ]}
                    keyboardType='number-pad'
                    onChangeText={(text) => handleChange(text, 'bodyweight', this)}
                />
                <AppTextInput
                    label="Height"
                    name="height"
                    type="text"
                    value={parent.state.height}
                    endAdornment={<Text>cm</Text>}
                    containerStyle={[
                        styles.inputContainer,
                        { borderColor: parent.state.changed.includes("height") ? "#9e9900" : "green" }
                    ]}
                    keyboardType='number-pad'
                    onChangeText={(text) => handleChange(text, 'height', this)}
                />
            </View>
        </View>
    )
}

export const FormLiftInfo = (parent, handleChange) => {
    parent = parent.parent

    const lifts = [
        {
            liftName: 'Squat',
            styles: [
                { label: 'low-bar', value: 'low-bar back squat' },
                { label: 'high-bar', value: 'high-bar back squat' }
            ]
        }, {
            liftName: 'Bench',
            styles: [
                { label: 'narrow-grip', value: 'narrow-grip bench press' },
                { label: 'medium-grip', value: 'medium-grip bench press' },
                { label: 'wide-grip', value: 'wide-grip bench press' }
            ]
        }, {
            liftName: 'Deadlift',
            styles: [
                { label: 'sumo', value: 'sumo deadlift' },
                { label: 'conventional', value: 'conventional deadlift' }
            ]
        }
    ]

    return (
        <View style={styles.formGroup}>
            {lifts.map((lift) => {
                const liftName = lift.liftName
                const liftNameLower = lift.liftName.toLowerCase()
                const compStyle = lift.styles.filter(
                    style => style.value === parent.state.comp_styles[liftNameLower])[0].label
                return (
                    <View style={styles.formRow} key={liftName}>
                        <AppTextInput
                            label={`${liftName} weight`}
                            value={parent.state.maxs_copy[liftNameLower].max}
                            endAdornment={parent.state.metric ? <Text>kg</Text> : <Text>lb</Text>}
                            keyboardType='number-pad'
                            containerStyle={[
                                styles.inputContainer,
                                { borderColor: parent.state.changed.includes(`max-${liftName}-max`) ? "#9e9900" : "green" }
                            ]}
                            onFocus={(event) => parent.onTextPress(`${liftName}Styles`)}
                            onChangeText={(text) => handleChange(text, `max-${liftName}-max`, this)}
                        />
                        <AppTextInput
                            label="Reps"
                            value={parent.state.maxs_copy[liftNameLower].xrm}
                            endAdornment={<Text>reps</Text>}
                            keyboardType='number-pad'
                            containerStyle={[
                                styles.inputContainer,
                                { borderColor: parent.state.changed.includes(`max-${liftName}-xrm`) ? "#9e9900" : "green" }
                            ]}
                            onFocus={(event) => parent.onTextPress(`${liftName}Styles`)}
                            onChangeText={(text) => handleChange(text, `max-${liftName}-xrm`, this)}
                        />
                        <TouchableOpacity
                            style={[
                                styles.dropdownContainer,
                                { borderColor: parent.state.changed.includes(`${liftName}Styles`) ? "#9e9900" : "green" }
                            ]}
                            onPress={() => parent.showDropDown(
                                `${liftName}Styles`,
                                styles.dropdownContainer,
                                'styles',
                                lift.styles
                            )}
                            ref={view => { parent[`${liftName}Styles`] = view; }}
                            activeOpacity={1}
                        >
                            <Text style={{ fontSize: 14, color: 'black' }}>
                                {compStyle}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
        </View>
    )
}

export const ProgramInfo = (parent, handleChange) => {
    parent = parent.parent

    const frequencies = [
        { label: '3 days a week', value: 3 },
        { label: '4 days a week', value: 4 },
        { label: '5 days a week', value: 5 },
        { label: '6 days a week', value: 6 },
    ]

    const fitnessOptions = [
        {
            value: 'low',
            label: <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 3 }}>Low</Text>,
            description: <Text style={{ textAlign: 'center' }}>Little or no training in the past 30 days.</Text>
        },
        {
            value: 'medium',
            label: <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 3 }}>Medium</Text>,
            description: <Text style={{ textAlign: 'center' }}>Low-intensity or poorly-planned training in the past 30 days.</Text>
        },
        {
            value: 'high',
            label: <Text style={{ fontWeight: '600', textAlign: 'center', marginBottom: 3 }}>High</Text>,
            description: <Text style={{ textAlign: 'center' }}>Just finished a program in the past 30 days.</Text>
        }
    ]

    const frequency = frequencies.filter(x => x.value === parent.state.frequency)[0]['label']
    const fitnessObj = fitnessOptions.filter(x => x.value === parent.state.fitness)[0]
    const fitness = <View
        style={{ justifyContent: 'space-evenly', alignContent: 'space-evenly', alignSelf: 'center' }}>
        {fitnessObj.label}
        {fitnessObj.description}
    </View>

    return (
        <View style={styles.formGroup}>
            <View style={styles.formRow} key={'frequency'}>
                <View style={{ width: '100%', alignContent: 'center' }}>
                    <TouchableOpacity
                        style={[
                            styles.frequencyDropdownContainer,
                            { borderColor: parent.state.changed.includes("frequency") ? "#9e9900" : "green" }
                        ]}
                        onPress={() => parent.showDropDown(
                            "frequency",
                            styles.frequencyDropdownContainer,
                            'frequency',
                            frequencies
                        )}
                        ref={view => { parent["frequency"] = view; }}
                        activeOpacity={1}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}>
                            {frequency}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>Frequency</Text>
                </View>
            </View>
            <View style={[styles.formRow, { height: 59, alignContent: 'center' }]} key={'fitness'}>
                <View style={{ width: '100%', alignContent: 'center' }}>
                    <TouchableOpacity
                        style={[
                            styles.frequencyDropdownContainer,
                            { borderColor: parent.state.changed.includes("fitness") ? "#9e9900" : "green" },
                            { minHeight: 64, paddingTop: 12, alignContent: 'center', justifyContent: 'center' }
                        ]}
                        onPress={() => parent.showDropDown(
                            "fitness",
                            styles.frequencyDropdownContainer,
                            "fitness",
                            fitnessOptions,
                            true
                        )}
                        ref={view => { parent["fitness"] = view; }}
                        activeOpacity={1}
                    >
                        <Text style={{ fontSize: 14, color: 'black' }}>
                            {fitness}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>Fitness level</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 9,
        paddingLeft: 9,
        paddingTop: 2,
    },
    formGroup: {
        flex: 0,
        backgroundColor: "transparent",
        paddingVertical: 10,
        margin: 0,
        width: '100%',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    formRow: {
        flex: 0,
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderRadius: 7,
        marginVertical: 10,
        paddingHorizontal: 6,
        backgroundColor: 'transparent',
        maxHeight: 38
    },
    inputContainer: {
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        marginVertical: 0,
        borderColor: 'green',
        borderWidth: 2
    },
    dropdownContainer: {
        flex: 0,
        width: '30.0%',
        alignItems: "center",
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        borderColor: 'green',
        borderWidth: 2
    },
    frequencyDropdownContainer: {
        flex: 0,
        width: '97%',
        alignSelf: 'center',
        alignItems: "center",
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 4,
        marginHorizontal: 4,
        borderColor: 'green',
        borderWidth: 2
    },
    fitnessToggleContainer: {
        flexDirection: 'column',
        width: '90%',
        minHeight: 174,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        height: '100%',
        borderColor: 'gray'
    },
    fitnessUnselectedToggle: {
        backgroundColor: 'lightgray',
        borderRadius: 5,
        margin: 3,
        padding: 5,
        paddingHorizontal: 4,
        maxHeight: 70,
    },
    fitnessSelectedToggle: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 3,
        padding: 5,
        paddingHorizontal: 4,
        maxHeight: 70,
    },
    fitnessTitle: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16
    },
    toggleContainer: {
        flexDirection: 'row',
        maxHeight: 40,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        height: '100%',
        borderColor: 'gray'
    },
    unselectedToggle: {
        backgroundColor: 'lightgray',
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        margin: 3,
        padding: 3,
        paddingHorizontal: 4,
        maxHeight: 40,
        maxWidth: 40
    },
    selectedToggle: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 3,
        padding: 3,
        paddingHorizontal: 4,
        shadowOffset: { height: 1, width: -1 },
        shadowRadius: 6,
        shadowOpacity: 0.5,
        shadowColor: "gray",
        maxHeight: 40,
        maxWidth: 40
    },
    formGroupHeader: {
        flexDirection: 'column',
        alignItems: 'baseline',
        justifyContent: 'center',
        paddingLeft: 5,
        width: '100%',
        marginBottom: 10
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'left'
    },
    submitButton: {
        marginTop: windowHeight * 0.12,
        maxHeight: windowHeight * 0.09,
        width: '70%',
        backgroundColor: 'white',
        minHeight: '25%',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        borderStyle: 'solid',
        alignItems: 'center',
        alignContent: 'space-around',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'center'
    }
});