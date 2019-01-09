// Package imports
import React, {Component} from "react"
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";

// Custom Imports
import MainBackHeader from "../../Components/MainBackHeader";
import HelpView from '../../Components/HelpView'
import Disclaimer from "../../Components/Disclaimer";

// Style imports
import { mainColor, mainFillColor } from '../../Styles/ColorConstants'

// DESC:
// Displays Terms & Conditions of app to user
class TermsScreen extends Component {
  
  constructor() {
    super()
  }
  static navigationOptions={
      header: null
  }

  // Renders basic text page with T&C
  render() {
    const helpLines = [{ key: 1, icon: 'sleep', iconType: 'material-community', text: "Tap 'Got it!' if this page was boring."}]
    var helpView = <HelpView helpLines={helpLines}/>
    return (
       <View style={styles.container}>
            <MainBackHeader title='Disclaimer' navigation={this.props.navigation} helpView={helpView}/>
            <ScrollView style={{padding: 10}}>
                <Disclaimer/>
            </ScrollView>
        </View>
    )
  }
}

export default TermsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainFillColor,
    },
})