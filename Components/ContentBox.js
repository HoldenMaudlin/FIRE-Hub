// Package imports
import React, { Component } from 'react'
import {
    View,
    Linking,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

// Style imports
import { mainAccentColor, mainFillColor, mainColor } from '../Styles/ColorConstants';

var {height, width} = Dimensions.get('window')


// DESC:
// Content box to be used by Books and Podcasts
class ContentBox extends Component {
    constructor(props) {
        super(props)
    
    }

    // Opens selected piece of content
    _onPressContent(URL){
        Linking.openURL(URL).catch(error =>
            console.log("Error opening content link: ", error)
        )
    }

    // Trims Author and Titles to prevent overflow
    _trimString(string){
        return string.split(/[|:-@--]/)[0]
    }

    render(){
        // Trim the author and title
        var name = this._trimString(this.props.name)
        var author = this._trimString(this.props.author)
        return(
            <View style ={styles.boxContainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => this._onPressContent(this.props.URL)}>        
                    <View style={styles.tileContainer}>
                        <View style={styles.imageContainer}> 
                            <Image style={{width: 200, height: 200, borderRadius: 10,}} source={{uri: this.props.image}}/>
                        </View>
                        <View style={styles.titleContainer}> 
                            <Text style={styles.nameText} numberOfLines={2} >
                                {name}
                            </Text>
                            <Text style={styles.authorText} numberOfLines={1}>
                                {author}
                            </Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text numberOfLines={7}>
                                {this.props.desc}
                            </Text>
                            <Text style={styles.viewMoreText}>
                                Tap to view more in {this.props.linkName}!
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>    
            </View>   
        )
    }
}

export default ContentBox

const styles = StyleSheet.create({
    
    // Containers
    boxContainer: {
        flexDirection: 'row',
        flex: 1,
        width: width,
        padding: 20,
    },
    // Main tile
    tileContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: mainFillColor,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    // Image holder
    imageContainer: {
        flex: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    // Holds title and author
    titleContainer: {
        flex: -1,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: mainAccentColor,
        paddingTop: 5,
    },
    // Holds description
    descContainer: {
        flex: 2,
        padding: 20,
        paddingTop: 15,
        paddingBottom: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'space-between'
    },

    // Text 
    nameText: {
        fontSize: 16,
        fontWeight: '500',
    },
    authorText: {
        fontSize: 14,
        fontWeight: '400',
        color: mainAccentColor,
    },
    viewMoreText: {
        textAlign: 'center',
        color: mainColor,
    }
})