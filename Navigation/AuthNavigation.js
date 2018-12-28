import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from '../Screens/Auth/WelcomeScreen'
import SignInScreen from '../Screens/Auth/SignInScreen'
import SignUpScreen from '../Screens/Auth/SignUpScreen'

const AuthStackNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen
})

export default AuthStackNavigator