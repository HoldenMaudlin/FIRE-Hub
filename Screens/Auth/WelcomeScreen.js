import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Animated,
  Easing,
  AsyncStorage
} from 'react-native';
import { mainFillColor, mainColor, mainAccentColor } from "../../Styles/ColorConstants";
import MainBackHeader from '../../Components/MainBackHeader'

class WelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      welcomeUnderline: new Animated.Value(0)
    }
  }

  _animateUnderline() {
    Animated.timing(this.state.welcomeUnderline, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
    }).start()
  }

  _pressCreatePasscode() {
    this.props.navigation.navigate('CreatePasscode')
  }

  _pressNoPasscode(){
    AsyncStorage.setItem('isFirstLoad', 'false')
    this.props.navigation.navigate('App')
  }

  static navigationOptions={
    header: null
  }

  componentDidMount() {
    this._animateUnderline()
  }

  render() {
    const underline = this.state.welcomeUnderline.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 265],
    })
    return(
        <View style = {styles.container}>
          <View style = {styles.topContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/flamer.png')} style={{height: 200, width: 200, borderRadius: 100}} />
            </View>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.welcomeText}>Welcome to FIRE Hub!</Text>
            <Animated.View style={{backgroundColor: mainColor, width: underline, height: 2}}>
            </Animated.View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this._pressCreatePasscode() }>
              <Text style={styles.buttonText}>Create a passcode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._pressNoPasscode()}>
              <Text style={styles.alternateText}>Create a passcode later</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  midContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: mainFillColor,
  },
  alternateText: {
    color: mainAccentColor,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 28,
    color: mainColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  }
})