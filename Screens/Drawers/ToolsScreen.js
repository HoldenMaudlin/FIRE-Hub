/*
 * Summary.
 * Main tool screen page. Allows user to navigate to other pages.
 * 
 * Return.
 * UI complete with icons, titles, and descriptions for tools.
 * 
 */

// Package Imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Linking
} from 'react-native';

// Custom imports
import { BFDescription, AFDescription, BEDescription, MCDescription } from '../../Components/Constants/InputDescriptions'
import { Icon } from 'react-native-elements'
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import HelpView from '../../Components/HelpView'
import ToolButton from '../../Components/ToolButton'

// Style imports
import { mainColor, mainFillColor, mainAccentColor } from '../../Styles/ColorConstants'

class ToolsScreen extends Component {

    // Prevents default header
    static navigationOptions = {
        header: null,
    };

    // Contact Me email function
    _onPressEmail() {
        Linking.openURL("mailto:FIREHubMobileApp@gmail.com?subject=FIRE Hub Suggestion")
    }
    
    // Navigate to screen based on user touch
    _onPressButton(screen){
        this.props.navigation.navigate(screen)
    }

    // Show the description for a tool
    _onLongPressButton(stateKey){
        this.setState({[stateKey]: !this.state[stateKey]})
    }

    render() {
        // Information to be passed to the Tools Help Screen
        const helpLines = [
            { key: 1, icon: 'menu', iconType: '', text: 'Tap on the Menu Button to navigate to another screen!',},
            { key: 2, icon: 'hand-pointing-left', iconType: 'material-community', text: 'Or slide from the left!',},
            { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Tap a tool box to go to that tool!",},
            { key: 4, icon: 'gesture-double-tap', iconType: 'material-community', text: "Hold a tool box to see a brief description of the tool!",},
        ]
        var helpView = <HelpView helpLines={helpLines}/>

    return(
        <View style= {{flex: 1, backgroundColor: mainColor}} >
            <MainDrawerHeader title = 'Tools' navigation = {this.props.navigation} helpView={helpView}/>
            <StatusBar backgroundColor = {mainColor} barStyle={'light-content'}/>
            <View style = {{flex: 1, backgroundColor: mainFillColor}} >
                <ScrollView contentContainerStyle = {styles.container}>
                    <ToolButton title='FIRE Basic' icon='area-graph' iconType='entypo' desc={BFDescription} nextScreen='Tool1Main' navigation={this.props.navigation}/>
                    <ToolButton title='FIRE Advanced' icon='graph' iconType='simple-line-icon' desc={AFDescription} nextScreen='AdvancedFireMain' navigation={this.props.navigation}/>
                    <ToolButton title='Monte Carlo' icon='dice-5' iconType='material-community' desc={MCDescription} nextScreen='MonteCarloMain' navigation={this.props.navigation}/>
                    <ToolButton title='Break Even' icon='line-graph' iconType='entypo' desc={BEDescription} nextScreen='Tool2Main' navigation={this.props.navigation}/>
                    <Text style={styles.suggestionText}>
                        <Text style={{color: mainAccentColor}}>Have a suggestion? Email me at </Text><Text onPress={() => this._onPressEmail()} style={{color: mainColor, textDecorationLine: 'underline'}}>FIREHubMobileApp@gmail.com</Text>
                    </Text>
                </ScrollView>
            </View>
        </View>
    )
  }
}

export default ToolsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    //justifyContent: 'space-between',
  },
  tileContainer: {
    height: 100,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainter: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 8,
      paddingLeft: 10,
  },
  textContainterDesc: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 8,
  },
  toolNameText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
  }, 
  toolDescText: {
    color: 'black',
    fontSize: 15.5,
    fontWeight: 'normal'
  },

  boxContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  mainTabName: {
    height: 100,
    borderColor: mainAccentColor,
    borderBottomWidth: 1,
    paddingLeft: 15,
    overflow: 'hidden',
    backgroundColor: mainFillColor,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  mainTabDesc: {
    height: 100,
    borderBottomWidth: 1,
    borderColor: mainAccentColor,
    padding: 10,
    backgroundColor: mainFillColor,
    justifyContent: 'center'
  },
  textStyle: {
    color: 'black',
    fontWeight: '500',
    marginLeft: 15,
    marginTop: 10,
    fontSize: 30,
  },
  iconContainer: {
    width: 60, 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: mainColor, 
    borderRadius: 8, 
    marginBottom: 5
  },
  suggestionText: {
    textAlign: 'center', 
    margin: 20
  }
})