import React from 'react'
import { LineChart, Path, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Circle, Rect, Line } from 'react-native-svg'
import { mainColor } from '../../Styles/ColorConstants'
import { AsyncStorage, View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import { _createInvestment1Line } from '../../Components/Functions/FireChartFunction'
import { BEstateKeys } from '../../Components/Constants/InputKeys'
import { mainFillColor, mainAccentColor } from '../../Styles/ColorConstants';
import MainBackHeader from '../../Components/MainBackHeader'
import DataTable from '../../Components/DataTable'
import { ScrollView } from 'react-native-gesture-handler';
import { MaskService } from 'react-native-masked-text'
import HelpView from '../../Components/HelpView'
import { 
    Table, 
    Row 
} from 'react-native-table-component';
import Collapsible from 'react-native-collapsible'

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

            hideData: true,
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
        // Information to be passed to the Tools Help Screen
        const helpLines = [
            { key: 1, icon: 'ios-arrow-back', iconType: 'ionicon', text: 'Tap on the Back Button to navigate to the tools screen!',},
            { key: 2, icon: 'attach-money', iconType: '', text: "The graph displays the amount (in thousands) on the Y-Axis!"},
            { key: 3, icon: 'gesture-tap', iconType: 'material-community', text: "Press the graph to view the data for a specific year!"},
        ]
        var helpView = <HelpView helpLines={helpLines}/>

        // Send data through function to create the two sets of data
        var data = _createInvestment1Line(this.state.amount, this.state.returns1, this.state.fees1, this.state.returns2, this.state.fees2, this.state.taxes)
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
        var activeCur = ''
        var activePot = ''
        if (data1[this.state.lineXindex] !== undefined) { activeCur = MaskService.toMask('money', data1[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }
        if (data2[this.state.lineXindex] !== undefined) { activePot = MaskService.toMask('money', data2[this.state.lineXindex], {unit: '$', separator: '.', delimiter: ',',  precision: 0,}) }

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
            <View style = {{flex:1, backgroundColor: mainFillColor,}} >
                <MainBackHeader navigation = {this.props.navigation} title = 'Break Even' backButtonName = 'Inputs' helpView={helpView}/>
                <ScrollView>
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
                    <View>
                        <Text style={styles.goalText}>The potential investment will surpass the current investment after {data1.length} years! </Text>
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
                                <DataTable tableHead={['Year', 'Current', 'Potential']} flexArr={[1, 2, 2]} tableData={[dataTableYears, data1Table, data2Table]}/>
                            </View>
                        </Collapsible>
                    </View>
                </ScrollView>
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