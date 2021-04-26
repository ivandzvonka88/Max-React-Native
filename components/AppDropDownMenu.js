// until I figure out how to do a full-screen overlay from a heavily-nested
// child component, this is the solution. This DropDownMenu goes in the root
// of a screen and will overlay everything when open.

import React from 'react';
import {
    Text, View, StyleSheet, TouchableWithoutFeedback,
    TouchableOpacity, Dimensions
} from 'react-native';
import { BlurView } from 'expo-blur';

export default class DropDownMenu extends React.Component {
    hideDropDown() {
        console.log("you're hiding the dropdown")
        this.props.parent.setState({ show: false, position: {} })
    }

    getDropdownStyle(droppingDown) {
        const { pageX, pageY, width, height } = this.props.position;
        const offsets = this.props.contentOffset;
        const contentHeight = this.props.contentHeight;
        const windowHeight = Dimensions.get('window').height;
        const spaceAtBottom = contentHeight - windowHeight

        const left = pageX + (width / 2)
        const top = pageY

        console.log('position:', this.props.position,
            'offsets:', this.props.contentOffset,
            'contentHeight:', contentHeight,
            'windowHeight:', windowHeight,
            'spaceAtBottom:', spaceAtBottom)

        if (droppingDown) {
            // high enough on the screen, render popup below button
            return [styles.menu,
            {
                borderTopWidth: 0,
                top: top + offsets.y,
                left: left - width / 2,
                width
            }]
        } else {
            // too low on the screen, render popup above button
            return [styles.menu,
            {
                borderBottomWidth: 0,
                bottom: windowHeight - top + (spaceAtBottom - offsets.y) - height,
                left: left - width / 2,
                width
            }]
        }
    }

    getButton(droppingDown) {
        const { width, height } = this.props.position
        var style = [this.props.buttonStyle, styles.topButtonAdjustments, { height, width }]

        if (droppingDown) {
            style = [this.props.buttonStyle, styles.topButtonAdjustments, { height, width }]
        } else {
            style = [this.props.buttonStyle, styles.bottomButtonAdjustments, { height, width }]
        }

        return (
            < TouchableOpacity
                style={style}
                activeOpacity={1}
                onPress={() => this.hideDropDown()}
            >
                <Text>{this.props.buttonText}</Text>
            </TouchableOpacity>
        )

    }

    isDroppingDown() {
        // is the dropdown going to go down, or up?
        const { pageX, pageY, width, height } = this.props.position;
        const windowHeight = Dimensions.get('window').height;
        const menuHeight = ((height + 7) * this.props.choices.length) + 25
        const spaceBelow = windowHeight - pageY

        if (spaceBelow > menuHeight) {
            // high enough on the screen, this menu will drop DOWN
            return true
        } else {
            // too low on the screen, this menu will drop UP
            return false
        }
    }

    render() {
        const { choices, label } = this.props

        if (this.props.show) {
            const { width, height } = this.props.position
            if (this.props.description) {
                return (
                    <BlurView intensity={50} style={[StyleSheet.absoluteFill]}>
                        <View style={styles.pageContainer} >
                            <TouchableWithoutFeedback onPress={() => this.hideDropDown()}>
                                <View style={styles.pageContainer}>
                                    <View style={this.getDropdownStyle(this.isDroppingDown())} >
                                        {this.isDroppingDown() ? this.getButton(true) : null}
                                        {choices.map((child) => {
                                            return (
                                                <TouchableOpacity
                                                    style={[styles.menuItem, { height, width }]}
                                                    onPressIn={() => this.props.onPress(child)}
                                                    key={child.value}
                                                >
                                                    <View>{child.label}</View>
                                                    <View>{child.description}</View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                        {!this.isDroppingDown() ? this.getButton(false) : null}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {label ? <Text style={styles.label}>{label}</Text> : null}
                    </BlurView >
                )
            } else {
                return (
                    <BlurView intensity={50} style={[StyleSheet.absoluteFill]}>
                        <View style={styles.pageContainer} >
                            <TouchableWithoutFeedback onPress={() => this.hideDropDown()}>
                                <View style={styles.pageContainer}>
                                    <View style={this.getDropdownStyle(this.isDroppingDown())} >
                                        {this.isDroppingDown() ? this.getButton(true) : null}
                                        {choices.map((child) => {
                                            return (
                                                <TouchableOpacity
                                                    style={[styles.menuItem, { height, width }]}
                                                    onPressIn={() => this.props.onPress(child)}
                                                    key={child.value}
                                                >
                                                    <Text>{child.label}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                        {!this.isDroppingDown() ? this.getButton(false) : null}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {label ? <Text style={styles.label}>{label}</Text> : null}
                    </BlurView >
                )
            }
        } else {
            return null
        }
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        flex: 1
    },
    menu: {
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 11,
        borderRadius: 5,
        borderColor: 'darkgray',
        borderWidth: 2,
        marginBottom: 0
    },
    nonBlurredContent: {
        zIndex: 2000000,
        flex: 1
    },
    topButtonAdjustments: {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderColor: 'darkgray',
        marginTop: 0,
        alignContent: 'center',
        justifyContent: 'center'
    },
    bottomButtonAdjustments: {
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderColor: 'darkgray',
        marginBottom: 0,
        paddingBottom: 0,
        alignContent: 'center',
        justifyContent: 'center'
    },
    menuItem: {
        // margin: 2,
        width: 103,
        height: 30,
        alignItems: 'center',
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

