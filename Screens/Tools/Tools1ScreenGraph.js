/*
 * Summary.
 * Basic Fire graph page
 * 
 * Return.
 * Fetches user input data from storage and displays it as graph
 * 
 */

// Package imports
import React, {Component} from 'react'
import { LineChart, Grid, YAxis, } from 'react-native-svg-charts'
import { Rect, Line, Circle } from 'react-native-svg'
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity
 } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { 
    Table, 
    Row 
} from 'react-native-table-component';
import Collapsible from 'react-native-collapsible'
import DataTable from '../../Components/DataTable'

// Custom imports
import HelpView from '../../Components/HelpView'
import { BFstateKeys } from '../../Components/Constants/InputKeys'
import { mainColor, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
import MainBackHeader from '../../Components/MainBackHeader'
import { _createFireGraph } from '../../Components/Functions/FireChartFunction'

// DESC: 
// Retrieves inputs from stoage, passes them through a funciton, and displays data back to user
class Tool1ScreenGraph extends Component {

    constructor(props) {
      super(props)

      this.state = {
          didMount: false,

          // Input vars
          age: this.props.navigation.state.age,
          income: this.props.navigation.state.income,
          spend: this.props.navigation.state.spend,
          target: this.props.navigation.state.target,
          assets: this.props.navigation.state.assets,
          data: [],

          // Graph vars
          lineX: 5 ,
          lineXindex: 0,

          hideData: true,
      }    
    }
    
    // hides native header
    static navigationOptions = {
        header: null
    }       

    // Retrieve data from storage on mount
    componentDidMount() {        
        BFstateKeys.forEach((item) => {
            AsyncStorage.getItem(item.asyncKey).then((value) => {
                if (value !== null) {
                    this.setState({[item.stateKey]: value})
                }
            })
        })
        this.setState({didMount: true})
    }

    // Handling of pressing the graph
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
        // Information to be passed to the Tools Help Screen
        const helpLines = [
            { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
            { key: 2, icon: 'attach-money', iconType: '', text: "The graph displays the amount (in thousands) on the Y-Axis!"},
            { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Press the graph to view the data for a specific year!"},
        ]
        var helpView = <HelpView helpLines={helpLines}/>
    
        // Configure the data for the graph
        var data = _createFireGraph(this.state.age, this.state.assets, this.state.income, this.state.spend, this.state.target)
        var data1 = []
        var data2 = []

        // Variables to be passed to the Table Display
        var dataTableYears = []
        var dataTableGrowth = []
        var dataTablePrin = []
        var dataTableSav = []
        
        for (var i = 0; i < data.length; i++) {
            data1.push(data[i].principal)
            data2.push(data[i].total)
            dataTablePrin.push(MaskService.toMask('money', data[i].principal, {unit: '$', separator: '.', delimiter: ',',  precision: 0,}))
            dataTableSav.push(MaskService.toMask('money', data[i].total, {unit: '$', separator: '.', delimiter: ',',  precision: 0,}))
            dataTableGrowth.push(MaskService.toMask('money', data[i].total - data[i].principal, {unit: '$', separator: '.', delimiter: ',',  precision: 0,}))
            dataTableYears.push(parseInt(this.state.age) + i + 1)
        }
        const graphMin = Math.min.apply(Math, data1)
        const graphMax = Math.max.apply(Math, data2)

        // Masks for active selected node
        var activePrin = ''
        var activeSav = ''
        var activeGrowth = ''
        if (data1[this.state.lineXindex] !== undefined) { activePrin = MaskService.toMask('money', data1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
        if (data2[this.state.lineXindex] !== undefined) { activeSav = MaskService.toMask('money', data2[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
        if (data2[this.state.lineXindex] !== undefined) { activeGrowth = MaskService.toMask('money', data2[this.state.lineXindex] - data1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }

        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ data.length > 35 ? 0 : 3 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                />
            ))
        }

        var LineCreator = ({x, width, data}) => {
            return(
                <Rect
                    x = '0'
                    y = '0'
                    width = {width}
                    height = '400'
                    fill = 'rgba(0,0,0,0)'
                    onStartShouldSetResponder={(evt) => this.handlePress(evt, data, x)}
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
                <View style={{flex:1, backgroundColor: mainFillColor}}>
                    <MainBackHeader  title = 'FIRE Basic' backButtonName = 'Inputs' navigation={this.props.navigation} helpView={helpView}/>
                    <ScrollView>
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
                        <View>
                            <Text style={styles.goalText}>You are on track to reach your retirement goal in {data1.length} years! </Text>
                            <Table borderStyle={{borderWidth: 0.01, }}>
                                <Row textStyle={styles.headText} style={styles.headStyle} flexArr={[1, 2, 2, 2]} data={['Age', 'Savings', 'Principal', 'Growth']}/>
                                <Row textStyle={styles.columnText} flexArr={[1, 2, 2, 2]} data={[this.state.lineXindex + 1 + parseInt(this.state.age), activeSav, activePrin, activeGrowth]}/>
                            </Table>      
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => this.setState({hideData: !this.state.hideData})}>
                                    <Text style={styles.buttonText}>{this.state.hideData ? 'Show' : 'Hide'} Data</Text>
                                </TouchableOpacity>        
                            </View>
                            <Collapsible collapsed={this.state.hideData}>
                                <View>
                                    <DataTable tableHead={['Age', 'Savings', 'Principal', 'Growth']} flexArr={[1, 2, 2, 2]} tableData={[dataTableYears, dataTableSav, dataTablePrin, dataTableGrowth]}/>
                                </View>
                            </Collapsible>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

export default Tool1ScreenGraph

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
    buttonContainer: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mainColor,
        borderRadius: 5,
        width: 90,
        height: 40,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    buttonText: {
        color: mainFillColor,
    },
    headStyle: {
        height: 30,
    },
    headText: {
        textAlign: 'center',
        color: mainColor,
        fontSize: 16,
        fontWeight: '500',
    },
    columnText: {
        textAlign: 'center',
        fontWeight: '500'
    },
    goalText: {
        textAlign: 'center', 
        margin: 10,
        marginTop: 20, 
    },
})