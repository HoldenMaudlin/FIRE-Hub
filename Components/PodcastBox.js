import React, { Component } from 'react'
import {
    View,
    Linking,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { mainAccentColor } from '../Styles/ColorConstants';

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
        return string.split(/[:-@]/)[0]
    }

    render(){
        var podcastName = this._trimString(this.props.podcastName)
        var podcastAuthor = this._trimString(this.props.podcastAuthor)
        return(
            <TouchableOpacity onPress={() => this._onPressPodcast(this.props.podcastURL)} style={{alignItems: 'stretch'}}>        
                <View style ={styles.boxContainer}>
                    <View style = {styles.imageContainer}>
                        <Image resizeMode='contain' style={styles.imageStyle} source={{uri: this.props.podcastImage}}/>
                    </View>
                    <View style={styles.contentContainer}>  
                        <Text style={styles.titleText}>{podcastName}</Text>
                        <Text style={styles.authorText}>{podcastAuthor}</Text>
                    </View>
                </View>
            </TouchableOpacity>            
        )
    }
}

export default PodcastBox

const styles = StyleSheet.create({
    boxContainer: {
        flexDirection: 'row',
        height: 120,
        borderBottomWidth: 1,
        borderBottomColor: mainAccentColor,
        padding: 5,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        color: 'black',
        fontSize: 18,
        marginLeft: 10,
    },
    authorText: {
        color: mainAccentColor,
        fontSize: 14,
        marginLeft: 10,
    },
    imageContainer: {
        width: 110,
    },
    imageStyle: {
        height: 110,
        width: 110,
    },
})