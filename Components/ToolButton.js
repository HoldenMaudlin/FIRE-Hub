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
import { mainAccentColor, mainFillColor, mainColor } from '../Styles/ColorConstants';

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
                        <Icon color={mainFillColor} size={35} name={this.props.icon} type={this.props.iconType}/>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                    </View>
                    <View style={styles.nameRight}>
                        <Icon color={mainFillColor} size={22} name='arrow-right' type='simple-line-icon' />
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
        shadowRadius: 5,
        borderRadius: 5,
    },
    // Top name styles
    nameContainer: {
        flexDirection: 'row',
        height: 40,
        paddingLeft: 5,
        backgroundColor: mainColor,
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    titleText: {
        fontSize: 30,
        marginLeft: 10,
        color: mainFillColor,
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