import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import BottomTabIcon from '../Components/TabBarIcon'
import BooksScreen from '../Screens/Links/BooksScreen'
import RedditScreen from '../Screens/Links/RedditScreen'
import PodcastsScreen from '../Screens/Links/PodcastsScreen'
import { mainColor, mainAccentColor } from '../Styles/ColorConstants';
 

const LinksTabNavigator = createBottomTabNavigator ({
      Reddit:{
        screen: RedditScreen,
        navigationOptions:{
          tabBarLabel: 'Forums',
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon name = "reddit" type = "material-community" focused = {focused} />
          )
        }
      },
      Books: {
        screen: BooksScreen,
        navigationOptions:{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon name ="book-open-variant" type ="material-community" focused = {focused} />
          )
        }
      },
      Podcasts: {
        screen: PodcastsScreen,
        navigationOptions:{
          tabBarIcon: ({ focused }) => (
            <BottomTabIcon name ="podcast" type ="material-community" focused = {focused} />
          )
        }
      },
    },
    {
      tabBarOptions: {
        activeTintColor: mainColor,
        inactiveTintColor: mainAccentColor,
      },
    }
  )

export default LinksTabNavigator