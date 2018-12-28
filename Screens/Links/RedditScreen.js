import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

import RedditBox from '../../Components/RedditBox'

import { Icon } from 'react-native-elements'

import MainDrawerHeader from "../../Components/MainDrawerHeader";
import { _fetchAPI } from '../../Components/Functions/FetchAPI'
import { mainAccentColor, mainColor, mainFillColor } from "../../Styles/ColorConstants";
import Collapsible from 'react-native-collapsible'

var {height, width } = Dimensions.get('window')

const fiURL = 'https://www.reddit.com/r/financialindependence.json'
const dataStateKey = 'data'

//const AnimatedRedditBox = Animated.createAnimatedComponent(RedditBox)

class RedditScreen extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  
  componentDidMount(){
    _fetchAPI.bind(this)(fiURL, dataStateKey);
  }
  
  render() {
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
          //const key = fiData.children[i].data.
          authors.push(
            <RedditBox delay = {i} key = {id} url = {url} ups = {ups} title = {title} body = {body}/>
          )
        }
      }     
      return(
          <View style = {styles.scrollContainer}>
            <MainDrawerHeader title = 'Forums' navigation = {this.props.navigation} />
            <ScrollView style = {styles.scrollContainer}>
              {authors}
            </ScrollView>
          </View>
      )
    } else {
      return (
        <View style = {{flex: 1,}} >
          <MainDrawerHeader title= 'Forums' navigation = {this.props.navigation}/>
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
  scrollContainer: {
    flex:1,
  },
})