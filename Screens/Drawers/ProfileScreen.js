import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { 
  Header,
  Left,
  Icon,
} from 'native-base';  
import { mainFillColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'

class ProfileScreen extends Component {
  render() {
      return(
        <View style = {styles.container}>
            <MainDrawerHeader title = 'Profile' navigation = {this.props.navigation}/>
        <Text> This is the Profile Screen </Text>
    </View>
      )
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  }
})