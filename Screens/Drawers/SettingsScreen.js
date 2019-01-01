import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { 
    Header,
    Left,
  } from 'native-base';  
import { Icon } from 'react-native-elements'
import { mainFillColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'

class SettingsScreen extends Component {
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
             <Icon name='settings' type='simple-line-icon' color={tintColor}/>
        ),
    }

    render() {
        return(
            <View style = {styles.container}>
                <MainDrawerHeader title = 'Settings' navigation = {this.props.navigation}/>
                <Text> This is the Settings Screen </Text>
            </View>
        )
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  }
})