// Pacakge imports
import React, {Component} from 'react'
import { 
     View, 
     StyleSheet 
    } from 'react-native'
import { Icon } from 'react-native-elements'

// Style imports
import { mainColor, mainAccentColor } from '../Styles/ColorConstants';

// DESC:
// Icon component for Link Bottom Tab Navigator
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