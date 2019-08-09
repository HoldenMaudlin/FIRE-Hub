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
import { encode } from 'base-64';

const newUserEndpoint = 'http://firehub-backend-dev.5jds93y2cg.us-west-2.elasticbeanstalk.com/signup/newuser';
const requestObject = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic '+encode('13po78903yjksjfkhhgt8730jklq'), 
  },
  body: JSON.stringify({
    'client_id': 'irrelevant',
  })
}

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
    const firstLoad = await AsyncStorage.getItem('hasAcceptedTerms');
    const clientId = await AsyncStorage.getItem('clientId');
    // Assign unqiue client ID for new user
    if (!clientId) {
      fetch(newUserEndpoint, requestObject)
        .then((response) => {
          AsyncStorage.setItem('clientId', response._bodyText);
        })
        .done();
    }
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