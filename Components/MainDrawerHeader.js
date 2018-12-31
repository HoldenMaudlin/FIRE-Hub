import React, {Component} from 'react'
import Overlay from 'react-native-modal-overlay';
import { Text, View } from 'react-native'
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
                    containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
                    childrenWrapperStyle={{backgroundColor: 'pink'}}
                >
                    <View style={{width: 200, height: 400, backgroundColor: 'blue'}}>
                        <Text>Hi</Text>
                    </View>
                </Overlay>
            </View>

        )
    }
}

export default MainDrawerHeader