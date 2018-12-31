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

import React, {Component} from 'react'
import { mainAccentColor, mainColor, mainFillColor } from '../Styles/ColorConstants'

var {height, width} = Dimensions.get('window')

class RedditBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
            spinValue: new Animated.Value(0),
            yValue: new Animated.Value(0),
        }
    }

    _animateSpin = ({ toValue }) => {
        Animated.timing(this.state.spinValue, {
            toValue: toValue,
            duration: 250,
            easing: Easing.linear,
            //useNativeDriver: Platform.OS === 'android',
        }).start()
    }

    _onPressIcon() {
        if (this.state.collapsed) {
            this.setState({collapsed: !this.state.collapsed})
            this._animateSpin({toValue: 1});
        } else {
            this.setState({collapsed: !this.state.collapsed})
            this._animateSpin({toValue: 0});
        }
    }

    _openRedditPost(postURL){
        Linking.openURL(postURL).catch(error => {
          console.log("Error: ", error)
        })
    }

    componentDidMount() {
        Animated.timing(this.state.yValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            delay: 100*this.props.delay
        }).start()
    }

    render() {
    const spin = this.state.spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    })


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
                            <TouchableWithoutFeedback onPress={() => this._openRedditPost(this.props.url) } style={styles.animatedContainer}>
                                <View style={styles.animatedContainer}>
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
    animatedContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    postBox: {
        flex: 1,
        backgroundColor: mainFillColor,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
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