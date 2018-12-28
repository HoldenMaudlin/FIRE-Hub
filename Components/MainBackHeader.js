import React, {Component} from 'react'

import { Text } from 'react-native'
import { mainColor, mainHeaderText } from '../Styles/ColorConstants';
import { Icon }  from 'react-native-elements'
import { Header, Left, Button, Body, Right, Title } from 'native-base'

class MainBackHeader extends Component {
    render() {
        return (
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
                    <Button transparent style={{paddingLeft: 5}} onPress = {() => {console.log("Help Me!")}}  >
                        <Icon color = {mainHeaderText} size = {20} name = 'help' type = 'material-community' />
                    </Button>
                </Right>   
            </Header>

        )
    }
}

export default MainBackHeader