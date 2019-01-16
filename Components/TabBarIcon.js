/*
 * Summary.
 * Icon component for bottom tool bar
 * 
 * Description.
 * Displays tool tabs and responds to active presses.
 *
 * PROP   TYPE       NAME          REQ.     DESC
 * @prop  bool       focused       Yes      Change tab color based on if it is active
 * @prop  string     name          Yes      Name of the icon to be shown
 * @prop  string     type          Yes      Font type of icon to be shown
 *  
 */

// Pacakge imports
import React, {Component} from 'react'
import { 
     View, 
     StyleSheet 
    } from 'react-native'
import { Icon } from 'react-native-elements'

// Style imports
import { mainColor, mainAccentColor } from '../Styles/ColorConstants';

class BottomTabIcon extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <View style={styles.iconContainer} >
                <Icon 
                    name = {this.props.name}
                    type = {this.props.type}
                    color = {this.props.focused ? mainColor : mainAccentColor}
                    size = {24}
                />
            </View>
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