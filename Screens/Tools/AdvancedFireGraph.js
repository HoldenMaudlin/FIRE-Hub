import React, {Component} from 'react'
import { YAxis, Grid, LineChart } from 'react-native-svg-charts'
import { Rect, Line, Circle } from 'react-native-svg'
import * as shape from 'd3-shape'
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet,
 } from 'react-native'

 import { Left, Header } from 'native-base'
//import { _createFireGraph } from '../../Components/Functions/FireChartFunction'
import { AFstateKeys } from '../../Components/Constants/InputKeys'
import { mainColor, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
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


    handlePress = (evt, data, x) => {
        var val = []
        console.log('loc', evt.nativeEvent.locationX)
        data.map((value, index) => {
            val.push(Math.abs(evt.nativeEvent.locationX - x(index)))
        })
        var min = Math.min.apply(Math, val)
        console.log(min)
        data.map((value, index) => {
            if (min === Math.abs(evt.nativeEvent.locationX - x(index))) {
                console.log(x(index), index)
                this.setState({lineX: x(index), lineXindex: index})
            }
        })
        return true
    }

    render() {   
        var data = _createAdvancedFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.target,
        this.state.incomeGrowth, this.state.stocks, this.state.bonds, this.state.cash, this.state.stockReturns, this.state.bondReturns)
        var data1 = []
        var data2 = []
        console.log(data)
        for (var i = 0; i < data.length; i++) {
            data1.push(data[i].principal)
            data2.push(data[i].savings)
        }
        console.log(data.length)
        const graphMin = Math.min.apply(Math, data1)
        const graphMax = Math.max.apply(Math, data2)
        // Function adding circles to all data points
        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }

                    // Prevents graph being cluttered with circles there are too many data points
                    r={ data.length > 35 ? 0 : 3 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                    onPress={() => console.log('press')}
                />
            ))
        }

        // Invisible rectangle to capture user touch and set state of Line
        var LineCreator = ({x, width, data}) => {
            return(
                <Rect
                    x = '0'
                    y = '0'
                    width = {width}
                    height = '400'
                    fill = 'rgba(0,0,0,0)'
                    onStartShouldSetResponder={(evt) => this.handlePress(evt, data, x)}
                    //onMoveShouldSetResponder = {(evt) => this.onMoveShouldSetResponder(evt)}
                    //onResponderMove={(evt) => this.handleResponderMove(evt)}
                    //handleResponderGrant={(evt) => this.handleResponderGrant(evt)}
                />
            )
        }


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
                    <View style={styles.graphContainer}>
                        <YAxis
                            data={data2}
                            contentInset={{ top: 20, bottom: 20 }}
                            svg={{
                                fill: 'grey',
                                fontSize: 10,
                            }}
                            numberOfTicks={ 7 }
                            formatLabel={ value => `${value/1000}k` }
                        />
                        <View style={{flex: 1}}>
                            <LineChart
                                style={{ flex: 1 }}
                                data={ data1 }
                                svg={{ stroke: 'rgb(0, 65, 244)', strokeWidth: 2, }}
                                contentInset={{ top: 20, bottom: 20, left: 5, right: 5 }}
                                gridMin={graphMin}
                                gridMax={graphMax}
                                >
                                <Grid svg={{stroke: mainAccentColor}}/>
                                <Line
                                    x1={this.state.lineX}
                                    x2={this.state.lineX}
                                    y1='0'
                                    y2='400'
                                    stroke='red'
                                    strokeWidth='2'
                                />
                                <Decorator/>
                            </LineChart>
                            <LineChart
                                style={ StyleSheet.absoluteFill }
                                data={ data2 }
                                svg={{ stroke: 'rgb(200, 0, 0)', strokeWidth: 2, }}
                                contentInset={{ top: 20, bottom: 20, left: 5, right: 5 }}
                                gridMin={graphMin}
                                gridMax={graphMax}
                                >
                                <Decorator/>
                                <LineCreator/>
                            </LineChart>
                        </View>
                    </View>
                    <View style={{flex: 1, backgroundColor: 'green'}}>
                        <Text>You are on track to achieve your retirement goal by age {parseInt(this.state.age) + data.length - 1}!</Text>
                    </View>
                </View>
            )
        }
    }
}

export default AdvancedFireGraph


const styles = StyleSheet.create({
    graphContainer: { 
        backgroundColor: mainFillColor,
        height: 400, 
        margin: 10,         
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        flexDirection: 'row'
    },
    bottomContainer: {
        flex: 1, 
    },
    outputContainer: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})