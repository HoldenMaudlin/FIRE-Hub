/*
 * Summary.
 * Regulate authentication flow to prevent user from returning to T&C
 *
 * PROP   TYPE          NAME                  REQ.     DESC
 * @prop  Screen        AuthLoadingScreen     Yes      Handles navigation logic
 * @prop  StackNav      AuthStackNavigator    Yes      Pre-authenticaiton stack
 * @prop  DrawerNav     MainDrawerNavigator   Yes      Post-authentication stack
 * 
 */

// Package imports
import { createSwitchNavigator } from 'react-native'

// Custom imports
import AuthLoadingScreen from '../Screens/Auth/AuthLoadingScreen'
import AuthStackNavigator from './AuthNavigation'
import MainDrawerNavigator from './DrawerNavigation'

const MainSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: MainDrawerNavigator,
})

export default MainSwitchNavigator 