/*
 * Summary.
 * Advanced FIRE graph page
 * 
 * Return.
 * Fetches user input data from storage and displays it as graph
 * 
 */


// Package imports
import React, {Component} from 'react';
import { 
    View, 
    Text, 
    AsyncStorage,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { YAxis, Grid, LineChart } from 'react-native-svg-charts';
import { Rect, Line, Circle } from 'react-native-svg';
import { MaskService } from 'react-native-masked-text';
import { 
    Table, 
    Row 
} from 'react-native-table-component';
import Collapsible from 'react-native-collapsible';
import DataTable from '../../Components/DataTable';

// Cusome Imports
import HelpView from '../../Components/HelpView';
import { AFstateKeys } from '../../Components/Constants/InputKeys';
import MainBackHeader from '../../Components/MainBackHeader';
import { _createAdvancedFireGraph } from '../../Components/Functions/FireChartFunction';
import { encode } from 'base-64';

// Style imports
import { mainColor, mainAccentColor, mainFillColor } from '../../Styles/ColorConstants';

const advancedEndpoint = 'http://firehub-backend-dev.5jds93y2cg.us-west-2.elasticbeanstalk.com/formulas/advanced';

// DESC: 
// Retrieves data from Async Storage, Passes it through a function, and displays results to user
class AdvancedFireGraph extends Component {

    constructor(props) {
      super(props)

      this.state = {
        didMount: false,

        // Input Variables
        age: '',
        income: '',
        spend: '',
        target: '',
        targetGrowth: '',
        assets: '',
        bonds: '',
        stocks: '',
        cash: '',
        stockReturns: '',
        bondReturns: '',

        data: [],

        // Touchable line varables
        lineX: 5 ,
        lineXindex: 0,

        // Data switch regulator
        hideData: true,
    }
}
    
    static navigationOptions = {
        header: null
    }      
    
    componentWillMount() {
        this.setState({didMount: false});
        const data = {'advanced': this.props.navigation.getParam('data', {})};
        const requestObject = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic '+encode('13po78903yjksjfkhhgt8730jklq'), 
            },
            body: JSON.stringify(data)
        }
        fetch(advancedEndpoint, requestObject)
        .then((res) => {
            return res.json();
        })
        .then((d) => {
            const data = d;
            // Variables to be passed to the Table Display
            var dataTableYears = [];
            var dataTableGrowth = [];
            var dataTablePrin = [];
            var dataTableSav = [];
            var data1 = [];
            var data2 = [];
            
            for (var i = 0; i < data.length; i++) {
                data1.push(data[i].principal)
                data2.push(data[i].total)
                dataTablePrin.push(MaskService.toMask('money', data[i].principal, {unit: '$', separator: '.', delimiter: ',',  precision: 0,}));
                dataTableSav.push(MaskService.toMask('money', data[i].total, {unit: '$', separator: '.', delimiter: ',',  precision: 0,}));
                dataTableGrowth.push(MaskService.toMask('money', data[i].total - data[i].principal, {unit: '$', separator: '.', delimiter: ',',  precision: 0,}));
                dataTableYears.push(parseInt(data[i].age));
            }
            const graphMin = Math.min.apply(Math, data1);
            const graphMax = Math.max.apply(Math, data2);
            this.setState({
                data1: data1,
                data2: data2,
                dataTablePrin: dataTablePrin,
                dataTableSav: dataTableSav,
                dataTableGrowth: dataTableGrowth,
                dataTableGrowth: dataTableGrowth,
                dataTableYears: dataTableYears,
                graphMin: graphMin,
                graphMax: graphMax,
                didMount: true,
                age: data[0].age
            });
        })
        .done();
    }

    // handles touching of the graph
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

    // Information to be passed to the Tools Help Screen
    helpLines = [
        { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
        { key: 2, icon: 'attach-money', iconType: '', text: "The graph displays the amount (in thousands) on the Y-Axis!"},
        { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Press the graph to view the data for a specific year!"},
    ]
    helpView = <HelpView helpLines={this.helpLines}/>

    // Function adding circles to all data points
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

    // Invisible rectangle to capture user touch and set state of Line
    LineCreator = ({x, width, data}) => {
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

    render() { 
        // Masks for active selected node
        if (this.state.didMount) {
            var activePrin = ''
            var activeSav = ''
            var activeGrowth = ''
            if (this.state.data1[this.state.lineXindex] !== undefined) { activePrin = MaskService.toMask('money', this.state.data1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
            if (this.state.data2[this.state.lineXindex] !== undefined) { activeSav = MaskService.toMask('money', this.state.data2[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
            if (this.state.data2[this.state.lineXindex] !== undefined) { activeGrowth = MaskService.toMask('money', this.state.data2[this.state.lineXindex] - this.state.data1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
        }
        if (!this.state.didMount) {
            return (
            <View style={styles.container}>
                <MainBackHeader navigation = {this.props.navigation} title = 'FIRE Graph' backButtonName = 'Inputs' helpView={this.helpView}/>
                <View style={styles.container}>
                </View>
            </View>
            )
        } else {
            return (
                <View style={{flex:1, backgroundColor: mainFillColor}}>
                    <MainBackHeader  title = 'FIRE Graph' backButtonName = 'Inputs' navigation={this.props.navigation} helpView={this.helpView}/>
                    <ScrollView>
                        <View style={styles.graphContainer}>
                            <YAxis
                                data={this.state.data2}
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
                                    data={ this.state.data1 }
                                    svg={{ stroke: 'rgb(0, 65, 244)', strokeWidth: 2, }}
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
                                    <this.Decorator/>
                                </LineChart>
                                <LineChart
                                    style={ StyleSheet.absoluteFill }
                                    data={ this.state.data2 }
                                    svg={{ stroke: 'rgb(200, 0, 0)', strokeWidth: 2, }}
                                    contentInset={{ top: 20, bottom: 20, left: 5, right: 5 }}
                                    gridMin={this.state.graphMin}
                                    gridMax={this.state.graphMax}
                                    >
                                    <this.Decorator/>
                                    <this.LineCreator/>
                                </LineChart>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.goalText}>You are on track to reach your retirement goal in {this.state.data1.length} years! </Text>
                            <Table borderStyle={{borderWidth: 0.01, }}>
                                <Row textStyle={styles.headText} style={styles.headStyle} flexArr={[1, 2, 2, 2]} data={['Age', 'Savings', 'Principal', 'Growth']}/>
                                <Row textStyle={styles.columnText} flexArr={[1, 2, 2, 2]} data={[this.state.lineXindex + parseInt(this.state.age), activeSav, activePrin, activeGrowth]}/>
                            </Table>      
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={() => this.setState({hideData: !this.state.hideData})}>
                                    <Text style={styles.buttonText}>{this.state.hideData ? 'Show' : 'Hide'} Data</Text>
                                </TouchableOpacity>        
                            </View>
                            <Collapsible collapsed={this.state.hideData}>
                                <View>
                                    <DataTable tableHead={['Age', 'Savings', 'Principal', 'Growth']} flexArr={[1, 2, 2, 2]} tableData={[this.state.dataTableYears, this.state.dataTableSav, this.state.dataTablePrin, this.state.dataTableGrowth]}/>
                                </View>
                            </Collapsible>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

export default AdvancedFireGraph


const styles = StyleSheet.create({
    container: {
        backgroundColor: mainFillColor,
        flex: 1
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