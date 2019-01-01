import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements'
import { mainFillColor, mainColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'

class AboutFIREScreen extends Component {
    
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
             <Icon name = 'information-outline' type='material-community' color={tintColor}/>
        )
    }
    
    render() {
        return(
            <View style = {styles.container}>
                <MainDrawerHeader title = 'About FIRE' navigation = {this.props.navigation}/>
                <Text> This is the About Fire Screen </Text>
            </View>
        )
    }
}

export default AboutFIREScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  }
})