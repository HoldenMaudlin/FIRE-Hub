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
import { T1AgeKey, incomeKey, targetKey, spendKey, assetKey } from '../../Components/Constants/InputKeys'

import { totalSpendingDescription, ageDescription, incomeDescription } from '../../Components/Constants/InputDescriptions'
import DismissKeyboardView from '../../Components/DismissKeyboardView'
import { mainColor, mainHeaderText, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
import { Tool1Name } from '../../Components/Constants/ToolNames'
import InputBox from '../../Components/InputBox'

import { incomeIconName } from '../../Components/Constants/IconNames'
import MainBackHeader from '../../Components/MainBackHeader';


var { height, width } = Dimensions.get('window')

const ageState = 'age'
const incomeState = 'income'
const assetsState = 'assets'
const spendState = 'spend'
const targetState = 'target'

stateKeys = [
    { stateKey: ageState, asyncKey: T1AgeKey },
    { stateKey: incomeState, asyncKey: incomeKey },
    { stateKey: targetState, asyncKey: targetKey },
    { stateKey: assetsState, asyncKey: assetKey },
    { stateKey: spendState, asyncKey: spendKey },
  ]


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
    stateKeys.forEach((item) => {
      AsyncStorage.getItem(item.asyncKey).then((value) => {
        if (value !== null) {
          this.setState({[item.stateKey]: value})
        }
      })
    })
    this.setState({didMount: true})
  }

  _updateAsyncValues() {
    console.log("called")
    stateKeys.forEach((item) => {
      AsyncStorage.setItem(item.asyncKey, this.state[item.stateKey] + '')
      console.log(item.stateKey," set to ", this.state[item.stateKey] )
    })
  }

  componentWillUnmount(){
   this._updateAsyncValues()
  }

  _updateStateValues() {
    stateKeys.forEach((item) => {
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
      this.props.navigation.navigate('Tool1Graph')
      this.setState({warningText: ''})
    } else {
      this.setState({warningText: 'Please Enter All Fields!'})
    }
  } 

  _setState = (value, stateKey) => {
    this.setState({[stateKey]: value})
  }

  _checkIfEmpty () {
    if (this.state.age === '' || this.state.assets === '' || this.state.income === '' || this.state.spend === '' || this.state.target === '') {
      return true
    } else {
      return false
    }
  }

  render() {

    if (this._checkIfEmpty()) {
      var buttonColor = mainAccentColor
    } else {
      var buttonColor = mainColor
    }


    return(    
        <View style={styles.mainBackdrop}>
          <MainBackHeader title = "FIRE Basic" backButtonName = "Tools" navigation = {this.props.navigation}/>
          <ScrollView style={styles.mainScroll}>                            
            <InputBox name = 'Age' stateKey = 'age' iconName = 'person' mask='only-numbers' precision={0} description={ageDescription} _setState={this._setState.bind(this)} storageKey={T1AgeKey} {...this.state}/>
            <InputBox name = 'Assets' stateKey = 'assets' iconName ='home' mask='money' precision={0} description={'hi'} _setState={this._setState.bind(this)} storageKey={assetKey} {...this.state}/>
            <InputBox name = 'Income' stateKey = 'income' iconName = 'attach-money'  mask='money' precision={0} description={incomeDescription} _setState={this._setState.bind(this)} storageKey={incomeKey} {...this.state}/>
            <InputBox name = 'Spending' stateKey = 'spend' iconName = 'credit-card' mask='money' precision={0} description={totalSpendingDescription} _setState={this._setState.bind(this)} storageKey={spendKey} {...this.state}/>
            <InputBox name = 'Target' stateKey = 'target' iconName = 'trophy' mask='money' precision={0} iconType='font-awesome' description={''} _setState={this._setState.bind(this)} storageKey={targetKey} {...this.state}/>
            <Text style={{padding: 30, textAlign: 'center', color: mainAccentColor, fontSize: 14}}>For more information about a field, tap the name or icon!</Text>
            <View style={styles.buttonContainer}>
              <Text style={{paddingBottom: 30, textAlign: 'center', color: mainColor, fontSize: 14, fontWeight: 'bold'}}>{this.state.warningText}</Text>
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
    justifyContent: 'center'
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
})
