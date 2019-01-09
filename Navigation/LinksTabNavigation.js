// Package imports
import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

// Custome Imports
import BottomTabIcon from '../Components/TabBarIcon'
import BooksScreen from '../Screens/Links/BooksScreen'
import RedditScreen from '../Screens/Links/RedditScreen'
import PodcastsScreen from '../Screens/Links/PodcastsScreen'

// Style imports
import { mainColor, mainAccentColor } from '../Styles/ColorConstants';
 
// DESC:
// Bottom Tab Navigator for the Links Tool
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
      // Highlights actie tab
      tabBarOptions: {
        activeTintColor: mainColor,
        inactiveTintColor: mainAccentColor,
      },
    }
  )

export default LinksTabNavigator