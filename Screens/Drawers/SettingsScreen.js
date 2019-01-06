import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView
} from 'react-native';

import { 
    Header,
    Left,
  } from 'native-base';  
import { Icon } from 'react-native-elements'
import { mainFillColor, mainColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import HelpView from "../../Components/HelpView";

class SettingsScreen extends Component {
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
             <Icon name='settings' type='simple-line-icon' color={tintColor}/>
        ),
    }

    render() {
        const helpLines = [{ key: 1, icon: 'sleep', iconType: 'material-community', text: "Tap 'Got it!' if this page was boring."}]
        var helpView = <HelpView helpLines={helpLines}/>
        return(
            <View style = {styles.container}>
                <MainDrawerHeader title = 'Disclaimer' navigation = {this.props.navigation} helpView={helpView}/>
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>Disclaimer</Text>
                        <Text style={styles.body}>This app provides estimates based on historical market data to give you a sense of how long it might take you to achieve your retirement goal. The graphs and data displayed in this app are not garunteed to be accurate predictors of future financial performance and should NOT be used as the basis of financial decisions.</Text>
                        <Text style={[styles.body, {marginBottom: 10,}]}>By using this app, you have agreed that you understand that the information displayed should NOT be used to make financial decisions.</Text>
                        <Text style={styles.header}>Privacy</Text>
                        <Text style={styles.body}>All information is stored locally on your phone. There is no backend server for this app so your data cannot be transmitted anywhere.</Text>
                        <Text style={[styles.body, {marginBottom: 10}]}>
                            <Text style={styles.body}>This app is completely open source, the repository for this project can be found</Text>
                            <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/HoldenMaudlin/FIRE-Hub')}> here.</Text>
                        </Text>
                        <Text style={styles.header}>Security</Text>
                        <Text style={styles.body}>As this app does not transmit data, the main security concern is someone acessing this app without your consent. Because of this, a PIN Code feature, Touch ID, and Face ID support is coming soon!</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
  contentContainer: {
      flex: 1,
      padding: 15,
  },
  header: {
      color: mainColor,
      fontSize: 32, 
      marginTop: 10,
  },
  body: {
    marginTop: 10,
  },
  link: {
      color: 'blue'
  }
})