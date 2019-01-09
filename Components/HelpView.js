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

// DESC:
// Help overlay creator used on every screen
// Renders and displays Header lines when question mark button on top header is pressed
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