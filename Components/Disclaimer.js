/*
 * Summary.
 * Reusebale text component with the Disclaimer for this app
 *
 * @return   Component   Text disclaimer: slightly formatted.
 */



import React, { Component } from 'react'
import {
    View,
    Text,
    Linking,
    StyleSheet
} from 'react-native'
import { mainColor, mainAccentColor } from '../Styles/ColorConstants'

class Disclaimer extends Component {
    render() {
        return(
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Disclaimer</Text>
                <Text style={styles.body}>This app provides estimates based on historical market data to give you a sense of how long it might take you to achieve your retirement goal. The graphs and data displayed in this app are not guaranteed to be accurate predictors of future financial performance and should NOT be used as the basis of financial decisions.</Text>
                <Text style={styles.body}>By using this app, you have agreed that you understand that the information displayed should NOT be used to make financial decisions.</Text>
                <Text style={styles.body}>I do not accept the liability, direct or indirect, arising from any person relying on the information provided by this application.</Text>
                <Text style={[styles.body, {marginBottom: 10}]}>Under no circumstances will I be liable for any loss or damage caused by your reliance on information obtained in this application.</Text>
                <Text style={styles.header}>Privacy</Text>
                <Text style={styles.body}>
                    <Text>All information is stored locally on your phone. The data you input will not be transmitted anywhere. For more information, please read the full </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('http://www.holdenmaudlin.com/static/media/FireHubPrivacyPolicy.pdf')}>Privacy Policy.</Text>
                </Text>
                <Text style={[styles.body, {marginBottom: 10}]}>
                    <Text style={styles.body}>This app is also completely open source </Text>
                    <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/HoldenMaudlin/FIRE-Hub')}>open source.</Text>
                </Text>
                <Text style={styles.header}>Security</Text>
                <Text style={styles.body}>As this app does not transmit data, the main security concern is someone acessing this app without your consent. Because of this, a PIN Code feature, Touch ID, and Face ID support is coming soon!</Text>
            </View>
        )
    }
}

export default Disclaimer

const styles = StyleSheet.create({
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
        color: mainColor, 
        textDecorationLine: 'underline'
    }
})