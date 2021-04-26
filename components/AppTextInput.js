import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

export default class AppTextInput extends React.Component {
    render() {
        const { endAdornment, containerStyle, inputStyle, label, ...otherProps } = this.props
        return (
            <View style={styles.superContainer}>
                <View style={[styles.inputContainer, containerStyle]}>
                    <TextInput
                        style={[styles.textInput, inputStyle]}
                        placeholderTextColor="#6e6869"
                        {...otherProps}
                    />
                    <View style={styles.adornmentContainer}>
                        {endAdornment}
                    </View>
                </View>
                {label ? <Text style={styles.label}>{label}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 9,
        paddingLeft: 7
    },
    superContainer: {
        flex: 1
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
        borderWidth: 2,
        height: '100%',
        minHeight: 38,
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
    adornmentContainer: {
        backgroundColor: 'transparent',
        fontSize: 14,
        color: 'black',
        borderRadius: 5,
        padding: 1,
        marginHorizontal: 3,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    }
});