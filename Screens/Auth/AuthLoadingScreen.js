import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";

class AuthLoadingScreen extends Component {
  
  constructor() {
    super()
    this.loadApp();
  }

  loadApp = async() => {
    const firstLoad = await AsyncStorage.getItem('isFirstLoadLLLLLLL')
    this.props.navigation.navigate(firstLoad !== 'false' ? 'Auth' : 'App')
  }

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