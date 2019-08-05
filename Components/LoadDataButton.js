import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native'
import { mainColor, mainFillColor, mainAccentColor } from '../Styles/ColorConstants';

var {height, width} = Dimensions.get('window')

class LoadDataButton extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => this.props.onPressLoadData()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoadDataButton

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    button: {
        height: 50,
        width: width * .5,
        backgroundColor: mainAccentColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .25,
        shadowRadius: 2,
        borderRadius: 5,
        elevation: 2,
    },
    buttonText: {
        color: mainFillColor,
        fontSize: 15,
        fontWeight: 'bold'
    }
})