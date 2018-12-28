import React, {Component} from 'react'

import {
    AsyncStorage,
    View,
    Button,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import {
    AFstateKeys,
    T3AgeKey, 
    T3IncomeKey, 
    T3SpendKey, 
    T3TargetKey, 
    T3AssetKey, 
    T3IncomeGrowthKey,
    T3StockAllocKey,
    T3BondAllocKey,
    T3CashAllocKey,
    T3StockReturnKey,
    T3BondReturnKey,
    } from '../../Components/Constants/InputKeys'
import { mainFillColor, mainColor, mainAccentColor } from '../../Styles/ColorConstants'
import { LineChart, Grid, Shadow } from 'react-native-svg-charts'
import InputBoxHeader from '../../Components/InputBoxHeader'
import MainBackHeader from '../../Components/MainBackHeader'
import { _createMonteCarloData } from '../../Components/Functions/MonteCarlo'
import { TextInputMask } from 'react-native-masked-text'
import InputBox from '../../Components/InputBox'

var { height, width } = Dimensions.get('window')

async function _getItem(stateKey) {
    try {
        var value = await AsyncStorage.getItem(stateKey)
        return value
    } catch(error) {
        console.log("Error retrieving value of Advanced Fire Key", error)
    }
}

export default class AdvancedFireMain extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            didMount: false,

            // State values to hold user inputs
            age: '',
            income: '',
            assets: '',
            spend: '',
            target: '',
            incomeGrowth: '',
            stocks: '',
            bonds: '',
            cash: '',
            stockReturns: '',
            bondReturns: '',
        }
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        AFstateKeys.forEach((item) => {
            AsyncStorage.getItem(item.asyncKey).then((value) => {
                if (value !== null) {
                    this.setState({[item.stateKey]: value})
                }
            })
        })
        this.setState({didMount: true})
    }

    // Store all values from the text input field   
    _updateAsyncValues() {
        AFstateKeys.forEach((item) => {
        AsyncStorage.setItem(item.asyncKey, this.state[item.stateKey] + '')
        })
    }

    componentWillUnmount(){
        this._updateAsyncValues()
    }

    _updateStateValues() {
        AFstateKeys.forEach((item) => {
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
        this.props.navigation.navigate('AdvancedFireGraph')
        this.setState({warningText: ''})
        } else {
        this.setState({warningText: 'Please Enter All Fields!'})
        }
    } 

    _setState = (value, stateKey) => {
        this.setState({[stateKey]: value})
    }    
    // Checks to see if the user needs to enter more values
    _checkIfEmpty () {
        if (this.state.age === '' || this.state.assets === '' || this.state.income === '' || this.state.spend === '' || this.state.target === '' || this.state.incomeGrowth === '' 
        || this.state.stocks ===  '' || this.state.bonds === '' || this.state.cash === '' || this.state.stockReturns === '' || this.state.bondReturns === '') {
            return true
        } else {
            return false
        }
    }

    render() {

        // Control button color based on state of text input
        if (this._checkIfEmpty()) {
            var buttonColor = mainAccentColor
        } else {
            var buttonColor = mainColor
        }

        return (
            <View style={styles.mainBackdrop}>
                <MainBackHeader navigation = {this.props.navigation} backButtonName = 'Tools' title = 'Monte Carlo' />
                <ScrollView style={styles.mainScroll}>
                    <InputBoxHeader text="Personal Information"/>
                    <InputBox name = 'Age' stateKey = 'age' iconName = 'person' mask='only-numbers' description={''} _setState={this._setState.bind(this)} storageKey={T3AgeKey} {...this.state}/>
                    <InputBox name = 'Assets' stateKey = 'assets' iconName ='home' mask='money' description={'hi'} _setState={this._setState.bind(this)} storageKey={T3AssetKey} {...this.state}/>
                    <InputBox name = 'Income' stateKey = 'income' iconName = 'attach-money' mask='money' description={''} _setState={this._setState.bind(this)} storageKey={T3IncomeKey} {...this.state}/>
                    <InputBox name = 'Income Growth' stateKey = 'incomeGrowth' iconName = 'attach-money' mask='only-numbers' description={'hi'} _setState={this._setState.bind(this)} storageKey={T3IncomeGrowthKey} {...this.state}/>
                    <InputBox name = 'Spending' stateKey = 'spend' iconName = 'credit-card' mask='money' description={''} _setState={this._setState.bind(this)} storageKey={T3SpendKey} {...this.state}/>
                    <InputBox name = 'Target' stateKey = 'target' iconName = 'trophy' mask='money' iconType='font-awesome' description={''} _setState={this._setState.bind(this)} storageKey={T3TargetKey} {...this.state}/>
                    <InputBoxHeader text="Portfolio Allocation"/>
                    <InputBox name = 'Stocks' stateKey = 'stocks' iconName ='home' mask='only-numbers' description={'hi'} _setState={this._setState.bind(this)} storageKey={T3StockAllocKey} {...this.state}/>
                    <InputBox name = 'Bonds' stateKey = 'bonds' iconName = 'attach-money' mask='only-numbers' description={''} _setState={this._setState.bind(this)} storageKey={T3BondAllocKey} {...this.state}/>
                    <InputBox name = 'Cash' stateKey = 'cash' iconName = 'attach-money' mask='only-numbers' description={'hi'} _setState={this._setState.bind(this)} storageKey={T3CashAllocKey} {...this.state}/>
                    <InputBoxHeader text = "Portfolio Returns"/>
                    <InputBox name = 'Stock Returns' stateKey = 'stockReturns' iconName = 'credit-card' mask='only-numbers' description={''} _setState={this._setState.bind(this)} storageKey={T3StockReturnKey} {...this.state}/>
                    <InputBox name = 'Bond Returns' stateKey = 'bondReturns' iconName = 'trophy' mask='only-numbers' iconType='font-awesome' description={''} _setState={this._setState.bind(this)} storageKey={T3BondReturnKey} {...this.state}/>
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


const styles = StyleSheet.create({
    mainScroll: {
      flex: 1,
      backgroundColor: mainFillColor,
      marginBottom: 30,
    },
    mainBackdrop: {
      flex: 1,
      backgroundColor: 'white',
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
        justifyContent: 'center'
    },
})