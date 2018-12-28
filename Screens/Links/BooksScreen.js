import React, {Component} from "react"
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import { mainFillColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import { _fetchAPI } from "../../Components/Functions/FetchAPI";
import BookBox from '../../Components/BookBox'
import { ScrollView } from "react-native-gesture-handler";

const bookDataKey = 'data'
const bookURL = 'https://itunes.apple.com/lookup?id=967539199'


class BooksScreen extends Component {
    constructor(){
      super()
      this.state = {
        data: []
      }
    }
    componentDidMount(){
        _fetchAPI.bind(this)(bookURL, bookDataKey)
    }
    render() {
        const bookData = this.state.data
        if (bookData !== undefined) {
            var books = []
            for(var i = 0; i < bookData.resultCount; i++) {
              //console.log(bookData.results[i].description)
                books.push(
                    <BookBox
                        key = {bookData.results[i].trackId}
                        bookAuthor = {bookData.results[i].artistName} 
                        bookName = {bookData.results[i].trackName}
                        bookURL = {bookData.results[i].trackViewUrl}
                        bookImage = {bookData.results[i].artworkUrl100}
                        bookDescription = {bookData.results[i].description}
                    />
                )
            }
            return(
                <View style = {styles.container}>
                    <MainDrawerHeader title = 'Books' navigation = {this.props.navigation}/>
                    <ScrollView style = {styles.container}>
                        {books}
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

export default BooksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  }
})