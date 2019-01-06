import React, {Component} from 'react'
import Overlay from 'react-native-modal-overlay';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { mainColor, mainHeaderText } from '../Styles/ColorConstants';
import { Icon }  from 'react-native-elements'
import { Header, Left, Button, Body, Right, Title } from 'native-base'

class MainDrawerHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            helpVisible: false,
        }  
    }

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
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    buttonContainer: {
        height: 40,
        width: 80,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})