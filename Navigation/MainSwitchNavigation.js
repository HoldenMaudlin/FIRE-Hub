// Package imports
import { createSwitchNavigator } from 'react-native'

// Custom imports
import AuthLoadingScreen from '../Screens/Auth/AuthLoadingScreen'
import AuthStackNavigator from './AuthNavigation'
import MainDrawerNavigator from './DrawerNavigation'

// DESC:
// This component regulates the Auth Flow of the app
const MainSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: MainDrawerNavigator,
})

export default MainSwitchNavigator 