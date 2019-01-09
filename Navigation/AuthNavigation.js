// Package imports
import { createStackNavigator } from 'react-navigation'
import { AsyncStorage } from 'react-native'

// Screen imports
import WelcomeScreen from '../Screens/Auth/WelcomeScreen'
import CreatePasscodeScreen from '../Screens/Auth/CreatePasscodeScreen'
import EnterPinScreen from '../Screens/Auth/EnterPinScreen'
import TermsScreen from '../Screens/Auth/TermsScreen'

// Function NOT IN USE
// For regulation of PINcode access in future update 
initialRoute = async() => {
    return await AsyncStorage.getItem('UserPin').then((pin) => {
        return pin !== ''
    }).catch((err) => {
        console.log(err)
    })
}

// Navigator for all PRE-Authentication screens
const AuthStackNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    Terms: TermsScreen,
    CreatePasscode: CreatePasscodeScreen,
    EnterPin: EnterPinScreen
}, {
    initialRouteName: 'Welcome',
})

export default AuthStackNavigator