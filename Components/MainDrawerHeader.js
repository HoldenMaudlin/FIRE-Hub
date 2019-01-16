/*
 * Summary.
 * Standard menu bar for all parent screens
 * 
 * Description.
 * Receives screen props and displays menu bar with menu button
 *
 * PROP   TYPE       NAME               REQ.    DESC
 * @prop  Object     navigation         Yes     Navigation props of parent screen
 * @prop  string     title              Yes     Title to show on top menu bar
 * @prop  Component  helpView           No      Help overlay component to be shown on press help
 *  
 */

// Package imports
import React, {Component} from 'react'
import Overlay from 'react-native-modal-overlay';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { Icon }  from 'react-native-elements'
import { Header, Left, Button, Body, Right, Title } from 'native-base'

// Style imports
import { mainColor, mainHeaderText } from '../Styles/ColorConstants';

class MainDrawerHeader extends Component {
    constructor(props) {
        super(props)

        // Controls visibility of help screen overlay
        this.state = {
            helpVisible: false,
        }  
    }

    // Function to close help screen
    onClose = () => this.setState({ helpVisible: false});

    render() {
        return (
            <View>
                <Header iosBarStyle='light-content' style={{ backgroundColor: mainColor, borderBottomWidth: 0 }}>
                    <Left>
                        <Button onPress = {() => this.props.navigation.openDrawer()} transparent >
                            <Icon color = {mainHeaderText} size = {30} name = 'menu'/>                       
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleText}>{this.props.title}</Title>
                    </Body>
                    <Right>  
                        <Button transparent style={{paddingLeft: 5}} onPress = {() => this.setState({helpVisible: true})}  >
                            <Icon color = {mainHeaderText} size = {20} name = 'help' type = 'material-community' />
                        </Button>
                    </Right>   
                </Header>
                <Overlay
                    visible={this.state.helpVisible}
                    onClose={this.onClose} closeOnTouchOutside
                    containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
                    childrenWrapperStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
                >
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        {this.props.helpView}
                        <TouchableWithoutFeedback onPress={() => this.onClose()}>
                            <View style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Got it!</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Overlay>
            </View>
        )
    }
}

export default MainDrawerHeader

const styles = StyleSheet.create({
    // Got It button text
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    // Got It help screen button container
    buttonContainer: {
        height: 40,
        width: 80,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Page title style
    titleText: {
        color: mainHeaderText, 
        fontSize: 20, 
        fontWeight: 'normal'
    }
})