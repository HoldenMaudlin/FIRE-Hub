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
import { MCIncomeKey, MCAssetsKey, MCSpendKey, MCReturnsKey, MCSimsKey, MCLengthKey, MCstateKeys } from '../../Components/Constants/InputKeys'
import { _createMonteCarloData } from '../../Components/Functions/MonteCarlo'
import { totalSpendingDescription, ageDescription, incomeDescription, assetsDescription, returnsDescription, simsDescription, lengthDescription } from '../../Components/Constants/InputDescriptions'
import DismissKeyboardView from '../../Components/DismissKeyboardView'
import { mainColor, mainHeaderText, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
import { Tool1Name } from '../../Components/Constants/ToolNames'
import InputBox from '../../Components/InputBox'
import InputBoxHeader from '../../Components/InputBoxHeader'
import HelpView from '../../Components/HelpView'
import { incomeIconName } from '../../Components/Constants/IconNames'
import MainBackHeader from '../../Components/MainBackHeader';


var { height, width } = Dimensions.get('window')

class MonteCarloMain extends Component {
    
    constructor() {
        super()

        this.state = {
            didMount: false,
            allInputted: false,
            warningText: '',

            income: '',
            assets: '',
            spend: '',
            sims: '',
            length: '',
            returns: ''
        }    
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        MCstateKeys.forEach((item) => {
            AsyncStorage.getItem(item.asyncKey).then((value) => {
                if (value !== null) {
                this.setState({[item.stateKey]: value})
                }
            })
        })
        this.setState({didMount: true})
    }

    _updateAsyncValues() {
        MCstateKeys.forEach((item) => {
            AsyncStorage.setItem(item.asyncKey, this.state[item.stateKey] + '')
        })
    }

    componentWillUnmount(){
        this._updateAsyncValues()
    }

    _updateStateValues() {
        MCstateKeys.forEach((item) => {
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
            this.props.navigation.navigate('MonteCarloGraph')
            this.setState({warningText: ''})
        } else {
            this.setState({warningText: 'Please Enter All Fields!'})
        }
    } 

    _setState = (value, stateKey) => {
        this.setState({[stateKey]: value})
    }

    // Functions to regulate navigation
    _checkIfEmpty () {
        if (this.state.returns === '' || this.state.assets === '' || this.state.income === '' || this.state.spend === '' || this.state.sims === '' || this.state.length === '') {
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
                <MainBackHeader title = "Monte Carlo" backButtonName = "Tools" navigation = {this.props.navigation} helpView={helpView}/>
                <ScrollView style={styles.mainScroll}>                            
                    <InputBoxHeader text='Personal Information' />
                    <InputBox name = 'Assets' stateKey = 'assets' iconName ='home' mask='money' percent={false} precision={0} description={assetsDescription} _setState={this._setState.bind(this)} storageKey={MCAssetsKey} {...this.state}/>
                    <InputBox name = 'Income' stateKey = 'income' iconName = 'attach-money' mask='money' percent={false} precision={0} description={incomeDescription} _setState={this._setState.bind(this)} storageKey={MCIncomeKey} {...this.state}/>
                    <InputBox name = 'Spending' stateKey = 'spend' iconName = 'credit-card' mask='money' percent={false} precision={0} description={totalSpendingDescription} _setState={this._setState.bind(this)} storageKey={MCSpendKey} {...this.state}/>
                    <InputBoxHeader text='Simulation Information' />
                    <InputBox name = 'Returns' stateKey = 'returns' iconName = 'trending-up' percent={true} placeholder='Returns %' precision={2} description={returnsDescription} _setState={this._setState.bind(this)} storageKey={MCReturnsKey} {...this.state}/>
                    <InputBox name = 'Simulations' stateKey = 'sims' iconName = 'webhook' iconType='material-community' mask='only-numbers' percent={false} maxValue={10000} placeholder='Sims' precision={0} description={simsDescription} _setState={this._setState.bind(this)} storageKey={MCSimsKey} {...this.state}/>
                    <InputBox name = 'Length' stateKey = 'length' iconName = 'calendar-question' iconType='material-community' mask='only-numbers' percent={false} maxValue={50} precision={0} description={lengthDescription} _setState={this._setState.bind(this)} storageKey={MCLengthKey} {...this.state}/>
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

export default MonteCarloMain

const styles = StyleSheet.create({
    mainScroll: {
        flex: 1,
        backgroundColor: mainFillColor,
        paddingBottom: 30,
    },
    mainBackdrop: {
        flex: 1,
        backgroundColor: mainFillColor,
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
