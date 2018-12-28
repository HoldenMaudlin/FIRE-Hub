import React, {Component} from 'react'
import { StackedAreaChart, Grid } from 'react-native-svg-charts'
import { Defs, Stop, LinearGradient } from 'react-native-svg'
import * as shape from 'd3-shape'
import { 
    View, 
    Text, 
    AsyncStorage,
    Button
 } from 'react-native'

 import { Left, Header } from 'native-base'
//import { _createFireGraph } from '../../Components/Functions/FireChartFunction'
import { AFstateKeys } from '../../Components/Constants/InputKeys'
import { mainColor, mainHeaderText, mainFillColor } from '../../Styles/ColorConstants'
import { Tool1Name } from '../../Components/Constants/ToolNames'
import MainBackHeader from '../../Components/MainBackHeader'
import { _createAdvancedFireGraph } from '../../Components/Functions/FireChartFunction'
import LayeredChartExample from '../../Components/LayeredChartExample'

class AdvancedFireGraph extends Component {

    constructor(props) {
      super(props)

      this.state = {
          didMount: false,
          data: [],
          color1pressed: false,
          color2pressed: false,
      }    
    }
    
    static navigationOptions = {
        header: null
    }       

    componentDidMount() {
        AFstateKeys.forEach((item) => {
            AsyncStorage.getItem(item.asyncKey).then((value) => {
                if(value !== null) {
                    this.setState({[item.stateKey]: value})
                }
            })
        })
        this.setState({didMount: true})
    }

    render() {   
        var data = _createAdvancedFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.target,
        this.state.incomeGrowth, this.state.stocks, this.state.bonds, this.state.cash, this.state.stockReturns, this.state.bondReturns)
        var age
        if (data.length !== 0) {
            age = data[data.length - 1].age
        }

        if (!this.state.color1pressed) {
            var color1 = 'rgba(45, 45, 45, 1)'
        } else {
            var color1 = 'rgba(45, 45, 45, 0.8 )'
        }

        if (!this.state.color2pressed) {
            var color2 = 'rgba(170, 0, 255,0.8)'
        } else {
            var color2 = 'rgba(0, 0, 0,0.8)'
        }

        const colors = [ color1, color2 ]
        const keys   = [ 'principal', 'growth' ]
        const svgs = [
            
            { onPressIn: () => this.setState({color1pressed: true}), onPressOut: () => this.setState({color1pressed: false}) },
            { onPressIn: () => this.setState({color2pressed: true}), onPressOut: () => this.setState({color2pressed: false}) },
        ]

        if (!this.state.didMount) {
            return (
            <View>
                <Text>
                    Loading
                </Text>
            </View>
            )
        } else {
            return (
                <View style={{flex:1}}>
                    <MainBackHeader  title = 'FIRE Graph' backButtonName = 'Inputs' navigation={this.props.navigation}/>
                    <StackedAreaChart
                        style={{ height: 400, paddingVertical: 16 }}
                        data={ data }
                        keys={ keys }
                        colors={ colors }
                        curve={ shape.curveNatural }
                        svgs={ svgs }
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                        >
                        <Grid/>
                    </StackedAreaChart>
                    <View style={{flex: 1, backgroundColor: 'green'}}>
                        <Text>You are on track to achieve your retirement goal by age {age}</Text>
                    </View>
                </View>
            )
        }
    }
}

export default AdvancedFireGraph