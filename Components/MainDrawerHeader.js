import React, {Component} from 'react'

import { Text } from 'react-native'
import { mainColor, mainHeaderText } from '../Styles/ColorConstants';
import { Icon }  from 'react-native-elements'
import { Header, Left, Button, Body, Right, Title } from 'native-base'

class MainDrawerHeader extends Component {
    render() {
        return (
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
                    <Button transparent style={{paddingLeft: 5}} onPress = {() => {console.log("Help Me!")}}  >
                        <Icon color = {mainHeaderText} size = {20} name = 'help' type = 'material-community' />
                    </Button>
                </Right>   
            </Header>

        )
    }
}

export default MainDrawerHeader