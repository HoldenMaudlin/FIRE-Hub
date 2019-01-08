import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Linking,
  ScrollView
} from "react-native";
import { mainColor, mainFillColor } from '../../Styles/ColorConstants'
import MainBackHeader from "../../Components/MainBackHeader";
import HelpView from '../../Components/HelpView'
import Disclaimer from "../../Components/Disclaimer";

class TermsScreen extends Component {
  
  constructor() {
    super()
  }
  static navigationOptions={
      header: null
  }

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