/*
 * Summary.
 * Loading screen that handles auth logic
 *
 * Return.
 * Navigates to Auth if user HAS NOT accepted Terms
 * Navigates to App  if user HAS accepted Terms
 * 
 */

// Package imports
import React, {Component} from "react"
import {
  View,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import { Font } from 'expo'

class AuthLoadingScreen extends Component {
  
  constructor() {
    super()
    this.state = {
      loading: false,
    }
    this._loadApp()
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