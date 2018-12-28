import React, {Component} from 'react'
import Dialog, { DialogContent } from 'react-native-popup-dialog'
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions } from 'react-native'
import { mainAccentColor, mainColor } from '../Styles/ColorConstants'
import { Icon }  from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'
import DismissKeyboardView from './DismissKeyboardView'
import Collapsible from 'react-native-collapsible'
import { TextInputMask } from 'react-native-masked-text'
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
        return (
            <View style={styles.container}>             
                {/* Entire Input Box*/}
                <View style = {{height: 60, flexDirection: 'row', alignItems: 'flex-end', marginTop: 5, marginLeft: 10, marginRight: 10}}>
                    {/* Text Side of Input Box */}
                    <View style = {{flex: 1.6, height: 60, flexDirection: 'row', alignItems: 'flex-end', marginBottom: 3}}>
                        {/* Touchable area for text and icon */}
                        <TouchableOpacity onPress = { () => this.setState({collapsed: !this.state.collapsed})} style={{flexDirection: 'row',}}> 
                            {/* Icon box and icon */}
                            <View style = {{flex: 1, height: 40, justifyContent: 'flex-end'}}> 
                                <Icon name={this.props.iconName} type={this.props.iconType} color={mainColor} size={27} />
                            </View>
                            {/* Text area and text */}
                            <View style = {{flex: 6, height: 40, justifyContent: 'flex-end' }}>
                                <Text style={{fontWeight: 'bold', fontSize: 20, color: mainColor, paddingLeft: 6,}}> {this.props.name} </Text>
                            </View>
                        </TouchableOpacity>
                        {/* Pop up box visible when above touchable area is pressed */}
                    </View>
                    {/* Input side of text box*/}
                    <View style = {{flex: 1, height: 70, marginBottom: 3, flexDirection: 'row', alignItems: 'flex-end'}}> 
                        {/* Clear button touch area and icon */}
                        <TouchableOpacity 
                            onPress={() => {AsyncStorage.removeItem(this.props.storageKey), this.setState({input: '', inputted: false}), this.props._setState('', this.props.stateKey)}} 
                            style = {{flex: 1, height: 40, justifyContent: 'flex-end', backgroundColor: 'white'}}>
                                <Icon name='clear' color={mainAccentColor}/>
                        </TouchableOpacity>
                        {/* Text input area */}
                        <View style = {{flex: 3, height: 40, justifyContent: 'center'}}>
                            {/* Dismisses keyboard on tap outside */}
                            <DismissKeyboardView>
                                <View>
                                    <TextInputMask
                                    /* Takes input, updates own state, parent's state, and Async state */
                                    onChangeText = {(input) => { this._updateInput(input); this.setState({inputted: true})}}
                                    value = {this.state.input}
                                    style={{alignItems: 'stretch', fontSize: 16, color: 'black', fontWeight: 'bold', textAlign: 'right', marginRight: 5, marginTop: 17,}}
                                    keyboardType='numeric'
                                    type={this.props.mask}
                                    options={{
                                        precision: 0,
                                        unit: '$',
                                        delimiter: ',',
                                        separator: '.'
                                    }}
                                    placeholder = {this.props.name}
                                    placeholderTextColor = {mainAccentColor}
                                    />
                                </View>
                            </DismissKeyboardView>
                        </View>
                    </View>
                </View>
                <Collapsible
                    collapsed= {this.state.collapsed}
                    >
                    <View style={{flex: 1, width: width, backgroundColor: mainColor, padding: 4}}>
                        <Text style={{color: 'white', fontSize: 18}} >{this.props.description} </Text>
                    </View>
                </Collapsible>   
            </View>
        )
    }
}

export default InputBox
 
styles = StyleSheet.create({

container: {
    alignItems: 'stretch', 
    borderBottomWidth: 1,
    borderBottomColor: mainAccentColor,
    }, 
dialogBoxStyle: {
    flex: -1,
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
    },
})
