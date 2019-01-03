import React from 'react'
import { LineChart, Path, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Circle, Rect, Line } from 'react-native-svg'

import { AsyncStorage, View, StyleSheet, Dimensions, Text } from 'react-native'
import { _createInvestment1Line } from '../../Components/Functions/FireChartFunction'
import { BEstateKeys } from '../../Components/Constants/InputKeys'
import { mainFillColor, mainAccentColor } from '../../Styles/ColorConstants';
import MainBackHeader from '../../Components/MainBackHeader'


class Tool2ScreenGraph extends React.PureComponent {

    constructor (props) {
        super(props)
        this.state = {
            // Displays activity indicator until mounted
            didMount: false,

            // Input Variables
            amount: '',
            returns1: '',
            fees1: '',
            returns2: '',
            fees2: '',
            taxes: '',

            // Prevents line from being visible at start
            lineX: -200,
            lineXindex: '',
        }
    }

    // Hides native header for custom header
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        // Pull values from Async storage
        BEstateKeys.forEach((item) => {
            AsyncStorage.getItem(item.asyncKey).then((value) => {
                if (value !== null) {
                    this.setState({[item.stateKey]: value})
                }
            })
        })
        this.setState({didMount: true})
    }

    // Handling of Touch Responsiveness for the Graph
    // Currently does not support dragging, will add feature in next version
    handlePress = (evt, data, x) => {
        var val = []
        data.map((value, index) => {
            val.push(Math.abs(evt.nativeEvent.locationX - x(index)))
        })
        var min = Math.min.apply(Math, val)
        data.map((value, index) => {
            if (min === Math.abs(evt.nativeEvent.locationX - x(index))) {
                this.setState({lineX: x(index), lineXindex: index})
            }
        })
        return true
    }

    render() {
        // Send data through function to create the two sets of data
        var data = _createInvestment1Line(this.state.amount, this.state.returns1, this.state.fees1, this.state.returns2, this.state.fees2, this.state.taxes)
        var data1 = []
        var data2 = []
        // Separate the data and find the Max and Min for the graph
        for (var i = 0; i < data.length; i++) {
            data1.push(data[i].cur)
            data2.push(data[i].pot)
        }
        const graphMin = Math.min.apply(Math, data2)
        const graphMax = Math.max.apply(Math, data1)

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

        return (
            <View style = {{flex:1, backgroundColor: mainFillColor}} >
                <MainBackHeader navigation = {this.props.navigation} title = 'Break Even' backButtonName = 'Inputs' />
                <View style={styles.graphContainer}>
                    <YAxis
                        data={data2}
                        contentInset={ { top: 20, bottom: 20 }  }
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={ 7 }
                        formatLabel={ value => `${value/1000}k` }
                    />
                    <View style={{flex: 1}}>
                        <LineChart
                            style={ { flex: 1 } }
                            data={ data1 }
                            svg={{ stroke: 'rgb(0, 65, 244)', strokeWidth: 2, }}
                            contentInset={ { top: 20, bottom: 20, left: 5, right: 5 } }
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
                            contentInset={ { top: 20, bottom: 20, left: 5, right: 5 } }
                            gridMin={graphMin}
                            gridMax={graphMax}
                            >
                            <Decorator/>
                            <LineCreator/>
                        </LineChart>
                    </View>
                </View>
                <View style={{height: 40}}>
                    <Text>{data1[this.state.lineXindex]}</Text>
                    <Text>{data2[this.state.lineXindex]}</Text>
                </View>
            </View>
        )
    }

}

export default Tool2ScreenGraph

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
})