/*
 * Summary.
 * Component to display available tools on tools screen
 * 
 * Description.
 * Receives data from tools screen and displays clickable tool buttons
 * and handles navigation to tool screens.
 *
 * PROP   TYPE       NAME          REQ.     DESC
 * @prop  Object     navigation    Yes      Navigation props of parent screen
 * @prop  string     nextScreen    Yes      Screen to navigate to
 * @prop  string     title         Yes      Title of tool
 * @prop  string     desc          Yes      Description of the tool
 * @prop  string     icon          Yes      Name of icon 
 * @prop  string     iconType      Yes      Font type of icon
 * 
 */

// Package imports
import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'

// Style imports
import { mainAccentColor, mainFillColor, mainHeaderColor } from '../Styles/ColorConstants';

class ToolButton extends Component {
    constructor(props) {
        super(props)
    }

    _pressTool(screen){
        this.props.navigation.navigate(screen)
    }

    render() {
        return(
            <TouchableOpacity onPress={() => this._pressTool(this.props.nextScreen)} style={styles.button}>
                <View style={styles.nameContainer}>
                    <View style={styles.nameLeft}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                    </View>
                    <View style={styles.nameRight}>
                        <Icon color={mainHeaderColor} size={22} name='arrow-right' type='simple-line-icon' />
                    </View>
                </View>
                <View style={styles.descContainer}>
                    <Text>{this.props.desc}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default ToolButton

const styles = StyleSheet.create({
    // Main Container
    button: {
        flexDirection: 'column',
        backgroundColor: mainFillColor,
        margin: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .25,
        shadowRadius: 2,
        borderRadius: 5,
        elevation: 2,
    },
    // Top name styles
    nameContainer: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: mainFillColor,
        borderBottomWidth: .4,
        borderBottomColor: mainAccentColor,
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    titleText: {
        fontSize: 30,
        marginLeft: 10,
        color: mainHeaderColor,
    },
    nameLeft: {
        flex: 4, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 5,
    },

    // Bottom description styles
    descContainer: {
        flex: -1,
        padding: 10,
        paddingTop: 5,
    }
})