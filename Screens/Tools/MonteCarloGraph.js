import React, {Component} from 'react'
import { YAxis, Grid, LineChart } from 'react-native-svg-charts'
import { Rect, Line, Circle } from 'react-native-svg'
import { 
    View, 
    Text, 
    AsyncStorage,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'

import HelpView from '../../Components/HelpView'
import { MCstateKeys } from '../../Components/Constants/InputKeys'
import { mainColor, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
import MainBackHeader from '../../Components/MainBackHeader'
import { _createMonteCarloData } from '../../Components/Functions/MonteCarlo'
import { MaskService } from 'react-native-masked-text'
import { 
    Table, 
    Row 
} from 'react-native-table-component';
import Collapsible from 'react-native-collapsible'
import DataTable from '../../Components/DataTable'


class MonteCarloGraph extends Component {

    constructor(props) {
      super(props)

      this.state = {
        didMount: false,

        data: [],
        graphData1: [],
        graphData2: [],
        graphData3: [],
        tableData1: [],
        tableData2: [],
        tableData3: [],

        dataLoaded: false,
        graphLoaded: false,
        sims: '',
        length: '',

        lineX: 5 ,
        lineXindex: 0,

        hideData: true,
    }
}
    
    static navigationOptions = {
        header: null
    }       

    componentDidMount() {
        this.getAsyncData().then((values) => {
            var data = _createMonteCarloData(values[0], values[1], values[2], values[3], values[4], values[5])
            this.setState({sims: values[4]})
            this.setState({length: values[5]})
            this.setState({data: data})
            this.setState({graphData1: data[0]})
            this.setState({graphData2: data[1]})
            this.setState({graphData3: data[2]})
            this.setState({dataLoaded: true})
        })
    }

    getAsyncData= async() => {
        var promises = []
        for (var i = 0; i < MCstateKeys.length; i++) {
            await AsyncStorage.getItem(MCstateKeys[i].asyncKey).then((val) => {
                promises.push(val)
            })
        }
        return Promise.all(promises)
    }
    

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
        // Information to be passed to the Monte Carlo Help Screen
        const helpLines = [
            { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
            { key: 2, icon: 'attach-money', iconType: '', text: "The graph displays the amount (in thousands) on the Y-Axis!"},
            { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Press the graph to view the data for a specific year!"},
        ]
        var helpView = <HelpView helpLines={helpLines}/>
        if(this.state.dataLoaded === true) {
            // Configure data for the graph
            var tableData1 = []
            var tableData2 = []
            var tableData3 = []
            var dataTableYears = []
            for (var i = 11; i < this.state.graphData1.length + 11; i += 12) {
                tableData1.push(MaskService.toMask('money', this.state.graphData1[i], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}))
                tableData2.push(MaskService.toMask('money', this.state.graphData2[i], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}))
                tableData3.push(MaskService.toMask('money', this.state.graphData3[i], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}))
                dataTableYears.push((i - 11)/12 + 1)  
            }
            var graphMin = Math.min.apply(Math, this.state.graphData1)
            var graphMax = Math.max.apply(Math, this.state.graphData3)   
        
            // Masks for active selected node
            var active1 = ''
            var active2 = ''
            var active3 = ''
            if (this.state.graphData1[this.state.lineXindex] !== undefined) { active1 = MaskService.toMask('money', this.state.graphData1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
            if (this.state.graphData2[this.state.lineXindex] !== undefined) { active2 = MaskService.toMask('money', this.state.graphData2[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }    
            if (this.state.graphData3[this.state.lineXindex] !== undefined) { active3 = MaskService.toMask('money', this.state.graphData3[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
        }

        // Function adding circles to all data points
        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }

                    // Prevents graph being cluttered with circles there are too many data points
                    r={ this.state.length * 12 > 35 ? 0 : 3 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
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

        if (this.state.dataLoaded !== true) {
            return (
            <View style={styles.container}>
                <MainBackHeader  title = 'FIRE Graph' backButtonName = 'Inputs' navigation={this.props.navigation} helpView={helpView}/>
                <View style={styles.activityContainer}>
                    <ActivityIndicator/>
                    <Text style={{color: mainAccentColor, marginTop: 10,}}>For large inputs, allow up to 10 seconds!</Text>
                </View>
            </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <MainBackHeader  title = 'FIRE Graph' backButtonName = 'Inputs' navigation={this.props.navigation} helpView={helpView}/>
                    <ScrollView>
                        <View style={styles.graphContainer}>
                            <YAxis
                                data={this.state.graphData3}
                                contentInset={ { top: 20, bottom: 20 }  }
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={ 7 }
                                formatLabel={ value => `${value/1000}k` }
                            />
                            <View style={{flex: 1,}}>
                                <LineChart
                                    style={{ flex: 1 }}
                                    data={ this.state.graphData1 }
                                    svg={{ stroke: 'rgb(0, 0, 200)', strokeWidth: 2, }}
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
                                    data={ this.state.graphData2 }
                                    svg={{ stroke: 'rgb(200, 0, 0)', strokeWidth: 2, }}
                                    contentInset={{ top: 20, bottom: 20, left: 5, right: 5 }}
                                    gridMin={graphMin}
                                    gridMax={graphMax}
                                    >
                                    <Decorator/>
                                </LineChart>
                                <LineChart
                                    style={ StyleSheet.absoluteFill }
                                    data={ this.state.graphData3 }
                                    svg={{ stroke: 'rgb(0, 200, 0)', strokeWidth: 2, }}
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
                            <Text style={styles.goalText}>Showing the 10%, 50%, and 90% outcomes!</Text>
                            <Table borderStyle={{borderWidth: 0.01, }}>
                                <Row textStyle={styles.headText} style={styles.headStyle} flexArr={[1, 2, 2, 2]} data={['Year', '10%', '50%', '90%']}/>
                                <Row textStyle={styles.columnText} flexArr={[1, 2, 2, 2]} data={[Math.floor(this.state.lineXindex /12 ) + 1, active1, active2, active3]}/>
                            </Table>      
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => this.setState({hideData: !this.state.hideData})}>
                                    <Text style={styles.buttonText}>{this.state.hideData ? 'Show' : 'Hide'} Data</Text>
                                </TouchableOpacity>        
                            </View>
                            <Collapsible collapsed={this.state.hideData}>
                                <View>
                                    <DataTable tableHead={['Year', '10%', '50%', '90%']} flexArr={[1, 2, 2, 2]} tableData={[dataTableYears, tableData1, tableData2, tableData3]}/>
                                </View>
                            </Collapsible>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}


export default MonteCarloGraph


const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: mainFillColor
    },
    activityContainer: {
        flex: 1,
        backgroundColor: mainFillColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
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