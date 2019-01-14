// Package imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  AsyncStorage,
} from 'react-native';

// Style imports
import { mainFillColor, mainColor, mainAccentColor } from "../../Styles/ColorConstants";

// DESC:
// Screen user views on first download. Makes user accept Terms and Conditions
class WelcomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      welcomeUnderline: new Animated.Value(0),
      display: false,
      termsViewed: false,
      warningTextColor: mainAccentColor,
    }
  }

  // Animates underline of FireHub
  _animateUnderline() {
    Animated.timing(this.state.welcomeUnderline, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
    }).start()
  }

  // Track if user has viewed terms
  _pressTerms() {
    this.props.navigation.navigate('Terms')
    this.setState({termsViewed: true})
  }

  // Logic to determine if user can advance to app
  _pressAgree = async() => {
    if(this.state.termsViewed) {
      await AsyncStorage.setItem('hasAcceptedTerms', 'true')
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Terms')
      this.setState({termsViewed: true})
    }
  }

  // Functions for when passcode is implemented
  _pressCreatePasscode() {
    this.props.navigation.navigate('CreatePasscode')
  }

  // FUNCTION FOR LATER USE
  _pressNoPasscode(){
    AsyncStorage.setItem('isFirstLoad', 'false')
    this.props.navigation.navigate('App')
  }

  // Prevents native header from showing
  static navigationOptions={
    header: null
  }

  componentDidMount() {
    this._animateUnderline()
  }

  // Closes overlay display
  onClose = () => this.setState({ display: false});

  render() {
    // Informs user to view T&C
    const warningText1 = "Please view the "
    const termsText = "Terms & Conditions" 
    const warningText2 = " before advancing!"
    
    // Interpolation for underline animation
    const underline = this.state.welcomeUnderline.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 265],
    })
    return(
        <View style = {styles.container}>
          <View style = {styles.topContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/flamemint.png')} style={{height: 200, width: 200, borderRadius: 100}} />
            </View>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.welcomeText}>Welcome to FIRE Hub!</Text>
            <Animated.View style={{backgroundColor: mainColor, width: underline, height: 2}}>
            </Animated.View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.warningText}>
              <Text>{warningText1}</Text>
              <Text style={styles.termsText} onPress={() => this._pressTerms()}>{termsText}</Text>
              <Text>{warningText2}</Text>
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => this._pressAgree() }>
              <Text style={styles.buttonText}>I Agree</Text>
            </TouchableOpacity>
          </View>
          {/* Code for Add Passcode when feature is available}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this._pressCreatePasscode() }>
              <Text style={styles.buttonText}>Create a passcode</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._pressNoPasscode()}>
              <Text style={styles.alternateText}>Create a passcode later</Text>
            </TouchableOpacity>
          </View>
          {*/}
        </View>
    )
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
  // FIRE Hub Logo part of screen
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  // FIRE Hub Text
  welcomeText: {
    fontSize: 28,
    color: mainColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  // FIRE Hub title part of screen
  midContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  // Button and Terms part of screen
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  // Logo image container
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 'I Agree' Button styling
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
    margin: 20,
  },
  buttonContainer: {
    height: 40,
    width: 80,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 'I Agree' button text
  buttonText: {
    color: mainFillColor,
  },
  // Style for Future create a passcode screen
  alternateText: {
    color: mainAccentColor,
    marginTop: 10,
  },
  termsText: {
    color: mainColor,
    textDecorationLine: 'underline',
  },
  // 'View T&C' Text
  warningText: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    color: mainAccentColor,
    textAlign: 'center'
  },
})  