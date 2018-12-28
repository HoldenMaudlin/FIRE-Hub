import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {
    Header,
    Left,
    Title
} from 'native-base'

import { mainColor, mainHeaderText, mainFillColor, mainAccentColor } from '../../Styles/ColorConstants'
import { ToolsName, Tool1Name, Tool1Desc, Tool2Name } from "../../Components/Constants/ToolNames";
import { Icon } from 'react-native-elements'
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import { createAnimatableComponent } from 'react-native-animatable'
import { View as AView, Text as AText } from 'react-native-animatable'

class ToolsScreen extends Component {
  
    constructor() {
        super()
        this.state = {
            desc1Vis: false,
            desc2Vis: false,
            desc3Vis: false,
        }
    }



    _onPressHelp(){
        this.props.navigation.navigate()
    }

    static navigationOptions = {
        header: null
    };
  

    _onPressButton(screen){
        this.props.navigation.navigate(screen)
    }

    _onLongPressButton(stateKey){
        this.setState({[stateKey]: !this.state[stateKey]})
    }

    render() {

        if (!this.state.desc1Vis) {
            var button1  =                
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'Tool1Main')} onLongPress={this._onLongPressButton.bind(this, 'desc1Vis')}>
                <Text style={styles.textStyle}>{Tool1Name} </Text>
                <View style = {{height: 100, width: 200, justifyContent: 'stretch', alignItems: 'flex-end'}} >
                    <Icon flex={1} color={mainColor} name= 'area-graph' type='entypo' size={130} />
                </View>
            </TouchableOpacity>

        } else {
            var button1 = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this, 'Tool1Main')} onLongPress={this._onLongPressButton.bind(this, 'desc1Vis')} >
                <Text style={styles.toolDescText}>{Tool1Desc} </Text>
            </TouchableOpacity>
        }
        
        if (!this.state.desc2Vis) {
            var button2 = 
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'Tool2Main')} onLongPress={this._onLongPressButton.bind(this, 'desc2Vis')}>
                <Text style={styles.textStyle}>{Tool2Name}</Text>
                <View style = {{height: 100, width: 200, justifyContent: 'stretch', paddingRight: 20, alignItems: 'flex-end'}} >
                    <Icon flex={1} color={mainColor} name= 'line-graph' type='entypo' size={100} />
                </View>
            </TouchableOpacity>
        } else {
            var button2 = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this, 'Tool2Main')} onLongPress={this._onLongPressButton.bind(this, 'desc2Vis')} >
                <Text style={styles.toolDescText}>{Tool1Desc} </Text>
            </TouchableOpacity>
        }

        if(!this.state.desc3Vis) {
            var button3=
            <TouchableOpacity style={styles.mainTabName} onPress={this._onPressButton.bind(this, 'AdvancedFireMain')} onLongPress={this._onLongPressButton.bind(this, 'desc3Vis')}>
                <Text style={styles.textStyle}>Countdown </Text>
                <View style = {{height: 100, width: 200, justifyContent: 'stretch', paddingRight: 40, paddingTop: 10, alignItems: 'flex-end'}} >
                    <Icon flex={1} color={mainColor} name= 'circular-graph' type='entypo' size={80} />
                </View>
            </TouchableOpacity>
        } else {
            var button3 = 
            <TouchableOpacity style ={styles.mainTabDesc} onPress={this._onPressButton.bind(this,'AdvancedFireMain')} onLongPress={this._onLongPressButton.bind(this, 'desc3Vis')} >
                <Text style={styles.toolDescText}>Sup </Text>
            </TouchableOpacity>
        }

    return(
        <View style= {{flex: 1, backgroundColor: mainColor}} >
            <MainDrawerHeader title = 'Tools' navigation = {this.props.navigation}/>
            <StatusBar backgroundColor = {mainColor} barStyle={'light-content'}/>
            <View style = {{flex: 1, backgroundColor: mainFillColor}} >
                <ScrollView contentContainerStyle = {styles.container}>
                    {button1}
                    {button2}
                    {button3}
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
    color: mainColor,
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 30,
  }, 
  toolDescText: {
    color: mainColor,
    fontSize: 15.5,
    fontWeight: 'bold'
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  mainTabDesc: {
    height: 100,
    borderBottomWidth: 2,
    borderColor: mainAccentColor,
    padding: 10,
    backgroundColor: mainFillColor,
    justifyContent: 'center'
  },
  textStyle: {
    color: mainColor,
    fontWeight: '500',
    marginTop: 10,
    fontSize: 30,
  }
})