// Package imports
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { 
    Table, 
    Cols,
    Row 
} from 'react-native-table-component';

// Style imports
import { mainColor, mainFillColor } from '../Styles/ColorConstants';

// DESC:
// Displays graph data in a data table to screen
class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Table borderStyle={{borderWidth: 0.01, }}>
                    <Row textStyle={styles.headText} style={styles.headStyle} flexArr={this.props.flexArr} data={this.props.tableHead}/>
                    <Cols style={styles.columnStyle} flexArr={this.props.flexArr} data={this.props.tableData}/>
                </Table>
            </View>
        )
    }
}

export default DataTable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        marginBottom: 20,
    },
    // Styles header
    headStyle: {
        height: 30,
    },
    headText: {
        textAlign: 'center',
        color: mainColor,
        fontSize: 16,
        fontWeight: '500',
    },
    // Styles columns
    columnStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },

})