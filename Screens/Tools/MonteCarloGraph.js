/*
 * Summary.
 * Monte Carlo graph page
 * 
 * Return.
 * Fetches user input data from storage and displays it as graph
 * 
 */


// Package imports
import React, {Component} from 'react'
import { YAxis, Grid, LineChart } from 'react-native-svg-charts'
import { Rect, Line } from 'react-native-svg'
import { 
    View, 
    Text, 
    AsyncStorage,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { 
    Table, 
    Row 
} from 'react-native-table-component';
import Collapsible from 'react-native-collapsible'
import DataTable from '../../Components/DataTable'

// Custom imports
import HelpView from '../../Components/HelpView'
import { MCstateKeys } from '../../Components/Constants/InputKeys'
import { mainColor, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants'
import MainBackHeader from '../../Components/MainBackHeader'
import { _createMonteCarloData } from '../../Components/Functions/MonteCarlo'
import { MaskService } from 'react-native-masked-text'
import { encode } from 'base-64';

import { apiToken, baseEndpoint } from '../../secrets.js';
const mcEndpoint = baseEndpoint + 'formulas/montecarlo';

class MonteCarloGraph extends Component {

    constructor(props) {
      super(props)

      this.state = {
        didMount: false,

        // Data holders
        data: [],
        graphData1: [],
        graphData2: [],
        graphData3: [],

        tableData1: [],
        tableData2: [],
        tableData3: [],
        dataTableYears: 0,

        // Input holders
        dataLoaded: false,
        graphLoaded: false,
        sims: '',
        length: '',

        // Graph vars
        lineX: 5 ,
        lineXindex: 0,
        graphMin: 0,
        graphMax: 0,
        graphIsPressed: false,

        hideData: true,
    }
}
    
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        const data = {'mc': this.props.navigation.getParam('data', {})};
        this.setState({
            didMount: false,
            sims: data.mc.sims,
            length: data.mc.length,
        });
        const requestObject = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic '+ apiToken, 
            },
            body: JSON.stringify(data)
        }
        fetch(mcEndpoint, requestObject)
        .then((res) => { 
            try {
                return res.json();
            } catch (e) {
                return -1;
            }
        })
        .then((data) => {
            if (data == -1) return;
            var tableData1 = []
            var tableData2 = []
            var tableData3 = []
            var dataTableYears = []
           
            // Populate table data
            for (var i = 11; i < data.low.length + 11; i += 12) {
                tableData1.push(MaskService.toMask('money', data.low[i], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}));
                tableData2.push(MaskService.toMask('money', data.mid[i], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}));
                tableData3.push(MaskService.toMask('money', data.high[i], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}));
                dataTableYears.push((i - 11)/12 + 1);
            }
            this.setState({
                graphData1: data.low,
                graphData2: data.mid,
                graphData3: data.high,
                tableData1: tableData1,
                tableData2: tableData2,
                tableData3: tableData3,
                dataTableYears: dataTableYears,
                graphMin: Math.min.apply(Math, data.low),
                graphMax: Math.max.apply(Math, data.high),
                dataLoaded: true,
            })
        })
        .done();
    }

    helpLines = [
        { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
        { key: 2, icon: 'attach-money', iconType: '', text: "The graph displays the amount (in thousands) on the Y-Axis!"},
        { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Press the graph to view the data for a specific year!"},
    ]

    // Invisible rectangle to capture user touch and set state of Line
    handleResponderRelease = (evt) => {
        this.setState({graphIsPressed: false});
    }

    // handles touching of the graph
    handleGraphPress = (evt, data, x) => {
        this.setState({graphIsPressed: true});
        var val = Math.floor(data.length * evt.nativeEvent.locationX/(x(data.length - 1)))
        if (val > data.length - 1) val = data.length - 1;
        if (val < 0) val = 0;
        this.setState({lineX: x(val), lineXindex: val})
        return true
    }

    LineCreator = ({x, width, data}) => {
        return(
            <Rect
                x = '0'
                y = '0'
                width = {width}
                height = '400'
                fill = 'rgba(0,0,0,0)'
                onStartShouldSetResponder={(evt) => this.handleGraphPress(evt, data, x)}
                onResponderMove={(evt) => this.handleGraphPress(evt, data, x)}
                onResponderRelease={(evt) => this.handleResponderRelease(evt)}
            />
        )
    }

    helpView = <HelpView helpLines={this.helpLines}/>

    render() { 
        // Information to be passed to the Monte Carlo Help Screen

        if(this.state.dataLoaded === true) {
            // Masks for active selected node
            var active1 = ''
            var active2 = ''
            var active3 = ''
            if (this.state.graphData1[this.state.lineXindex] !== undefined) { active1 = MaskService.toMask('money', this.state.graphData1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
            if (this.state.graphData2[this.state.lineXindex] !== undefined) { active2 = MaskService.toMask('money', this.state.graphData2[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }    
            if (this.state.graphData3[this.state.lineXindex] !== undefined) { active3 = MaskService.toMask('money', this.state.graphData3[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
        }

        if (this.state.dataLoaded !== true) {
            return (
            <View style={styles.container}>
                <MainBackHeader  title = 'FIRE Graph' backButtonName = 'Inputs' navigation={this.props.navigation} helpView={this.helpView}/>
                <View style={styles.activityContainer}>
                    <ActivityIndicator/>
                </View>
            </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <MainBackHeader  title = 'FIRE Graph' backButtonName = 'Inputs' navigation={this.props.navigation} helpView={this.helpView}/>
                    <ScrollView
                        scrollEnabled={!this.state.graphIsPressed}
                    >
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
                                    gridMin={this.state.graphMin}
                                    gridMax={this.state.graphMax}
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
                                </LineChart>
                                <LineChart
                                    style={ StyleSheet.absoluteFill }
                                    data={ this.state.graphData2 }
                                    svg={{ stroke: 'rgb(200, 0, 0)', strokeWidth: 2, }}
                                    contentInset={{ top: 20, bottom: 20, left: 5, right: 5 }}
                                    gridMin={this.state.graphMin}
                                    gridMax={this.state.graphMax}
                                    >
                                </LineChart>
                                <LineChart
                                    style={ StyleSheet.absoluteFill }
                                    data={ this.state.graphData3 }
                                    svg={{ stroke: 'rgb(0, 200, 0)', strokeWidth: 2, }}
                                    contentInset={{ top: 20, bottom: 20, left: 5, right: 5 }}
                                    gridMin={this.state.graphMin}
                                    gridMax={this.state.graphMax}
                                    >
                                    <this.LineCreator/>
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
                                    <DataTable tableHead={['Year', '10%', '50%', '90%']} flexArr={[1, 2, 2, 2]} tableData={[this.state.dataTableYears, this.state.tableData1, this.state.tableData2, this.state.tableData3]}/>
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