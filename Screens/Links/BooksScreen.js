// Package imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';

// Custom Imports
import HelpView from '../../Components/HelpView'
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import { _fetchAPI, _setState } from '../../Components/Functions/FetchAPI'
import ContentBox from '../../Components/ContentBox'
import GenreButton from '../../Components/GenreButton'

// Style imports
import { mainFillColor, mainAccentColor, mainColor } from "../../Styles/ColorConstants";

// URL for iTunes lookup of Featured Books Category
const featuredURL = 'https://itunes.apple.com/lookup?id=967539199,364902571,1342443152'
// Base URL for genre categories
const genreBaseURL = 'https://itunes.apple.com/us/rss/topebooks/genre='

// URL appenders for each genre
const genreURLS = {
    investing: '10012/json',
    careers: '10010/json',
    economics: '10011/json',
    leadership: '10014/json',
    personalFinance: '10008/json',
}

// Book Genre state keys
const genreKeys = {
    featured: 'featuredData',
    personalFinance: 'personalFinanceData',
    investing: 'investingData',
    economics: 'economicsData',
    careers: 'careersData',
    leadership: 'leadershipData',
}

// DESC:
// This screen displays tiles of books based on a user selected genre
class BooksScreen extends Component {
    constructor(){
        super()
        this.state = {
            // Display activity indicator until component loads all data
            mounted: false,

            // Store Book JSON data for different genres
            featuredData: [],
            investingData: [],
            careersData: [],
            economicsData: [],
            leadershipData: [],
            personalFinanceData: [],

            // Determines which category of books will be shown
            featured: true,
            investing: false,
            careers: false,
            economics: false,
            leadership: false,
            personalFinance: false,
        }
    }
    componentDidMount(){
        // Fetch JSON data for all genres and bind to state variables
        _fetchAPI.bind(this)(featuredURL, genreKeys.featured)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.investing, genreKeys.investing)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.careers, genreKeys.careers)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.economics, genreKeys.economics)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.leadership, genreKeys.leadership)
        _fetchAPI.bind(this)(genreBaseURL + genreURLS.personalFinance, genreKeys.personalFinance)
        this.setState({mounted: true})
    }

    render() {
        // Information to be passed to the Reddit Help Screen
        const helpLines = [
            { key: 1, icon: 'menu', iconType: '', text: 'Tap on the Menu Button to navigate to another screen!',},
            { key: 2, icon: 'gesture-swipe-left', iconType: 'material-community', text: 'Swipe to view more books!',},
            { key: 3, icon: 'book-open-variant', iconType: 'material-community', text: "Tap a podcast to view it in iBooks!",},
            { key: 4, icon: 'gesture-tap', iconType: 'material-community', text: "Tap a category to change the genre of books!",},
        ]
        var helpView = <HelpView helpLines={helpLines}/>
        
        // Checks state booleans to determine which JSON data to pass to parsing
        var bookData = []
        for (state in this.state) {
            if (this.state[state] === true && state !== 'mounted') {
                bookData = this.state[state + 'Data']
            }
        }

        // Parsing for iTunes lookup data for featured genre
        if (!this.state.featured) {
            if (bookData.feed !== undefined) {
                var books = []
                for (var i = 0; i < bookData.feed.entry.length; i++) {    
                    var imgLen = bookData.feed.entry[i]['im:image'].length
                    books.push(              
                        <ContentBox
                            key = {bookData.feed.entry[i].id.attributes['im:id']}
                            author = {bookData.feed.entry[i]['im:artist'].label} 
                            name = {bookData.feed.entry[i].title.label}
                            URL = {bookData.feed.entry[i].id.label}
                            image = {bookData.feed.entry[i]['im:image'][imgLen - 1].label}
                            desc = {bookData.feed.entry[i].summary.label}
                            linkName = 'iBooks'
                        />
                    )
                }
            }
        // Parsing for iTunes genre data
        } else {
            if (bookData !== undefined) {
                var books = []
                for(var i = 0; i < bookData.resultCount; i++) {
                    var image = (bookData.results[i].artworkUrl600 ? bookData.results[i].artworkUrl600 : bookData.results[i].artworkUrl100)
                    books.push(
                        <ContentBox 
                            key = {bookData.results[i].trackId}
                            author = {bookData.results[i].artistName} 
                            name = {bookData.results[i].trackName}
                            URL = {bookData.results[i].trackViewUrl}
                            desc = {bookData.results[i].description.replace(/<.*>/, '')}
                            image = {image}
                            linkName = 'iBooks'
                        />
                    )
                }
            }
        }
        // Returns books once data has been loaded
        if (bookData !== undefined && this.state.mounted) {
            return(
                <View style = {styles.container}>
                    <MainDrawerHeader title = 'Books' navigation = {this.props.navigation} helpView={helpView}/>
                    <View style={styles.scrollContainer}>
                        <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                            {books}
                        </ScrollView>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={{fontSize: 16}}>Categories</Text>
                        <View style={styles.topCategories}>
                            <GenreButton active={this.state.featured} name='Featured' stateKey='featured' _setState={_setState.bind(this)}/>
                            <GenreButton active={this.state.investing} name='Investing' stateKey='investing' _setState={_setState.bind(this)}/>
                            <GenreButton active={this.state.personalFinance} name='Per. Finance' stateKey='personalFinance' _setState={_setState.bind(this)}/>
                        </View>
                        <View style={styles.bottomCategories}>
                            <GenreButton active={this.state.careers} name='Careers' stateKey='careers' _setState={_setState.bind(this)}/>
                            <GenreButton active={this.state.economics} name='Economics' stateKey='economics' _setState={_setState.bind(this)}/>
                            <GenreButton active={this.state.leadership} name='Leadership' stateKey='leadership' _setState={_setState.bind(this)}/>
                        </View>
                    </View>
                </View>
            )

        // Loading screen while component loads data
        } else {
              return (
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                    <ActivityIndicator size = 'small' color = {mainAccentColor} />
                </View>
            )
        }
    }
}

export default BooksScreen;

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: mainFillColor,
    },
    scrollContainer: {
        flex: 3.5,
        backgroundColor: mainFillColor,
    },
    // Category Buttons
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