import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import { 
  Header,
  Left,
  Icon,
} from 'native-base';

class HomeScreen extends Component {
  render() {
    return(
        <View style = {styles.container}>
          <Header>
            <Left>
              <Icon name= 'ios-menu' onPress= {() => this.props.navigation.openDrawer()} />
            </Left>
          </Header>
          <Text> This is the Home Screen </Text>
        </View>
    )
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})