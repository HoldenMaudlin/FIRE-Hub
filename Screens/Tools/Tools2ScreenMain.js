// Package imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

// Custom imports
import { BEstateKeys, T2AmountKey, T2Inv1ReturnKey, T2Inv1FeeKey, T2Inv2ReturnKey, T2Inv2FeeKey, T2TaxKey } from "../../Components/Constants/InputKeys";
import InputBox from '../../Components/InputBox'
import MainBackHeader from '../../Components/MainBackHeader'
import InputBoxHeader from '../../Components/InputBoxHeader';
import HelpView from '../../Components/HelpView'
import { amountDescription, curInvRetDescription, curInvFeesDescription, potInvRetDescription, potInvFeesDescription, expectedTaxesDescription } from "../../Components/Constants/InputDescriptions";

// Style imports
import { mainFillColor, mainColor, mainAccentColor } from '../../Styles/ColorConstants'

var { height, width } = Dimensions.get('window')


class Tool2ScreenMain extends Component {
    
  constructor () {
    super() 
      
    this.state = {
        warningText: '',

        // Input vars
        amount: '',
        returns1: '',
        fees1: '',
        returns2: '',
        fees2: '',
        taxes: '',
      }
  }

  // Hides default header
  static navigationOptions = {
      header: null
  }
  
  // Retrieve data from storage
  componentDidMount() {
    BEstateKeys.forEach((item) => {
      AsyncStorage.getItem(item.asyncKey).then((value) => {
        if (value !== null) {
          this.setState({[item.stateKey]: value})
        }
      })
    })
    this.setState({didMount: true})
  }

  // Update stored values based on user input
  _updateAsyncValues() {
    BEstateKeys.forEach((item) => {
      AsyncStorage.setItem(item.asyncKey, this.state[item.stateKey] + '')
    })
  }

  componentWillUnmount(){
   this._updateAsyncValues()
  }

  _updateStateValues() {
    BEstateKeys.forEach((item) => {
      AsyncStorage.getItem(item.asyncKey).then((value) => {
        value = parseFloat(value, 10)
        if (!isNaN(value)) {
          this.setState({[item.stateKey]: value})
        }
      })
    })
  }

   // Regulate navigation logic on user press butotn
   _onPressButton(){ 
    this._updateAsyncValues()
    this._updateStateValues()
    if(!this._checkIfEmpty()) {
      if (this._checkInputLogic()) {
        this.props.navigation.navigate('Tool2Graph')
        this.setState({warningText: ''})
      } else {
        this.setState({warningText: 'Based on the given inputs, the potential investment will never exceed the current investment.'})
      }
    } else {
      this.setState({warningText: 'Please Enter All Fields!'})
    }
  } 

  _setState = (value, stateKey) => {
    this.setState({[stateKey]: value})
  }

  // Functions to regulate navigation
  _checkIfEmpty () {
    if (this.state.amount === '' || this.state.returns1 === '' || this.state.returns2 === '' || this.state.fees1 === '' || this.state.fees2 === '' || this.state.taxes === '') {
      return true
    } else {
      return false
    }
  }

  // Ensures data is safe to pass to graph
  _checkInputLogic() {
    if (parseFloat(this.state.returns1) - parseFloat(this.state.fees1) < parseFloat(this.state.returns2) - parseFloat(this.state.fees2)) {
      return true;
    } else 
     return false;
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
        <MainBackHeader navigation = {this.props.navigation} title = 'Break Even' backButtonName = 'Tools' helpView={helpView}/>
        <ScrollView style={styles.mainScroll}>                 
          <InputBox name = 'Amount' mask='money' precision={0} stateKey='amount' iconName = 'attach-money' _setState={this._setState.bind(this)} storageKey = {T2AmountKey} description = {amountDescription} {...this.state}/>
          <InputBoxHeader text='Current Investment' />
          <InputBox name = 'Returns' placeholder='Returns %' percent={true} precision={2} stateKey = 'returns1' iconName = 'trending-up' _setState={this._setState.bind(this)} storageKey = {T2Inv1ReturnKey} description ={curInvRetDescription}{...this.state}/>
          <InputBox name = 'Fees' placeholder='Fees %' percent={true} precision={2} stateKey = 'fees1' iconName = 'trending-down' _setState={this._setState.bind(this)} storageKey = {T2Inv1FeeKey} description ={curInvFeesDescription} {...this.state}/>
          <InputBoxHeader text='Potential Investment' />
          <InputBox name = 'Returns' placeholder='Returns %' percent={true} precision={2} stateKey = 'returns2' iconName = 'trending-up' _setState={this._setState.bind(this)} storageKey = {T2Inv2ReturnKey} description ={potInvRetDescription} {...this.state}/>
          <InputBox name = 'Fees' placeholder='Fees %' percent={true} precision={2} stateKey = 'fees2' iconName = 'trending-down' _setState={this._setState.bind(this)} storageKey = {T2Inv2FeeKey} description ={potInvFeesDescription} {...this.state}/>
          <InputBoxHeader text='Involuntary Contributions'/>
          <InputBox name = 'Expected Taxes' placeholder='Taxes %' percent={true} precision={2} stateKey = 'taxes' iconName = 'mood-bad' _setState={this._setState.bind(this)} storageKey = {T2TaxKey} description ={expectedTaxesDescription} {...this.state}/>
          <Text style={{padding: 30, textAlign: 'center', color: mainAccentColor, fontSize: 14}}>For more information about a field, tap the name or icon!</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.warningTextContainer}>
              <Text style={styles.warningText}>{this.state.warningText}</Text>
            </View>
            <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: buttonColor}]} onPress={() => this._onPressButton()}>
              <Text style ={{color: mainFillColor, fontWeight: 'bold', fontSize: 20,}}> Go! </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Tool2ScreenMain;

const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  mainBackdrop: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: width,
    paddingTop: 2,
  },
  buttonContainer: {
    flex:1,
    backgroundColor: 'white',
    width: width,
    justifyContent: 'center',
    height: 60,
    marginBottom: 50,
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
