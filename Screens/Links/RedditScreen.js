import React, {Component} from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

// Custom Imports
import RedditBox from '../../Components/RedditBox'
import HelpView from '../../Components/HelpView'
import MainDrawerHeader from "../../Components/MainDrawerHeader"
import { _fetchAPI } from '../../Components/Functions/FetchAPI'

// Styling imports
import { mainAccentColor, mainColor, mainFillColor } from "../../Styles/ColorConstants"

// URL to fetch data from
const fiURL = 'https://www.reddit.com/r/financialindependence.json'
const dataStateKey = 'data'

// DESC:
// Main screen which loads and displays posts from reddit.com/r/financialindependence
class RedditScreen extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  
  // Fetch the data
  componentDidMount(){
    _fetchAPI.bind(this)(fiURL, dataStateKey);
  }
  
  render() {
    // Information to be passed to the Reddit Help Screen
    const helpLines = [
      { key: 1, icon: 'menu', iconType: '', text: 'Tap the Menu Button to navigate to another screen!',},
      { key: 2, icon: 'hand-pointing-left', iconType: 'material-community', text: 'Or slide from the left!',},
      { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Tap a post's title to view the contents!",},
      { key: 4, icon: 'logo-reddit', iconType: 'ionicon', text: "Tap 'View Post' to open the post in Reddit!",},
    ]
    var helpView = <HelpView helpLines={helpLines}/>

    // Parse data from fetched Reddit JSON data
    const fiData = this.state.data.data
    if(fiData !== undefined) {
      var authors = []
      for (var i = 0; i < fiData.children.length; i++) {
        if(!fiData.children[i].data.stickied && fiData.children[i].data.ups > 10) {
          const url = fiData.children[i].data.url
          const ups = fiData.children[i].data.ups
          const title = fiData.children[i].data.title
          const id = fiData.children[i].data.id
          const body = fiData.children[i].data.selftext
          // Add post to array of posts
          authors.push(
            <RedditBox delay = {i} key = {id} url = {url} ups = {ups} title = {title} body = {body}/>
          )
        }
      }
      // Return content if it is available     
      return(
          <View style = {styles.container} >
            <MainDrawerHeader title = 'Forums' navigation = {this.props.navigation} helpView={helpView} />
            <ScrollView style = {styles.scrollContainer}>
              {authors}
            </ScrollView>
          </View>
      )
    } else {
      // Return activity indicator while content is loaded
      return (
        <View style = {{flex: 1,}} >
          <MainDrawerHeader title= 'Forums' navigation = {this.props.navigation} helpView={helpView} />
          <View style ={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
            <ActivityIndicator size = 'small' color = {mainAccentColor} />
          </View>
        </View>
      )
    }
  }
}

export default RedditScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scrollContainer: {
    flex: 1,
  }
})