/*
 * Summary.
 * Display button with genre name to user.
 *
 * Description.
 * Button recives props and active key from parent screen. On active
 * Button will change color to distinguish itself
 *
 * @prop  bool       active          Change color of component when user presses it
 * @prop  string     name            Text to display on button
 * 
 * @return Component  Touchable dynamic button with name
 */

// Package imports
import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native'

// Style imports
import { mainColor, mainFillColor } from '../Styles/ColorConstants';


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

// Button style
const styles = StyleSheet.create({
    button: {
        width: 90,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: mainColor,
    },
})