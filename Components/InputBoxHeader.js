import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class InputBoxHeader extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        textDecorationColor: 'black'
    },
})