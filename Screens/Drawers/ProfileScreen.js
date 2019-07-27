/*
 *
 * SCREEN NOT IN USE AS OF v1.0.2
 *  
 */


// Package Imports
import React, {Component} from "react"
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
// Custom imports  
import InputBox from '../../Components/InputBox'
import InputBoxHeader from '../../Components/InputBoxHeader'
import { mainFillColor } from "../../Styles/ColorConstants";
import MainDrawerHeader from '../../Components/MainDrawerHeader'
import { ScrollView } from "react-native-gesture-handler";
import { 
  ageDescription, 
  assetsDescription, 
  incomeDescription, 
  incomeGrowthDescription, 
  totalSpendingDescription, 
  targetDescription, 
  stockAllocDescription, 
  bondAllocDescription, 
  cashAllocDescription
} from '../../Components/Constants/InputDescriptions';
import { User, UserKeys } from '../../Components/Profile'

// DESC:
// Profile screen placeholder
class ProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      age: '',
      income: '',
      assets: '',
      spend: '',
      target: '',
      incomeGrowth: '',
      stocks: '',
      bonds: '',
      cash: '',
    }
  }
  
  componentDidMount() {
    for (var item in UserKeys) {
      if (UserKeys.hasOwnProperty(item)) {
        AsyncStorage.getItem(item.asyncKey).then((value) => {
          this._setState(item.stateKey, value)
        })
      }
    }
  }

  // updates state callback function
  _setState = (value, stateKey) => {
    this.setState({[stateKey]: value})
  }    

  render() {
    return(
      <View style = {styles.container}>
        <MainDrawerHeader title = 'Profile' navigation = {this.props.navigation}/>
        <ScrollView>
          <View style={styles.wrapper}>
            <InputBoxHeader text="Personal Information"/>
            <InputBox name = 'Age' stateKey = 'age' iconName = 'person' mask='only-numbers' precision={0} description={ageDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.age.asyncKey} {...this.state}/>
            <InputBox name = 'Assets' stateKey = 'assets' iconName ='home' mask='money' precision={0} description={assetsDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.assets.asyncKey} {...this.state}/>
            <InputBox name = 'Income' stateKey = 'income' iconName = 'attach-money' mask='money' precision={0} description={incomeDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.income.asyncKey} {...this.state}/>
            <InputBox name = 'Income Growth' placeholder='Growth %' stateKey = 'incomeGrowth' percent={true} iconName = 'mood' mask='only-numbers' precision={2} description={incomeGrowthDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.incomeGrowth.asyncKey} {...this.state}/>
            <InputBox name = 'Spending' stateKey = 'spend' iconName = 'credit-card' mask='money' precision={0} description={totalSpendingDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.spend.asyncKey} {...this.state}/>
            <InputBox name = 'Target' stateKey = 'target' iconName = 'trophy' mask='money' precision={0} iconType='font-awesome' description={targetDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.target.asyncKey} {...this.state}/>
            <InputBoxHeader text="Portfolio Allocation"/>
            <InputBox name = 'Stocks' placeholder='Stocks %' stateKey = 'stocks' iconName ='graph' iconType='simple-line-icon' mask='only-numbers' precision={0} description={stockAllocDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.stocks.asyncKey} {...this.state}/>
            <InputBox name = 'Bonds' placeholder='Bonds %' stateKey = 'bonds' iconName = 'page' iconType='foundation' mask='only-numbers' precision={0} description={bondAllocDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.bonds.asyncKey} {...this.state}/>
            <InputBox name = 'Cash' placeholder='Cash %' stateKey = 'cash' iconName = 'coin' iconType='material-community' mask='only-numbers' precision={0} description={cashAllocDescription} _setState={this._setState.bind(this)} storageKey={UserKeys.cash.asyncKey} {...this.state}/>        
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainFillColor,
  },
  wrapper: {
    flex: 1,
    paddingBottom: 300
  }
})