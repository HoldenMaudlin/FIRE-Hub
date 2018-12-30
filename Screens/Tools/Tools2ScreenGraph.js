import React from 'react'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import { Circle } from 'react-native-svg'

import { AsyncStorage, View, StyleSheet } from 'react-native'
import { _createInvestment1Line } from '../../Components/Functions/FireChartFunction'
import { BEstateKeys } from '../../Components/Constants/InputKeys'
import { mainFillColor } from '../../Styles/ColorConstants';
import MainBackHeader from '../../Components/MainBackHeader'


class Tool2ScreenGraph extends React.PureComponent {

    constructor (props) {
        super(props)
        this.state = {
            didMount: false,
            amount: '',
            returns1: '',
            fees1: '',
            returns2: '',
            fees2: '',
            taxes: '',
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        BEstateKeys.forEach((item) => {
            AsyncStorage.getItem(item.asyncKey).then((value) => {
                if (value !== null) {
                    this.setState({[item.stateKey]: value})
                }
            })
        })
        this.setState({didMount: true})
        console.log(this.state)
    }

    render() {
        var data = _createInvestment1Line(this.state.amount, this.state.returns1, this.state.fees1, this.state.returns2, this.state.fees2, this.state.taxes)
        var data1 = []
        var data2 = []
        for (var i = 0; i < data.length; i++) {
            data1.push(data[i].cur)
            data2.push(data[i].pot)
        }
        console.log(data1 )
        console.log(data2)


        const Shadow = ({ line }) => (
            <Path
                key={'shadow'}
                y={2}
                d={line}
                fill={'none'}
                strokeWidth={4}
                stroke={'rgba(134, 65, 244, 0.2)'}
            />
        )


        const Decorator = ({ x, y, data }) => {
            return data.map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 3 }
                    stroke={ 'rgb(134, 65, 244)' }
                    fill={ 'white' }
                />
            ))
        }

        return (
            <View style = {{flex:1, backgroundColor: mainFillColor}} >
                <MainBackHeader navigation = {this.props.navigation} title = 'Break Even' backButtonName = 'Inputs' />
                <View style={{ height: 400 }}>
                    <LineChart
                        style={ { flex: 1 } }
                        data={ data1 }
                        svg={{ stroke: 'rgb(0, 65, 244)', strokeWidth: 2, }}
                        contentInset={ { top: 20, bottom: 20 } }
                        gridMin={0}
                        gridMax={200000}
                        >
                        <Grid/>
                        <Decorator/>
                    </LineChart>
                    <LineChart
                        style={ StyleSheet.absoluteFill }
                        data={ data2 }
                        svg={{ stroke: 'rgb(200, 0, 0)', strokeWidth: 2, }}
                        contentInset={ { top: 20, bottom: 20 } }
                        gridMin={0}
                        gridMax={200000}
                        >
                        <Decorator/>
                    </LineChart>
                </View>
            </View>
        )
    }

}

export default Tool2ScreenGraph