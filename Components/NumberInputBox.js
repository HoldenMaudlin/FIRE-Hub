import React from 'react'
import { Component } from 'react'
import { TextInput, ScrollView, View, StyleSheet, Text, Button, Keyboard, KeyboardAvoidingView} from 'react-native'
import DismissKeyboardView from './DismissKeyboardView'


class NumberInputBox extends React.Component {

    constructor() {
        super()

        this.state = {
            Age: 25,
            Income: 80000,
            Spending: 40000,
        }
        
    }

    render() {
        return(
            <View style={styles.mainTab}> 
                <View style = {styles.inputBoxStyle} >
                    <DismissKeyboardView>
                            <View>
                                <TextInput 
                                    //onChangeText = {(text) => { this.}}
                                    style={styles.inputStyle}
                                    keyboardType='numeric'
                                    placeholder='Enter a value...'
                                />
                            </View>
                    </DismissKeyboardView>
                </View>
            </View>
        )
    }
}

export default NumberInputBox

const styles = StyleSheet.create(
    {
    boxNameStyle: {
        flex: 2,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 5,
        marginRight: 2.5,
        paddingLeft: 10,
    },
    inputBoxStyle: {
        flex: 1.2,
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        marginLeft: 2.5,
        marginRight: 10,
    },
    inputStyle: {
        marginRight: 3,
    },
    mainTab: {
        flex: 1,
        flexDirection: 'row',
        height: 50,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 20,  
    },
    dialogBoxStyle: {
        flex: -1,
        //height: 300,
        width: 200,
    },
    dialogTitleStyle: {
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogMainStyle: {
        flex: -1,
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }

})