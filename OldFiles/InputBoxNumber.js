import React from 'react'
import { 
    TextInput, 
    View, 
    StyleSheet, 
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import DismissKeyboardView from './DismissKeyboardView'


class InputBoxNumber extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: this.props.age,
        }
    }

    componentDidMount(){
        AsyncStorage.getItem(this.props.storageKey).then((age) => {
            if(age !== null) {
                this.setState({ input: age }); // Note: update state with last entered value
            }
            }).done()
    }   

    render() {
        return( 
            <View style = {styles.boxStyle} >
                <TouchableOpacity 
                    style = {styles.clearButton}
                    onPress = {() => { this.setState({input: ''}); AsyncStorage.removeItem(this.props.storageKey)}}>
                        
                </TouchableOpacity>
                <View style={styles.inputBox}>
                    <DismissKeyboardView>
                        <View >
                            <TextInput 
                                onChangeText = {(inputIncome) => { this.setState({input: inputIncome}); AsyncStorage.setItem(this.props.storageKey, inputIncome)}}
                                value = {this.state.input}
                                style={{ height: 40, alignItems: 'stretch', textAlign: 'right', marginRight: 5,}}
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

export default InputBoxNumber

const styles = StyleSheet.create({
    inputBox: {
        flex: 3.5, 
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    clearButton: {
        flex: 1, 
        backgroundColor: 'black',
    },
    clearButtonInnerContainer: {
        height: 20,
        width: 20,
        marginRight: 2,
        marginLeft: 0,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1.4,
    },
    boxStyle: {
        flex: .7,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        marginLeft: 2.5,
        marginRight: 10,
  },
    inputStyle: {
        height: 40, 
        width: 150, 
        textAlign: 'right', 
        marginRight: 5
  },
  })
