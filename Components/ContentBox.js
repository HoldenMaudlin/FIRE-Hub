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

class ContentBox extends Component {
    constructor(props) {
        super(props)
    
    }

    _onPressContent(URL){
        Linking.openURL(URL).catch(error =>
            console.log("Error opening content link: ", error)
        )
    }

    _trimString(string){
        return string.split(/[|:-@--]/)[0]
    }

    render(){
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
                            <Text style={styles.nameText} >
                                {name}
                            </Text>
                            <Text style={styles.authorText}>
                                {author}
                            </Text>
                        </View>
                        <View style={styles.descContainer}>
                            <Text numberOfLines={7}>
                                {this.props.desc}
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

export default ContentBox

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
    nameText: {
        fontSize: 16,
        fontWeight: '500',
    },
    authorText: {
        fontSize: 14,
        fontWeight: '400',
        color: mainAccentColor,
    }
})