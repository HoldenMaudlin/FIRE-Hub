// Package imports
import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    Linking,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native'
import { Icon } from 'react-native-elements'
import Collapsible from 'react-native-collapsible'

// Style imports
import { mainAccentColor, mainColor, mainFillColor } from '../Styles/ColorConstants'

var {height, width} = Dimensions.get('window')

// DESC:
// Receives props from Reddit Screen and displays content box back to user
class RedditBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            spinValue: new Animated.Value(0),
            yValue: new Animated.Value(0),
        }
    }

    // Opens selected post in Reddit App (if available) or default broswer
    _openRedditPost(postURL){
        Linking.openURL(postURL).catch(error => {
          console.log("Error: ", error)
        })
    }

    // Slide in animation for the posts
    componentDidMount() {
        Animated.timing(this.state.yValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            delay: 100*this.props.delay
        }).start()
    }

    render() {
        return (
            <Animated.View style={[styles.container, {opacity: this.state.yValue}]} > 
                <View style={[styles.postBox, {borderBottomLeftRadius: this.state.collapsed ? 5 : 0, borderBottomRightRadius: this.state.collapsed ? 5 : 0}]}>
                    <TouchableOpacity onPress={() => this._onPressIcon()} style = {{flex: 2, padding: 10, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text style ={{color: 'black', fontSize: 16, fontWeight: '600'}}>{this.props.title}</Text>
                    </TouchableOpacity>
                    <View style={{flex:1, flexDirection: 'row'}}>    
                        <View style={{flex: 2, justifyContent: 'flex-start', paddingLeft: 15, alignItems: 'center', flexDirection: 'row'}}>
                            <Icon size={22} name='thumbs-o-up' type='font-awesome' color = {mainColor}/>
                            <Text style={{color: mainColor, fontSize: 14, marginLeft: 15,}}>{this.props.ups}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                            <TouchableWithoutFeedback onPress={() => this._openRedditPost(this.props.url) } style={styles.viewPostContainer}>
                                <View style={styles.viewPostContainer}>
                                    <Text style={{color: mainColor, marginRight: 10,}}>View Post</Text>
                                    <Icon color={mainColor} size={32} name ='logo-reddit' type='ionicon'/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <Collapsible collapsed= {this.state.collapsed}>
                    <View style={[styles.textBox, {borderBottomLeftRadius: this.state.collapsed ? 0 : 5, borderBottomRightRadius: this.state.collapsed ? 0 : 5}]}>
                        <Text style={{color: 'black', fontSize: 16}}>{this.props.body}</Text>
                    </View>
                </Collapsible>  
            </Animated.View>
        ) 
    }
}

export default RedditBox

const styles = StyleSheet.create({
    // Main box container
    container: {
        alignItems: 'stretch', 
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        borderBottomColor: mainAccentColor,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 3,
    }, 
    // Holds view post and reddit icon
    viewPostContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    // Inner part of post box
    postBox: {
        flex: 1,
        backgroundColor: mainFillColor,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    // Title of post
    textBox: {
        flex: 1, 
        width: width, 
        backgroundColor: 
        mainFillColor, 
        padding: 10, 
        borderTopColor: mainAccentColor, 
        borderTopWidth: 1,
    }
})