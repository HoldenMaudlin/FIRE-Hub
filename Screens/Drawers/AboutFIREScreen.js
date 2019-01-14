// Package Imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native';
// Custom Imports
import { mainFillColor, mainColor, mainAccentColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'

// DESC:
// Simple text based screen to display information about FIRE to user
class AboutFIREScreen extends Component {

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
                        <Text style={styles.header}>Resources for FIRE</Text>
                        <Text style={styles.body}>This app has a wide collection financial books and podcasts. Not all of these resources will be perfect for every person. I encourage you to browse the resources and listen or read to what you feel will help on your FIRE path.</Text>
                        <Text style={styles.body}>
                            <Text style={[styles.body, {marginBottom: 10}]}>There are also many great blogs that can serve as great resources including </Text>
                            <Text style={styles.link} onPress={()=> this._onPressLink('http://www.mrmoneymustache.com')}>Mr. Money Mustache</Text>
                            <Text> and </Text>
                            <Text style={styles.link} onPress={()=> this._onPressLink('http://www.madfientist.com')}>Mad Fientist</Text>
                        </Text>
                        <Text style={{textAlign: 'center', margin: 20}}>
                            <Text style={{color: mainAccentColor}}>Have a suggestion? Email me at </Text><Text onPress={() => this._onPressLink('mailto:FIREHubMobileApp@gmail.com?subject=Fire Hub Suggestion')} style={styles.link}>FIREHubMobileApp@gmail.com</Text>
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default AboutFIREScreen;

// Style sheet for screen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainFillColor,
    },
    // Main text view
    contentContainer: {
        flex: 1,
        padding: 15,
    },
    // Section title style
    header: {
        color: mainColor,
        fontSize: 22, 
        marginTop: 10,
    },
    // Main text style
    body: {
      marginTop: 10,
    },
    // HyperLink style
    link: {
        color: mainColor, 
        textDecorationLine: 'underline'
    },
  })