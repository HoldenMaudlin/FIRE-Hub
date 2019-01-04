import React, { Component } from 'react'
import {
    StyleSheet,
    View,
} from 'react-native'
import { 
    Table, 
    TableWrapper,
    Cols,
    Rows,
    Row 
} from 'react-native-table-component';
import { mainColor, mainFillColor } from '../Styles/ColorConstants';

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
    headStyle: {
        height: 30,
    },
    headText: {
        textAlign: 'center',
        color: mainColor,
        fontSize: 16,
        fontWeight: '500',
    },
    columnStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },

})