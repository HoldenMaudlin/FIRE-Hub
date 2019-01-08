import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native';
import { Icon } from 'react-native-elements'
import { mainFillColor, mainColor, mainAccentColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'

class AboutFIREScreen extends Component {
    
    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
             <Icon name = 'information-outline' type='material-community' color={tintColor}/>
        )
    }

    _onPressLink(link) {
        Linking.openURL(link)
    }
    
    render() {
        return(
            <View style = {styles.container}>
                <MainDrawerHeader title = 'About FIRE' navigation = {this.props.navigation}/>
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>What is FIRE?</Text>
                        <Text style={styles.body}>FIRE is a two part acronym that stands for Financial Independence / Retiring Early.</Text>
                        <Text style={styles.body}>Financial Independence is the idea of not having to work for money.</Text>
                        <Text style={[styles.body, {marginBottom: 10,}]}>Retiring Early is the concept of leaving your job or career to do other things or pursue other interests.</Text>
                        <Text style={styles.header}>FIRE Principles</Text>
                        <Text style={styles.body}>The basic principle of FIRE is maximizing your savings to achieve in order to achieve your goal sooner. This is comprised of two main components: Income and Spending.</Text>
                        <Text style={[styles.body, {marginBottom: 10}]}>To decrease the time to retirement, you can increase your earning potential or decrease the amount you spend. Or, better yet, you can do both!</Text>
                        <Text style={styles.header}>Necessity for FIRE</Text>
                        <Text style={styles.body}>As this app does not transmit data, the main security concern is someone acessing this app without your consent. Because of this, a PIN Code feature, Touch ID, and Face ID support is coming soon!</Text>
                        <Text style={{textAlign: 'center', marginTop: 20}}>
                            <Text style={{color: mainAccentColor}}>Have a suggestion? Email me at </Text><Text onPress={() => this._onPressLink()} style={{color: mainColor, textDecorationLine: 'underline'}}>FIREHubMobileApp@gmail.com</Text>
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default AboutFIREScreen;


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
        fontSize: 22, 
        marginTop: 10,
    },
    body: {
      marginTop: 10,
    },
    link: {
        color: 'blue'
    }
  })