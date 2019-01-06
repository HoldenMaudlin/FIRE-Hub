import { createStackNavigator } from 'react-navigation'
import { AsyncStorage } from 'react-native'
import WelcomeScreen from '../Screens/Auth/WelcomeScreen'
import CreatePasscodeScreen from '../Screens/Auth/CreatePasscodeScreen'
import EnterPinScreen from '../Screens/Auth/EnterPinScreen'
import TermsScreen from '../Screens/Auth/TermsScreen'

initialRoute = async() => {
    return await AsyncStorage.getItem('UserPin').then((pin) => {
        return pin !== ''
    }).catch((err) => {
        console.log(err)
    })
}

const route = initialRoute()

const AuthStackNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    Terms: TermsScreen,
    CreatePasscode: CreatePasscodeScreen,
    EnterPin: EnterPinScreen
}, {
    initialRouteName: 'Welcome',
})

export default AuthStackNavigator