import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { mainFillColor, mainColor } from '../Styles/ColorConstants';

var { height, width } = Dimensions.get('window')

class HelpView extends Component {
    constructor(props) {
        super(props)
    }

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
            <View style={styles.container}>
                {helpLines}
            </View>
        )
    }
}

export default HelpView

const styles = StyleSheet.create({
    container: {
        height: height * 0.6,
        width: width * 0.8,
    },
    helpStyle: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpLineContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    helpText: {
        fontSize: 24,
        color: 'white',
    },
    helpLineText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 15,
    },
})