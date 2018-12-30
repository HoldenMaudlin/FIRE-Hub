import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native'
import { mainColor, mainFillColor } from '../Styles/ColorConstants';

var { height, width } = Dimensions.get('window')

class GenreButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity style={[styles.button, {backgroundColor: this.props.active ? mainColor : mainFillColor}]} onPress = {() => this.props._setState(this.props.stateKey)}>
                <Text style={{color: this.props.active ? mainFillColor : mainColor}}>{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

export default GenreButton

const styles = StyleSheet.create({
    button: {
        width: 90,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1,
        borderColor: mainColor,
    },
})