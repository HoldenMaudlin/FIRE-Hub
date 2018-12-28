import React from 'react'
import {ScrollView, SafeAreaView, View, Image} from 'react-native'

import { createDrawerNavigator, DrawerItems } from 'react-navigation'

import SettingsScreen from '../Screens/Drawers/SettingsScreen'
import AboutFIREScreen from '../Screens/Drawers/AboutFIREScreen'
import ToolsNavigator from '../Navigation/ToolsNavigation'
import LinksTabNavigator from '../Navigation/LinksTabNavigation'


const CustomDrawerComponent = (props) => (
    <SafeAreaView style ={{flex: 1}}>
        <View style={{height:150, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/flamer.png')} style={{height: 120, width: 120, borderRadius: 60}} />
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const MainDrawerNavigator = createDrawerNavigator({
    Tools: ToolsNavigator,
    Links: LinksTabNavigator,
    AboutFIRE: AboutFIREScreen,
    Settings: SettingsScreen,
},{
    contentComponent: CustomDrawerComponent
})

export default MainDrawerNavigator