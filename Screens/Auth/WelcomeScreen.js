import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Easing,
  AsyncStorage,
  Linking
} from 'react-native';
import { mainFillColor, mainColor, mainAccentColor } from "../../Styles/ColorConstants";
import MainBackHeader from '../../Components/MainBackHeader'
import Overlay from 'react-native-modal-overlay';
import { ScrollView } from "react-native-gesture-handler";

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
      this.setState({warningTextColor: mainColor})
    }
  }

  // Functions for when passcode is implemented
  _pressCreatePasscode() {
    this.props.navigation.navigate('CreatePasscode')
  }

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
    const warningText = "Please view the Terms & Conditions before advancing!"
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
            <Text style={[styles.warningText, {color: this.state.warningTextColor}]}>{warningText}</Text>
            <TouchableOpacity style={styles.button} onPress={() => this._pressAgree() }>
              <Text style={styles.buttonText}>I Agree</Text>
            </TouchableOpacity>
            <Text style={styles.termsText} onPress={() => this._pressTerms()}>Terms & Conditions</Text>
          </View>

          {/*}
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
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
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
    margin: 20,
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
  },
  termsText: {
    color: 'blue',
    textDecorationLine: 'underline',
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
  warningText: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  header: {
    color: mainColor,
    fontSize: 32, 
    marginTop: 10,
  },
  body: {
    marginTop: 10,
  },
  link: {
      color: 'blue'
  }
})  