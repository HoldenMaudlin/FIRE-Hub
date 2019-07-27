/*
 * Summary.
 * Navigation flow for Main Drawer Navigator
 *
 * Return.
 * Displays terms and conditions to user. Basic markdown style
 * 
 */


import React, {Component} from "react"
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'; 
import { mainFillColor, mainColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import HelpView from "../../Components/HelpView";
import Disclaimer from '../../Components/Disclaimer'

class DisclaimerScreen extends Component {
    render() {
        const helpLines = [{ key: 1, icon: 'sleep', iconType: 'material-community', text: "Tap 'Got it!' if this page was boring."}]
        var helpView = <HelpView helpLines={helpLines}/>
        return(
            <View style = {styles.container}>
                <MainDrawerHeader title = 'Disclaimer' navigation = {this.props.navigation} helpView={helpView}/>
                <ScrollView>
                    <Disclaimer/>
                </ScrollView>
            </View>
        )
    }
}

export default DisclaimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
})