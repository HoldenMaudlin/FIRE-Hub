import React, { Component } from 'react'
import {
    View,
    Linking,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
} from 'react-native'
import { mainAccentColor, mainColor, mainFillColor } from '../Styles/ColorConstants';
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import { ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible'
import { Icon } from 'react-native-elements'


var { height, width } = Dimensions.get('window')

class BookBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            spinValue: new Animated.Value(0),
        }
    }

    _onPressBook(URL){
        Linking.openURL(URL).catch(error =>
            console.log("Error opening book link: ", error)
        )
    }

    _animate = ({ toValue }) => {
        Animated.timing(this.state.spinValue, {
            toValue: toValue,
            duration: 200,
            easing: Easing.linear,
            //useNativeDriver: Platform.OS === 'android',
        }).start()
    }

    _onPressIcon() {
        if (this.state.collapsed) {
            this.setState({collapsed: !this.state.collapsed})
            this._animate({toValue: 1});
        } else {
            this.setState({collapsed: !this.state.collapsed})
            this._animate({toValue: 0});
        }
    }

    /*_trimString(string){
        return string.split(/[:-@]/)[0]
    }*/

    render(){
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });

        return(
            <View style = {styles.container}>
                <View  style={styles.boxContainer}>        
                    <TouchableOpacity onPress={() => {this._onPressBook(this.props.bookURL)}} style = {styles.imageContainer}>
                        <Image resizeMode = 'contain' style = {styles.imageStyle} source = {{uri: this.props.bookImage}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this._onPressBook(this.props.bookURL)}} style={styles.contentContainer}>  
                        <Text style={styles.titleText}>{this.props.bookName}</Text>
                        <Text style={styles.authorText}>{this.props.bookAuthor}</Text>
                    </TouchableOpacity>                 
                    <TouchableOpacity onPress = {() => this._onPressIcon()} style = {styles.iconContainer}>
                        <Animated.View style = {[styles.animatedContainer, { transform: [{rotate: spin}] }]} >
                            <Icon color={mainColor} size={32} name ='keyboard-arrow-down'/>
                        </Animated.View>
                    </TouchableOpacity>
                </View> 
                <Collapsible collapsed= {this.state.collapsed}>
                    <View style={{flex: 1, width: width, backgroundColor: mainFillColor, padding: 4, borderTopColor: mainAccentColor, borderTopWidth: 1,}}>
                        <Text style={{color: 'black', fontSize: 16}} >{this.props.bookDescription}</Text>
                    </View>
                </Collapsible>   
            </View>        
        )
    }
}

export default BookBox

const styles = StyleSheet.create({
    // Containers
    container: {
        alignItems: 'stretch', 
        borderBottomWidth: 1,
        borderBottomColor: mainAccentColor,
    }, 
    boxContainer: {
        flexDirection: 'row', 
        height: 120, 

    },
    contentContainer: {
        flex: 4,
        justifyContent: 'center',
    },
    imageContainer: {
        width: 110,
        margin: 5,
    },
    iconContainer: {
        flex: 1, 
        marginTop: 30,
        marginBottom: 30,
        height: 60
    },
    animatedContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    // Texts
    titleText: {
        color: 'black',
        fontSize: 18,
        marginLeft: 5,
    },
    authorText: {
        color: mainAccentColor,
        fontSize: 14,
        marginLeft: 5,
    },

    // Images and Icons
    imageStyle: {
        height: 110,
        width: 110,
    },
    dialogBoxStyle: {
        flex: -1,
        maxHeight: height/1.4,
        width: width/1.3,
    },
    dialogTitleStyle: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogMainStyle: {
        flex: -1,
        paddingTop: 10,
    },
})