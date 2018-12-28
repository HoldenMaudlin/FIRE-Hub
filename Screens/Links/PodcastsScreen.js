import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking
} from 'react-native';

import { 
    Header,
    Left,
    Icon,
  } from 'native-base';  
import { mainFillColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import { _fetchAPI } from '../../Components/Functions/FetchAPI'
import PodcastBox from '../../Components/PodcastBox'
import { ScrollView } from "react-native-gesture-handler";

const podcastsURL = 'https://itunes.apple.com/lookup?id=540593710,1187770032,1276912032,896153632'
const podcastsKey = 'data'

class PodcastsScreen extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    
    componentDidMount(){
        _fetchAPI.bind(this)(podcastsURL, podcastsKey)
    }

    _openURL(URL) {
        Linking.openURL(URL).catch(error => {
            console.log("Error: ", error)
        })
    }

    render() {
        const podcastData = this.state.data
        if (podcastData !== undefined) {
            var podcasts = []
            for(var i = 0; i < podcastData.resultCount; i++) {
                podcasts.push(
                    <PodcastBox 
                        key = {podcastData.results[i].trackId}
                        podcastAuthor = {podcastData.results[i].artistName} 
                        podcastName = {podcastData.results[i].trackName}
                        podcastURL = {podcastData.results[i].trackViewUrl}
                        podcastImage = {podcastData.results[i].artworkUrl600}
                    />
                )
            }
            return(
                <View style = {styles.container}>
                    <MainDrawerHeader title = 'Podcasts' navigation = {this.props.navigation}/>
                    <ScrollView style= {styles.container}>   
                        {podcasts}
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                    <ActivityIndicator size = 'small' color = {mainAccentColor} />
                </View>
            )
        } 
    }
}

export default PodcastsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  }
})