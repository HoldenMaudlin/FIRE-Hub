import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { 
    Header,
    Left,
    Icon,
  } from 'native-base';  
import HelpView from '../../Components/HelpView'
import { mainFillColor, mainAccentColor, mainColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import { _fetchAPI } from '../../Components/Functions/FetchAPI'
import ContentBox from '../../Components/ContentBox'
import GenreButton from '../../Components/GenreButton'
import { ScrollView } from "react-native-gesture-handler";

// URL constants and blocks to fetch JSON data from iTunes API
const featuredURL = 'https://itunes.apple.com/lookup?id=540593710,1187770032,1276912032,896153632'
const genreBaseURL = 'https://itunes.apple.com/us/rss/toppodcasts/genre='
const genreURLS = {
    investing: '1412/json',
    careers: '1410/json',
    news: '1471/json',
    marketing: '1413/json',
    shopping: '1472/json',
}

// Keys to access data states
const genreKeys = {
    investing: 'investingData',
    featured: 'featuredData',
    careers: 'careersData',
    news: 'newsData',
    marketing: 'marketingData',
    shopping: 'shoppingData'
}

class PodcastsScreen extends Component {
    constructor() {
        super()
        this.state = {
            // Display activity indicator until component loads all data
            mounted: false,

            // Store Podcast JSON data for different genres
            featuredData: [],
            investingData: [],
            careersData: [],
            newsData: [],
            marketingData: [],
            shoppingData: [],

            // Keys to determine which set of data is shown to user
            featured: true,
            investing: false,
            careers: false,
            news: false,
            marketing: false,
            shopping: false,
        }
    }
    
    componentWillMount(){
        // Fetch JSON data for all genres and bind to state variables
        _fetchAPI.bind(this)(featuredURL, genreKeys.featured)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.investing, genreKeys.investing)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.careers, genreKeys.careers)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.news, genreKeys.news)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.marketing, genreKeys.marketing)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.shopping, genreKeys.shopping)
        this.setState({mounted: true})
    }

    // Function to pass to Genre Button component to set state of this screen
    _setState(stateKey){
        for (state in this.state) {
            if (this.state[state] === true && state !== 'mounted') {
                this.setState({[state]: false})
                this.setState({[stateKey]: true})
                break;
            }
        }
    }

    render() {
        // Information to be passed to the Reddit Help Screen
        const helpLines = [
            { key: 1, icon: 'menu', iconType: '', text: 'Tap on the Menu Button to navigate to another screen!',},
            { key: 2, icon: 'gesture-swipe-left', iconType: 'material-community', text: 'Swipe to view more podcasts!',},
            { key: 3, icon: 'podcast', iconType: 'material-community', text: "Tap a podcast to view it in Podcasts!",},
            { key: 4, icon: 'gesture-tap', iconType: 'material-community', text: "Tap a category to change the genre of podcasts!",},
        ]
        var helpView = <HelpView helpLines={helpLines}/>

        // Checks state booleans to determine which JSON data to pass to parsing
        var podcastData = []
        for (state in this.state) {
            if (this.state[state] === true && state !== 'mounted') {
                podcastData = this.state[state + 'Data']
            }
        }
        
        // Parsing for JSON data retrieved by Genre tag
        if (!this.state.featured) {
            if (podcastData.feed !== undefined) {
                var podcasts = []
                for (var i = 0; i < podcastData.feed.entry.length; i++) {    
                    var imgLen = podcastData.feed.entry[i]['im:image'].length
                    podcasts.push(              
                        <ContentBox
                            key = {podcastData.feed.entry[i].id.attributes['im:id']}
                            author = {podcastData.feed.entry[i]['im:artist'].label} 
                            name = {podcastData.feed.entry[i].title.label}
                            URL = {podcastData.feed.entry[i].id.label}
                            image = {podcastData.feed.entry[i]['im:image'][imgLen - 1].label}
                            desc = {podcastData.feed.entry[i].summary.label}
                        />
                    )
                }
            }
        // Parsing for JSON data for featured podcasts
        } else {    
            if (podcastData !== undefined) {
                var podcasts = []
                for(var i = 0; i < podcastData.resultCount; i++) {
                    podcasts.push(
                        <ContentBox 
                            key = {podcastData.results[i].trackId}
                            author = {podcastData.results[i].artistName} 
                            name = {podcastData.results[i].trackName}
                            URL = {podcastData.results[i].trackViewUrl}
                            image = {podcastData.results[i].artworkUrl600}
                        />
                    )
                }
            }
        }

        // Checks if data has finished loading
        if (this.state.mounted && podcastData !== undefined) {
            return(
                <View style = {styles.container}>
                    <MainDrawerHeader title = 'Podcasts' navigation = {this.props.navigation} helpView={helpView}/>
                    <View style={styles.scrollContainer}>
                        <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={true} style= {styles.container}>   
                            {podcasts}
                        </ScrollView>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={{fontSize: 16}}>Categories</Text>
                        <View style={styles.topCategories}>
                            <GenreButton active={this.state.featured} name='Featured' stateKey='featured' _setState={this._setState.bind(this)}/>
                            <GenreButton active={this.state.investing} name='Investing' stateKey='investing' _setState={this._setState.bind(this)}/>
                            <GenreButton active={this.state.careers} name='Careers' stateKey='careers' _setState={this._setState.bind(this)}/>
                        </View>
                        <View style={styles.bottomCategories}>
                            <GenreButton active={this.state.marketing} name='Marketing' stateKey='marketing' _setState={this._setState.bind(this)}/>
                            <GenreButton active={this.state.news} name='News' stateKey='news' _setState={this._setState.bind(this)}/>
                            <GenreButton active={this.state.shopping} name='Shopping' stateKey='shopping' _setState={this._setState.bind(this)}/>
                        </View>
                    </View>
                </View>
            )
        } else {
            // Loading screen while data loads
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
    // Entire screen
    container: {
        flex: 1,
        backgroundColor: mainFillColor,
    },
    // Horizontal paginated (sp? lol ) scroll container
    scrollContainer: {
        flex: 3.5,
        backgroundColor: mainFillColor,
    },
    // Category button container 
    categoryContainer: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: mainAccentColor,
    },
    // Container for top butotns
    topCategories: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // Container for bottom buttons
    bottomCategories: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }
})