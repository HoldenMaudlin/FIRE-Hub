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

  _pressGo = async() => {
    if(this.state.passcode !== '') {
      try {
        await AsyncStorage.setItem('userPasscode', this.state.passcode + '')
      } catch (err) {
        console.log('Error setting passcode: ', err)
      }
      this.props.navigation.navigate('App')
    }
  }

  render() {
    return(
        <View style = {styles.container}>
          <MainBackHeader title=''/>
          <View style={styles.contentContainer}>
            <TextInput placeholder = "4 Digits" keyboardType='numeric' onChangeText={(value) => this._inputPasscode(value)}/>
            <Button title='Go' onPress={() => this._pressGo()}/>
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