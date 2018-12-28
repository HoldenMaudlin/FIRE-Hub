/*import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
} from 'react-native';

import FlipCard from 'react-native-flip-card';
import StackedAreaExample from './chart'
import Tools1ScreenBack from './Tools1ScreenBack'
import Tools3Sreen from './Tools3Screen'

import { ageKey, assetKey, incomeKey, spendKey, retireKey, rateKey } from '../../Components/Constants/InputKeys'
import { parse } from '../../node_modules/path-to-regexp';

var { height, width } = Dimensions.get('window')

export default class Tool1Screen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      flip: false,
      didMount: false,
      age: 25,
      assets: 100000,
      income: 80000,
      spend: 40000,
      retireSpend: 30000,
      rate: 7,
      data: [ ]
    }
  }

  _updateAsyncValues() {
    AsyncStorage.getItem(ageKey).then((age) => {
      age = parseInt(age, 10)
      this.setState({age: age})
    })
    AsyncStorage.getItem(incomeKey).then((income) => {
      income = parseInt(income, 10)
      this.setState({income: income})
    })
    AsyncStorage.getItem(spendKey).then((spend) => {
      spend = parseInt(spend,10)
      this.setState({spend: spend})
    })
    AsyncStorage.getItem(retireKey).then((retireSpend) => {
      retireSpend = parseInt(retireSpend, 10) 
      this.setState({retireSpend: retireSpend})
    })
    AsyncStorage.getItem(rateKey).then((rate) => {
      rate = parseInt(rate, 10)
      this.setState({rate: rate})
    })
    AsyncStorage.getItem(assetKey).then((assets) => {
      assets = parseInt(assets, 10)
      this.setState({assets: assets})
    })
  }

  _createFireGraph( age, assets, income, spend, retireSpend, rate  ) {
    // Convert inputs from strings to numbers
    console.log("function called")
    rate = rate/100;
    var target = ( retireSpend / rate );
    var i = 0;
    var principal = assets;
    var savings = assets;

    var data = [];

    while ( savings < target ) {
        principal += ( income - spend );
        savings *= 1.07;
        savings += ( income - spend );

        var node = {
            age: new Date(i,0,1),
            principal: principal,
            growth: ( savings - principal )
        }
        console.log(savings)
        data.push(node);
        i++;
        //console.log(node.age)
    }
    return data;
  }       

   _onPressButton(){ 
    this.setState({flip: !this.state.flip})
    this._updateAsyncValues()
    var data1 = this._createFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.retireSpend, this.state.rate)
    console.log(JSON.stringify(data1)) 
    this.setState({data: data1})
  } 

  componentDidMount() {
    this._updateAsyncValues()
    var data1 = this._createFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.retireSpend, this.state.rate)
    console.log(JSON.stringify(data1)) 
    this.setState({data: data1})
    console.log("mounting done")
    this.setState({didMount: true})
  }

  render() {
    if (!this.state.didMount) {
      return (
        <View>
          <Text> Loading </Text>
        </View>
      )
    } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <FlipCard
              flip={this.state.flip}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              clickable={false}
              style={styles.card}
              alignHeight={true}
              alignWidth={true}
              onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
            >
              {/* Face Side }
              <View style={styles.face}>
                {/*<Tools1ScreenFront />}
              </View>
              {/* Back Side }
              <View style={styles.back}>
                {/*Tools1ScreenBack {...this.state}}
              </View>
            </FlipCard>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this._onPressButton() }
              >
              <Text style={styles.buttonText}>Flip</Text>
            </TouchableOpacity>
          </View>

    

        </ScrollView>
      </View>
    )
  }
  }
}


//var data = _createFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.retireSpend, this.state.rate)
// this.setState({data: data})

var CARDS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    flex:1,
    width: width,
    height: height * .8,
  },
  face: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    flex:1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    marginTop: 30,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#007AFF',
    borderColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  img: {
    flex: 1,
    height: 64
  }
});
AppRegistry.registerComponent('FlipCardExample', () => FlipCardExample);
*/