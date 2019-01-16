/*
 * Summary.
 * Customizable Input Box
 * 
 * Description.
 * Receives various props and displays interactive input box to user & sets state 
 * of parent component ( main input screens ).
 *
 * PROP   TYPE       NAME         REQ.    DESC
 * @prop  string     name         Yes     Name input title
 * @prop  string     iconName     Yes     Icon Name for the input box
 * @prop  string     iconType     No      Font library of the icon
 * @prop  function   _setState    Yes     Function to bind input to parent state
 * @prop  string     storageKey   Yes     Async Key to set input value to User's deivce
 * @prop  string     stateKey     Yes     State key to set state of parent in callback
 * @prop  string     mask         Yes     Type of text mask 
 * @prop  int        precision    No      How many decimal places to display
 * @prop  bool       percent      No      Is the value a in percentile form
 * @prop  string     description  yes     Description of input to be shown in collapsed box
 * 
 * @callback   callback    Callback function runs when text input is changed
 * @return     Component   
 */

// Package Imports
import React, {Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions } from 'react-native'
import { Icon }  from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import DismissKeyboardView from './DismissKeyboardView'
import Collapsible from 'react-native-collapsible'
import { TextInputMask } from 'react-native-masked-text'

// Style imports
import { mainAccentColor, mainColor, mainFillColor } from '../Styles/ColorConstants'
var {height, width} = Dimensions.get('window')

class InputBox extends Component {
    constructor(props) {
      super(props)
      this.state = {
        collapsed: true,
        inputted: false,
        input: ''
      }
    }

    _updateInput(input){
        if (input === '0' || input === '$0') {
            if (this.state.input === '') {
                this.setState({input: input})
                AsyncStorage.setItem(this.props.stateKey, input + '')
                this.props._setState(input, this.props.stateKey)
            } else {
                this.setState({input: ''})
                AsyncStorage.removeItem(this.props.stateKey)
                this.props._setState('', this.props.stateKey)
            }
        } else {
            this.setState({input: input})
            AsyncStorage.setItem(this.props.stateKey, input + '')
            this.props._setState(input, this.props.stateKey)
        }
    }

    componentDidMount(){
      AsyncStorage.getItem(this.props.storageKey).then((input) => {
          if(input !== null) {
              this.setState({ input: input }); // Note: update state with last entered value
              this.setState({ inputted: true })              
          }
          }).done()
  }   
    // Styles were not working when put in style sheet; try again later //

    render() {
        var value
        if( this.props.maxValue !== undefined ) {
            value = this.state.input > this.props.maxValue ? this.props.maxValue : this.state.input
        } else {
            value = this.state.input
        }
        var input
        if(this.props.percent === true) {
            input = 
            <TextInput
                onChangeText = {(input) => { this._updateInput(input); this.setState({inputted: true})}}
                value = {value}
                placeholder = {this.props.placeholder ? this.props.placeholder : this.props.name}
                placeholderTextColor = {mainAccentColor}
                keyboardType='numeric'
                style={{alignItems: 'stretch', fontSize: 16, color: 'black', fontWeight: 'bold', textAlign: 'right', marginRight: 5, marginTop: 17,}}
            />
        } else {
            input = 
            <TextInputMask
                /* Takes input, updates own state, parent's state, and Async state */
                onChangeText = {(input) => { this._updateInput(input); this.setState({inputted: true})}}
                value = {value}
                style={{alignItems: 'stretch', fontSize: 16, color: 'black', fontWeight: 'bold', textAlign: 'right', marginRight: 5, marginTop: 17,}}
                keyboardType='numeric'
                type={this.props.mask}
                options={{
                    precision: this.props.precision,
                    unit: '$',
                    delimiter: ',',
                    separator: '.'
                }}
                placeholder = {this.props.placeholder ? this.props.placeholder : this.props.name}
                placeholderTextColor = {mainAccentColor}
            />
        }
        return (
            <View style={styles.container}>             
                {/* Entire Input Box*/}
                <View style = {styles.subContainer}>
                    {/* Text Side of Input Box */}
                    <View style = {styles.titleSide}>
                        {/* Touchable area for text and icon */}
                        <TouchableOpacity onPress = { () => this.setState({collapsed: !this.state.collapsed})} style={{flexDirection: 'row',}}> 
                            {/* Icon box and icon */}
                            <View style = {styles.iconContainer}> 
                                <Icon name={this.props.iconName} type={this.props.iconType} color={mainColor} size={27} />
                            </View>
                            {/* Text area and text */}
                            <View style = {styles.titleTextContainer}>
                                <Text style={styles.titleText}> {this.props.name} </Text>
                            </View>
                        </TouchableOpacity>
                        {/* Pop up box visible when above touchable area is pressed */}
                    </View>
                    {/* Input side of text box*/}
                    <View style = {styles.inputSide}> 
                        {/* Clear button touch area and icon */}
                        <TouchableOpacity 
                            onPress={() => {AsyncStorage.removeItem(this.props.storageKey), this.setState({input: '', inputted: false}), this.props._setState('', this.props.stateKey)}} 
                            style = {styles.clearButton}>
                                <Icon name='clear' color={mainAccentColor}/>
                        </TouchableOpacity>
                        {/* Text input area */}
                        <View style = {styles.inputContainer}>
                            {/* Dismisses keyboard on tap outside */}
                            <DismissKeyboardView>
                                <View>
                                    {input}
                                </View>
                            </DismissKeyboardView>
                        </View>
                    </View>
                </View>
                <Collapsible collapsed= {this.state.collapsed}>
                    <View style={styles.collapsedContainer}>
                        <Text style={{color: 'black', fontSize: 16}} >{this.props.description} </Text>
                    </View>
                </Collapsible>   
            </View>
        )
    }
}

export default InputBox
 
styles = StyleSheet.create({
    // Main Wrapper
    container: {
        alignItems: 'stretch', 
        borderBottomWidth: 1,
        borderBottomColor: mainAccentColor,
        }, 
    // Main Container
    subContainer: {
        height: 60, 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        marginTop: 5, 
        marginLeft: 10, 
        marginRight: 10
    },
    // Title side container 
    titleSide: {
        flex: 1.2, 
        height: 60, 
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        marginBottom: 3
    },
    // Icon container
    iconContainer: {
        flex: 1, 
        height: 40, 
        justifyContent: 'flex-end'
    },
    // Title text
    titleTextContainer: {
        flex: 6, 
        height: 40, 
        justifyContent: 'flex-end' 
    },
    titleText: {
        fontWeight: 'bold', 
        fontSize: 20, 
        color: 'black', 
        paddingLeft: 6,
    },
    // Input side
    inputSide: {
        flex: 1, 
        height: 70, 
        marginBottom: 3, 
        flexDirection: 'row', 
        alignItems: 'flex-end'
    },
    clearButton: {
        flex: 1, 
        height: 40, 
        justifyContent: 'flex-end', 
        backgroundColor: 'white'
    },
    inputContainer: {
        flex: 3, 
        height: 40, 
        justifyContent: 'center'
    },
    collapsedContainer: {
        flex: 1, 
        width: width, 
        backgroundColor: mainFillColor, 
        padding: 6, 
        borderTopWidth: 1, 
        borderTopColor: mainAccentColor
    }
})
