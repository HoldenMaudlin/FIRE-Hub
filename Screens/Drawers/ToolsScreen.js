// Base React imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';

import {
    Header,
    Left,
    Title
} from 'native-base'

// My component imports
import { mainColor, mainHeaderText, mainFillColor, mainAccentColor } from '../../Styles/ColorConstants'
import { BFDescription, AFDescription, BEDescription, MCDescription } from '../../Components/Constants/InputDescriptions'
import { Icon } from 'react-native-elements'
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import HelpView from '../../Components/HelpView'

var {height, width} = Dimensions.get('window')

class ToolsScreen extends Component {
  
    constructor() {
        super()
        this.state = {
            desc1Vis: false,
            desc2Vis: false,
            desc3Vis: false,
            desc4Vis: false,
        }
    }

    _onPressHelp(){
        this.props.navigation.navigate()
    }

    static navigationOptions = {
        header: null,
    };
  
    _onPressButton(screen){
        this.props.navigation.navigate(screen)
    }

    _onLongPressButton(stateKey){
        this.setState({[stateKey]: !this.state[stateKey]})
    }

    _addOpacity(rgbString, opacity) {
        var temp = rgbString.split('(')[0] + 'a(' + rgbString.split(')')[0].split('(')[1] + "," + opacity + ")"
        console.log(temp)
        return temp
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
        if (!this.state.desc1Vis) {
            var BFButton  =                
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'Tool1Main')} onLongPress={this._onLongPressButton.bind(this, 'desc1Vis')}>
                <View style={styles.iconContainer}>
                    <Icon containerStyle={{paddingTop: 5,}} flex={1} color={'white'} name= 'area-graph' type='entypo' size={50} />
                </View>
                <Text style={styles.textStyle}>FIRE Basic </Text>
            </TouchableOpacity>

        } else {
            var BFButton = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this, 'Tool1Main')} onLongPress={this._onLongPressButton.bind(this, 'desc1Vis')} >
                <Text style={styles.toolDescText}>{BFDescription}</Text>
            </TouchableOpacity>
        }
        
        if (!this.state.desc2Vis) {
            var BEButton = 
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'Tool2Main')} onLongPress={this._onLongPressButton.bind(this, 'desc2Vis')}>
                <View style={styles.iconContainer}>
                    <Icon containerStyle={{paddingTop: 5,}} flex={1} color={'white'} name= 'line-graph' type='entypo' size={50} />
                </View>
                <Text style={styles.textStyle}>Break Even </Text>
            </TouchableOpacity>
        } else {
            var BEButton = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this, 'Tool2Main')} onLongPress={this._onLongPressButton.bind(this, 'desc2Vis')} >
                <Text style={styles.toolDescText}>{BEDescription} </Text>
            </TouchableOpacity>
        }

        if(!this.state.desc3Vis) {
            var AFButton=
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'AdvancedFireMain')} onLongPress={this._onLongPressButton.bind(this, 'desc3Vis')}>
                <View style={styles.iconContainer}>
                    <Icon containerStyle={{paddingTop: 5,}} flex={1} color={'white'} name ='graph' type='simple-line-icon' size={50} />
                </View>
                <Text style={styles.textStyle}>FIRE Advanced</Text>
            </TouchableOpacity>
        } else {
            var AFButton = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this,'AdvancedFireMain')} onLongPress={this._onLongPressButton.bind(this, 'desc3Vis')} >
                <Text style={styles.toolDescText}>{AFDescription}</Text>
            </TouchableOpacity>
        }

        if(!this.state.desc4Vis) {
            var MCButton=
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'MonteCarloMain')} onLongPress={this._onLongPressButton.bind(this, 'desc4Vis')}>
                <View style={styles.iconContainer}>
                    <Icon containerStyle={{paddingTop: 5,}} flex={1} color={'white'} name= 'dice-5' type='material-community' size={50} />
                </View>
                <Text style={styles.textStyle}>Monte Carlo </Text>
            </TouchableOpacity>
        } else {
            var MCButton = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this,'MonteCarloMain')} onLongPress={this._onLongPressButton.bind(this, 'desc4Vis')} >
                <Text style={styles.toolDescText}>{MCDescription}</Text>
            </TouchableOpacity>
        }

    return(
        <View style= {{flex: 1, backgroundColor: mainColor}} >
            <MainDrawerHeader title = 'Tools' navigation = {this.props.navigation} helpView={helpView}/>
            <StatusBar backgroundColor = {mainColor} barStyle={'light-content'}/>
            <View style = {{flex: 1, backgroundColor: mainFillColor}} >
                <ScrollView contentContainerStyle = {styles.container}>
                    {BFButton}
                    {AFButton}
                    {MCButton}
                    {BEButton}
                    <Text style={{color: mainAccentColor, textAlign: 'center', marginTop: 15,}}>More tools coming soon!</Text>
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
  }
})