import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  TextInput,
} from 'react-native';
import MainBackHeader from '../../Components/MainBackHeader'
import { mainFillColor } from "../../Styles/ColorConstants";
import PINCode from '@haskkor/react-native-pincode'

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

  _storePin = async(pin) => {
    try {
      await AsyncStorage.setItem('UserPin', pin)
      this.props.navigation.navigate('App')
    } catch (err) {
      console.log(err)
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