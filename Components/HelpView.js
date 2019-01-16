/*
 * Summary.
 * Main help view for every page.
 *
 * Description.
 * Receives props from the parent screen and is called for however many help lines
 * in array. Displays dark overlay over entire screen.
 *
 * @prop  array      helpLines      Array of strings and icon names to be displayed
 * 
 * @return Component    Opaque overlay showing requested help lines
 */

// Package imports
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native'
import { Icon } from 'react-native-elements'

var { height, width } = Dimensions.get('window')

class HelpView extends Component {
    constructor(props) {
        super(props)
    }

    // Pushes all view lines into array and displays them in opaque overlay
    render () {
        var helpLines = []
        for (var i = 0; i < this.props.helpLines.length; i++) {
            helpLines.push(
                <View key={this.props.helpLines[i].key} style={styles.helpLineContainer}>
                    <Icon size={30} color={'white'} name={this.props.helpLines[i].icon} type={this.props.helpLines[i].iconType}/>
                    <Text style={styles.helpLineText}>{this.props.helpLines[i].text}</Text>
                </View>
            )
        }

        return (
            <View>
                {helpLines}
            </View>
        )
    }
}

export default HelpView

const styles = StyleSheet.create({
    // Inner content container
    container: {
        height: height * 0.6,
        width: width * 0.8,
    },
    // Help tip container style
    helpStyle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // One help tip
    helpLineContainer: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center'
    },
    // Help text style
    helpText: {
        fontSize: 24,
        color: 'white',
    },
    // Help line text style
    helpLineText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 15,
    },
})