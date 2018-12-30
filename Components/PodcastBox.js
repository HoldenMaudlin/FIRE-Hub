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
import { mainAccentColor, mainFillColor } from '../Styles/ColorConstants';

var {height, width} = Dimensions.get('window')

class PodcastBox extends Component {
    constructor(props) {
        super(props)
    
    }

    _onPressPodcast(URL){
        Linking.openURL(URL).catch(error =>
            console.log("Error opening podcast link: ", error)
        )
    }

    _trimString(string){
        return string.split(/[:-@--]/)[0]
    }

    render(){
        var podcastName = this._trimString(this.props.podcastName)
        var podcastAuthor = this._trimString(this.props.podcastAuthor)
        return(
            <View style ={styles.boxContainer}>
                <TouchableOpacity style={{flex:1}} onPress={() => this._onPressPodcast(this.props.podcastURL)}>        
                    <View style={styles.tileContainer}>
                        <View style={styles.imageContainer}> 
                            <Image style={{width: 200, height: 200, borderRadius: 10,}} source={{uri: this.props.podcastImage}}/>
                        </View>
                        <View style={styles.titleContainer}> 
                            <Text style={styles.podcastNameText} >
                                {podcastName}
                            </Text>
                            <Text style={styles.podcastAuthorText}>
                                {podcastAuthor}
                            </Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text numberOfLines={7}>
                                {this.props.podcastDesc}
                            </Text>
                            <Text>
                                Tap to view more in Podcasts!
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>    
            </View>   
        )
    }
}

export default PodcastBox

const styles = StyleSheet.create({
    
    // Containers
    boxContainer: {
        flexDirection: 'row',
        flex: 1,
        width: width,
        padding: 20,
    },
    tileContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: mainFillColor,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,

    },
    imageContainer: {
        flex: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        flex: -1,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: mainAccentColor,
        paddingTop: 5,
    },
    descContainer: {
        flex: 2,
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'space-between'
    },

    // Text 
    podcastNameText: {
        fontSize: 16,
        fontWeight: '500',
    },
    podcastAuthorText: {
        fontSize: 14,
        fontWeight: '400',
        color: mainAccentColor,
    }
})