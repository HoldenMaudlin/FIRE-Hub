/*
 * Summary.
 * Navigation stack for pre-authentication.
 * 
 * Description.
 * Handles navigation between screens before user agrees to the Terms
 * and Conditions and Privacy Policy.
 *
 * PROP   TYPE       NAME             REQ.     DESC
 * @prop  Screen     WelcomeScreen    Yes      First screen shown to user.
 * @prop  Screen     TermsScreen      Yes      Terms & conditions screen
 * @prop  Screen     CreatePasscode   NO       NOT USED IN v1.0.2
 * @prop  Screen     EnterPin         NO       NOT USED IN v1.0.2
 * 
 */

// Package imports
import { createStackNavigator } from 'react-navigation'
import { AsyncStorage } from 'react-native'

// Screen imports
import WelcomeScreen from '../Screens/Auth/WelcomeScreen'
import TermsScreen from '../Screens/Auth/TermsScreen'
//import CreatePasscodeScreen from '../Screens/Auth/CreatePasscodeScreen'
//import EnterPinScreen from '../Screens/Auth/EnterPinScreen'

// Function NOT IN USE
// For regulation of PINcode access in future update 
initialRoute = async() => {
    return await AsyncStorage.getItem('UserPin').then((pin) => {
        return pin !== ''
    }).catch((err) => {
    })
}

// Navigator for all PRE-Authentication screens
const AuthStackNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    Terms: TermsScreen,
    //CreatePasscode: CreatePasscodeScreen,
    //EnterPin: EnterPinScreen
}, {
    initialRouteName: 'Welcome',
})

export default AuthStackNavigator