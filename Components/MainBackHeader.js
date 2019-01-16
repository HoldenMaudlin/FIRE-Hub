/*
 * Summary.
 * Standard menu bar for all screens more than 1 level deep in stack
 * 
 * Description.
 * Receives screen props and displays menu bar with back button
 *
 * PROP   TYPE       NAME               REQ.    DESC
 * @prop  Object     navigation         Yes     Navigation props of parent screen
 * @prop  string     title              Yes     Title to show on top menu bar
 * @prop  Component  helpView           No      Help overlay component to be shown on press help
 * @prop  string     backButtonName     Yes     Title for back button
 *  
 */

// Package imports
import React, {Component} from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { Icon }  from 'react-native-elements'
import { Header, Left, Button, Body, Right, Title } from 'native-base'
import Overlay from 'react-native-modal-overlay';

// Style Imports
import { mainColor, mainHeaderText } from '../Styles/ColorConstants';

class MainBackHeader extends Component {
    constructor(props) {
        super(props)

        // Controls visiblity of overlay
        this.state = {
            helpVisible: false,
        }  
    }

    // Closes overlay
    onClose = () => this.setState({ helpVisible: false});

    render() {
        return (
            <View>
                <Header iosBarStyle='light-content' style={{ backgroundColor: mainColor }}>
                    <Left>
                        <Button onPress = {() => this.props.navigation.goBack()} transparent >
                            <Icon color = {mainHeaderText} size = {30} name = 'ios-arrow-back' type = 'ionicon'/>
                            <Text style = {{ fontSize: 17, color: mainHeaderText }}>  {this.props.backButtonName}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: mainHeaderText, fontSize: 20, fontWeight: 'normal' }}>{this.props.title}</Title>
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
                    <View style={{alignItems: 'center'}}>
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

export default MainBackHeader

const styles = StyleSheet.create({
    // Got it button text
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    // got it button container
    buttonContainer: {
        height: 40,
        width: 80,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})