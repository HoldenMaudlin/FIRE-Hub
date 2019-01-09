// Package imports
import React, {Component} from "react"
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";

// DESC:
// First screen loaded: shown until app loads and navigates to different screen 
class AuthLoadingScreen extends Component {
  
  constructor() {
    super()
    this._loadApp();
  }

  // Function to route app to correct path
  _loadApp = async() => {
    const firstLoad = await AsyncStorage.getItem('hasAcceptedTerms')
    this.props.navigation.navigate(firstLoad !== 'true' ? 'Auth' : 'App')
  }

  // Display loading screen until completed
  render() {
    return (
      <View style = {styles.container}>
        <ActivityIndicator />
      </View>
    )
  }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})