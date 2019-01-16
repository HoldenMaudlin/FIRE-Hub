/*
 * Summary.
 * Navigation flow for Main Drawer Navigator
 *
 * PROP   TYPE       NAME                REQ.     DESC
 * @prop  Screen     DisclaimerScreen    Yes      Disclaimer screen. No further stack
 * @prop  Screen     AboutFIREScreen     Yes      Brief description of FIRE. No further stack
 * @prop  StackNav   ToolsNavigator      Yes      Stack navigator for entire tool stack
 * @prop  TabNav     LinksTabNavigator   Yes      Main tab navigator for Links Drawer
 * 
 */

// Package imports
import React from 'react'
import { createDrawerNavigator  } from 'react-navigation'

// Screen imports
import DisclaimerScreen from '../Screens/Drawers/DisclaimerScreen'
import AboutFIREScreen from '../Screens/Drawers/AboutFIREScreen'
import ToolsNavigator from '../Navigation/ToolsNavigation'
import LinksTabNavigator from '../Navigation/LinksTabNavigation'
import DrawerContents from '../Navigation/DrawerContents'

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