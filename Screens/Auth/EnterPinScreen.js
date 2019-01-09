// Screen NOT IN USE
// Screen will be added in next version of App

import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Button
} from 'react-native';
import PINCode from '@haskkor/react-native-pincode'
import { mainFillColor } from "../../Styles/ColorConstants";
import TouchID from "react-native-touch-id";

class EnterPinScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      pin: ''
    }
  }

  static navigationOptions={
    header: null
  }

  _pressHandler() {
    TouchID.authenticate('to demo this react-native component')
      .then(success => {
        alert('Authenticated Successfully');
      })
      .catch(error => {
        alert(error, 'Authentication Failed');
      });
  }

  componentDidMount() {
    AsyncStorage.getItem('UserPin').then((pin) => {
      this.setState({pin: pin})
      console.log(pin)
    }).done()
  }

  render() {
    return(
        <View style = {styles.container}>
          <PINCode timeLocked={1} status='enter' storedPin={this.state.pin} finishProcess={() => {this.props.navigation.navigate('App')}} />
          <Button title='Touch ID' onPress={() => this._pressHandler()}/>
        </View>
    )
  }
}

export default EnterPinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
    alignItems: 'center',
    justifyContent: 'center',
  }
})