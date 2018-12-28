import React, {Component} from 'react'
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { StyleSheet, View } from 'react-native'

class LayeredChartsExample extends React.PureComponent {

    render() {
        const data  = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ 50, 160, 4, 9, -47, -247, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        return (
            <View style={ { height: 200 } }>
                <AreaChart
                    style={ {flex: 1} }
                    data={ data2 }
                    svg={{ fill: 'rgba(0, 0, 0, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                >
                </AreaChart>         
                <AreaChart
                    style={ StyleSheet.absoluteFill}
                    data={ data }
                    svg={{ fill: 'rgba(0, 99, 78, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
            </View>
        )
    }

}

export default LayeredChartsExample