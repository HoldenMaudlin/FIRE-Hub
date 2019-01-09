import React from 'react'
import { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  AsyncStorage,
} from 'react-native'
import { T1AgeKey, incomeKey, targetKey, spendKey, assetKey, BFstateKeys } from '../../Components/Constants/InputKeys'
import { ageDescription, incomeDescription, assetsDescription, totalSpendingDescription, targetDescription } from '../../Components/Constants/InputDescriptions'
import { mainColor, mainHeaderText, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
import InputBox from '../../Components/InputBox'
import HelpView from '../../Components/HelpView'
import MainBackHeader from '../../Components/MainBackHeader';
import { _stringToInt } from '../../Components/Functions/ParseNumber'


var { height, width } = Dimensions.get('window')

class Tool1ScreenMain extends Component {
    
  constructor() {
    super()

    this.state = {
        didMount: false,
        allInputted: false,
        warningText: '',

        age: '',
        income: '',
        assets: '',
        spend: '',
        target: '',
    }    
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    BFstateKeys.forEach((item) => {
      AsyncStorage.getItem(item.asyncKey).then((value) => {
        if (value !== null) {
          this.setState({[item.stateKey]: value})
        }
      })
    })
    this.setState({didMount: true})
  }

  _updateAsyncValues() {
    BFstateKeys.forEach((item) => {
      AsyncStorage.setItem(item.asyncKey, this.state[item.stateKey] + '')
    })
  }

  componentWillUnmount(){
   this._updateAsyncValues()
  }

  _updateStateValues() {
    BFstateKeys.forEach((item) => {
      AsyncStorage.getItem(item.asyncKey).then((value) => {
        value = parseInt(value, 10)
        if (!isNaN(value)) {
          this.setState({[item.stateKey]: value})
        }
      })
    })
  }

   _onPressButton(){ 
    this._updateStateValues()
    this._updateAsyncValues()
    if(!this._checkIfEmpty()) {
      if(this._checkInputLogic()) {
        this.setState({warningText: 'Your assets already exceed your retirement goal! Congratulations!!!!'})
      } else {
        this.props.navigation.navigate('Tool1Graph')
        this.setState({warningText: ''})
      }
    } else {
      this.setState({warningText: 'Please Enter All Fields!'})
    }
  } 

  _setState = (value, stateKey) => {
    this.setState({[stateKey]: value})
  }

  // Functions to regulate navigation

  _checkInputLogic() {
    return (_stringToInt(this.state.assets) > _stringToInt(this.state.target))
  }

  _checkIfEmpty () {
    if (this.state.age === '' || this.state.assets === '' || this.state.income === '' || this.state.spend === '' || this.state.target === '') {
      return true
    } else {
      return false
    }
  }

  render() {
    // Information to be passed to the Tools Help Screen
    const helpLines = [
      { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
      { key: 2, icon: 'format-list-numbers', iconType: 'material-community', text: 'Fill in all fields, then press Go!',},
      { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Tap an input name or icon for an explanation of the input!"},
    ]
    var helpView = <HelpView helpLines={helpLines}/>
    if (this._checkIfEmpty()) {
      var buttonColor = mainAccentColor
    } else {
      var buttonColor = mainColor
    }


    return(    
        <View style={styles.mainBackdrop}>
          <MainBackHeader title = "FIRE Basic" backButtonName = "Tools" navigation = {this.props.navigation} helpView={helpView}/>
          <ScrollView style={styles.mainScroll}>                            
            <InputBox name = 'Age' stateKey = 'age' iconName = 'person' mask='only-numbers' percent={false} precision={0} description={ageDescription} _setState={this._setState.bind(this)} storageKey={T1AgeKey} {...this.state}/>
            <InputBox name = 'Assets' stateKey = 'assets' iconName ='home' mask='money' percent={false} precision={0} description={assetsDescription} _setState={this._setState.bind(this)} storageKey={assetKey} {...this.state}/>
            <InputBox name = 'Income' stateKey = 'income' iconName = 'attach-money'  mask='money' percent={false} precision={0} description={incomeDescription} _setState={this._setState.bind(this)} storageKey={incomeKey} {...this.state}/>
            <InputBox name = 'Spending' stateKey = 'spend' iconName = 'credit-card' mask='money' percent={false} precision={0} description={totalSpendingDescription} _setState={this._setState.bind(this)} storageKey={spendKey} {...this.state}/>
            <InputBox name = 'Target' stateKey = 'target' iconName = 'trophy' mask='money' percent={false} precision={0} iconType='font-awesome' description={targetDescription} _setState={this._setState.bind(this)} storageKey={targetKey} {...this.state}/>
            <Text style={{padding: 30, textAlign: 'center', color: mainAccentColor, fontSize: 14}}>For more information about a field, tap the name or icon!</Text>
            <View style={styles.warningTextContainer}>
              <Text style={styles.warningText}>{this.state.warningText}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: buttonColor}]} onPress={() => this._onPressButton()}>
                <Text style ={{color: mainFillColor, fontWeight: 'bold', fontSize: 20,}}> Go! </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    )
  }
  }



export default Tool1ScreenMain

const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
  mainBackdrop: {
    flex: 1,
    backgroundColor: mainColor,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: width,
    paddingTop: 2,
  },
  buttonContainer: {
    flex:1,
    backgroundColor: 'white',
    width: width,
    justifyContent: 'center',
    height: 60,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonStyle: {
    width: width/2,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  clearButtonInnerContainer: {
    height: 20,
    width: 20,
    marginLeft: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1.4,
    padding: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphContainer: {
    flex: 1,
    height: 260,
  },
  imageStyle: {
    resizeMode: 'contain',
    flex: 1,
  },
  inputBoxStyle: {
    flex: -1,
    flexDirection: 'row',
    backgroundColor: mainFillColor,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  boxStyle: {
    flex: 1.2,
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    marginLeft: 2.5,
    marginRight: 10,
},
  inputStyle: {
      marginRight: 3,
  },
  mainTab: {
      flex: 1,
      flexDirection: 'row',
      height: 50,
  },
  warningText: {
    textAlign: 'center', 
    color: mainColor, 
    fontSize: 14, 
    fontWeight: 'bold'
  },
  warningTextContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
