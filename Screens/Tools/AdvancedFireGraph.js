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
          color1: false,
          color2: false,
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
        var color1 = this.state.color1 ? 'rgba(123, 0, 115, 1)' :'black';
        var color2 = this.state.color2 ? 'blue' : 'green'

        const colors = [ color1, color2 ]
        const keys   = [ 'principal', 'growth' ]
        const svgs = [ 
            { onPress: () => console.log('pressed') },
            { onPress: () => console.log('color2')},
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