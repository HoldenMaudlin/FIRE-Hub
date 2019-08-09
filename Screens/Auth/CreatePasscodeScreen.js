/*
 * 
 * SCREEN NOT IN USE BUILD v1.0.2
 * 
 */

// Package imports
import React, {Component} from "react"
import {
  View,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import PINCode from '@haskkor/react-native-pincode'

// Custom Imports
import MainBackHeader from '../../Components/MainBackHeader'

// Style imports
import { mainFillColor } from "../../Styles/ColorConstants";

// DESC:
// Screen allowing user to enter and confirm PINcode
class CreatePasscodeScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      passcode: ''
    }
  }

  static navigationOptions={
    header: null,
  }

  _inputPasscode(value) {
    this.setState({passcode: value})
  }

  // Stores pin locally to user's deivce
  _storePin = async(pin) => {
    try {
      await AsyncStorage.setItem('UserPin', pin)
      this.props.navigation.navigate('App')
    } catch (err) {
    }
  }

  render() {
    return(
        <View style = {styles.container}>
          <MainBackHeader title=''/>
          <View style={styles.contentContainer}>
            <PINCode timeLocked={1} status='choose' storePin={(pin) => this._storePin(pin)}/>
          </View>
        </View>
    )
  }
}

export default CreatePasscodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})