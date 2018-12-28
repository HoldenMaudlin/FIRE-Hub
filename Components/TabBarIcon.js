import React, {Component} from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { mainColor, mainAccentColor } from '../Styles/ColorConstants';


class BottomTabIcon extends Component {
    constructor(props) {
        super(props)

        this.state = {
            animation: new Animated.Value(0)
        }
    }
    
    render() {

        const spin = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        })

        return (
            <Animated.View style={[styles.iconContainer, {transform: [{rotate: spin}]}]} >
                <Icon 
                    name = {this.props.name}
                    type = {this.props.type}
                    color = {this.props.focused ? mainColor : mainAccentColor}
                    size = {24}
                />
            </Animated.View>
        )
    }
}

export default BottomTabIcon

const styles = StyleSheet.create({
    iconContainer: {
        flex:1, 
        justifyContent: 'center', 
    }
})