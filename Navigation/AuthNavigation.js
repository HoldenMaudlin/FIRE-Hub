import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from '../Screens/Auth/WelcomeScreen'
import CreatePasscodeScreen from '../Screens/Auth/CreatePasscodeScreen'
import SignUpScreen from '../Screens/Auth/SignUpScreen'

const AuthStackNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    CreatePasscode: CreatePasscodeScreen,
    SignUp: SignUpScreen
})

export default AuthStackNavigator