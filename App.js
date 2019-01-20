import React from 'react'
import { View } from 'react-native'
import { createSwitchNavigator } from 'react-navigation'
import { AppLoading, Font} from 'expo'

import AuthLoadingScreen from './Screens/Auth/AuthLoadingScreen'
import AuthStackNavigator from './Navigation/AuthNavigation'
import MainDrawerNavigator from './Navigation/DrawerNavigation'

const MainSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: MainDrawerNavigator,
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  async componentWillMount(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({loading: false}) 
  }

  render() {
    if(this.state.loading) {
      return (
        <AppLoading/>
      )
    } else {
      return (
        <MainSwitchNavigator />
      )
    }
  }
}
