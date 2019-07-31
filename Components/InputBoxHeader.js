/*
 * Summary.
 * Standard header for input box categories
 * 
 * Description.
 * Receives title text and displays it cleanly to screen
 *
 * @prop  string   title    Text to be displayed
 * 
 * @return   Basic view with text to screen
 */


// Package imports
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

// Style imports
import { mainColor, mainHeaderColor } from '../Styles/ColorConstants';

export default class InputBoxHeader extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        paddingTop: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    // Title style
    textStyle: {
        fontSize: 18,
        color: mainHeaderColor,
    },
})