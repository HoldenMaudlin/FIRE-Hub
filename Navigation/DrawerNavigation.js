// Package imports
import React from 'react'
import { createDrawerNavigator  } from 'react-navigation'

// Screen imports
import DisclaimerScreen from '../Screens/Drawers/DisclaimerScreen'
import AboutFIREScreen from '../Screens/Drawers/AboutFIREScreen'
import ToolsNavigator from '../Navigation/ToolsNavigation'
import LinksTabNavigator from '../Navigation/LinksTabNavigation'
import DrawerContents from '../Navigation/DrawerContents'

// Main drawer navigator for app
// Acessible from menu item or dragging from left anywhere in app
const MainDrawerNavigator = createDrawerNavigator({
    // Navigation config for the navigator
    Tools: {
        screen: ToolsNavigator,
    },
    Links: LinksTabNavigator,
    AboutFIRE: AboutFIREScreen,
    Disclaimer: DisclaimerScreen,
},{
    // Styling for the drawer slide out component
    contentComponent: ({ navigation }) => (
        <DrawerContents navigation={navigation} />
      ),
})

export default MainDrawerNavigator