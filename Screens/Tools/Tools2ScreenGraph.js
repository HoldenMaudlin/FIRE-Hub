/*
 * Summary.
 * Break Even graph page
 * 
 * Return.
 * Fetches user input data from storage and displays it as graph
 * 
 */

// Package Imports
import React from 'react'
import { 
    LineChart, 
    Grid, 
    YAxis } from 'react-native-svg-charts';
import { 
    Circle, 
    Rect, 
    Line } from 'react-native-svg';
import { 
    ActivityIndicator, 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    ScrollView
} from 'react-native'
import DataTable from '../../Components/DataTable';
import { MaskService } from 'react-native-masked-text';
import { 
    Table, 
    Row 
} from 'react-native-table-component';
import Collapsible from 'react-native-collapsible'

// Custom imports
import MainBackHeader from '../../Components/MainBackHeader';
import HelpView from '../../Components/HelpView';
import { _createInvestment1Line } from '../../Components/Functions/FireChartFunction';
import { BEstateKeys } from '../../Components/Constants/InputKeys';
import { encode } from 'base-64';

// Style imports
import { mainColor, mainFillColor, mainAccentColor } from '../../Styles/ColorConstants';

import { apiToken, baseEndpoint } from '../../secrets.js';
const breakEvenEndpoint = baseEndpoint + 'formulas/breakeven';

// DESC:
// Break even graph component
// Retrieves, manipulates, then displays data to user
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
            lineX: 5,
            lineXindex: 0,
            data: [],
            hideData: true,
            graphIsPressed: false,
        }
    }

    // Hides native header for custom header
    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        this.setState({didMount: false});
        const data = {'inv': this.props.navigation.getParam('data', {})};
        const requestObject = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic '+ apiToken, 
            },
            body: JSON.stringify(data)
        }
        fetch(breakEvenEndpoint, requestObject)
        .then((res) => { 
            try {
                return res.json();
            } catch (e) {
                return -1;
            }
        })
        .then((data) => {
            if (data == -1) return;
            // Send data through function to create the two sets of data
            var data1 = []
            var data2 = []

            // Variables to be passed to the Table Display
            var dataTableYears = []
            var data1Table = []
            var data2Table = []

            // Separate the data and find the Max and Min for the graph
            for (var i = 0; i < data.length; i++) {
                data1.push(data[i].cur)
                data2.push(data[i].pot)
                dataTableYears.push(i + 1)
                data1Table.push(MaskService.toMask('money', data[i].cur, {unit: '$', separator: '.', delimiter: ',', precision: 0,}))
                data2Table.push(MaskService.toMask('money', data[i].pot, {unit: '$', separator: '.', delimiter: ',', precision: 0,}))
            }
            const graphMin = Math.min.apply(Math, data2)
            const graphMax = Math.max.apply(Math, data1)
            this.setState({
                data1: data1,
                data2: data2,
                data1Table: data1Table,
                data2Table: data2Table,
                dataTableYears: dataTableYears,
                graphMin: graphMin,
                graphMax, graphMax,
                didMount: true
            });
        })
        .done();
    }

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

    Decorator = ({ x, y, data }) => {
        return data.map((value, index) => (
            <Circle
                key={ index }
                cx={ x(index) }
                cy={ y(value) }

                // Prevents graph being cluttered with circles there are too many data points
                r={ data.length > 35 ? 0 : 3 }
                stroke={ 'rgb(134, 65, 244)' }
                fill={ 'white' }
            />
        ))
    }

    helpLines = [
        { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
        { key: 2, icon: 'attach-money', iconType: '', text: "The graph displays the amount (in thousands) on the Y-Axis!"},
        { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Press the graph to view the data for a specific year!"},
    ]
    helpView = <HelpView helpLines={this.helpLines}/>

    render() {
        if (this.state.didMount) {
            var activeCur = ''
            var activePot = ''
            if (this.state.data1[this.state.lineXindex] !== undefined) { activeCur = MaskService.toMask('money', this.state.data1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
            if (this.state.data2[this.state.lineXindex] !== undefined) { activePot = MaskService.toMask('money', this.state.data2[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
            return (
                <View style = {{flex:1, backgroundColor: mainFillColor,}} >
                    <MainBackHeader navigation = {this.props.navigation} title = 'Break Even' backButtonName = 'Inputs' helpView={this.helpView}/>
                    <ScrollView
                        scrollEnabled={!this.state.graphIsPressed}
                    >
                        <View style={styles.graphContainer}>
                            <YAxis
                                data={this.state.data2}
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
                                    data={ this.state.data1 }
                                    svg={{ stroke: 'rgb(0, 65, 244)', strokeWidth: 2, }}
                                    contentInset={ { top: 20, bottom: 20, left: 5, right: 5 } }
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
                                    <this.Decorator/>
                                </LineChart>
                                <LineChart
                                    style={ StyleSheet.absoluteFill }
                                    data={ this.state.data2 }
                                    svg={{ stroke: 'rgb(200, 0, 0)', strokeWidth: 2, }}
                                    contentInset={ { top: 20, bottom: 20, left: 5, right: 5 } }
                                    gridMin={this.state.graphMin}
                                    gridMax={this.state.graphMax}
                                    >
                                    <this.Decorator/>
                                    <this.LineCreator/>
                                </LineChart>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.goalText}>The potential investment will surpass the current investment after {this.state.data1.length} years! </Text>
                            <Table borderStyle={{borderWidth: 0.01, }}>
                                <Row textStyle={styles.headText} style={styles.headStyle} flexArr={[1,2,2]} data={['Year', 'Current', 'Potential']}/>
                                <Row textStyle={styles.columnText} flexArr={[1, 2, 2]} data={[this.state.lineXindex + 1, activeCur, activePot]}/>
                            </Table>      
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => this.setState({hideData: !this.state.hideData})}>
                                    <Text style={styles.buttonText}>{this.state.hideData ? 'Show' : 'Hide'} Data</Text>
                                </TouchableOpacity>        
                            </View>
                            <Collapsible collapsed={this.state.hideData}>
                                <View>
                                    <DataTable tableHead={['Year', 'Current', 'Potential']} flexArr={[1, 2, 2]} tableData={[this.state.dataTableYears, this.state.data1Table, this.state.data2Table]}/>
                                </View>
                            </Collapsible>
                        </View>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <MainBackHeader navigation = {this.props.navigation} title = 'Break Even' backButtonName = 'Inputs' helpView={this.helpView}/>
                    <View style={styles.activityContainer}>
                    </View>
                </View>
            )
        }
    }
}

export default Tool2ScreenGraph

const styles = StyleSheet.create({
    container: {
        flex:1, 
        backgroundColor: mainFillColor
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
    activityContainer: {
        flex: 1,
        backgroundColor: mainFillColor,
        alignItems: 'center',
        justifyContent: 'center',
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
    }
})