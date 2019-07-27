/*
 * Summary.
 * Navigation flow for Main Drawer Navigator
 *
 * PROP   TYPE       NAME                REQ.     DESC
 * @prop  Screen     BooksScreen         Yes      Books screen. No further screens
 * @prop  Screen     RedditScreen        Yes      Reddit screen. No further screens
 * @prop  Screen     PodcastScreen       Yes      Podcast screen. No furhter screens
 * @prop  Component  BotomTabIcon        Yes      Touchable icon for bottom tab nav
 * 
 */


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