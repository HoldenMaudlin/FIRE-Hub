import React from 'react'
import { StyleSheet } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import AuthLoadingScreen from './Screens/Auth/AuthLoadingScreen'
import AuthStackNavigator from './Navigation/AuthNavigation'
import MainDrawerNavigator from './Navigation/DrawerNavigation'

const MainSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: MainDrawerNavigator,
})

export default class App extends React.Component {
  render() {
    return (
        <MainSwitchNavigator />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
