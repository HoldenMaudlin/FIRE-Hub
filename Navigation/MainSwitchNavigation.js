import { createSwitchNavigator } from 'react-native'

import AuthLoadingScreen from '../Screens/Auth/AuthLoadingScreen'
import AuthStackNavigator from './AuthNavigation'
import MainDrawerNavigator from './DrawerNavigation'

const MainSwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: MainDrawerNavigator,
})

export default MainSwitchNavigator 