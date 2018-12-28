import React from 'react'
import { TouchableOpacity, TextInput, ScrollView, View, StyleSheet, Text, Button, Keyboard, KeyboardAvoidingView} from 'react-native'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog'
import { mainColor, mainFillColor } from '../Styles/ColorConstants';
import { Icon } from 'native-base'


class inputBoxName extends React.Component {
    
    constructor() {
        super()

        this.state = {
            visible: false,
            
        }
    }
    
    render() {
        return (    
            <View style={styles.containerStyle} >
                <TouchableOpacity
                style={styles.touchAreaStyle}
                onPress={()=> this.setState({visible:true})}>
                    <View styles={{flex: 1, flexDirection: 'row'}}> 
                        <View style={{backgroundColor: 'black'}}>
                            {/*<Icon color={mainColor} name={this.props.iconName} onPress={() => this.setState({visible: true})}/>*/}
                        </View>           
                        <View style={{backgroundColor: 'blue'}}>             
                            <Text> {this.props.title} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Dialog
                    visible= {this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent style={styles.dialogBoxStyle}>
                        <View style={styles.dialogTitleStyle}>
                            <Text>{this.props.title}</Text>
                        </View>
                        <View style = {styles.dialogMainStyle}>
                            <Text>{this.props.description}</Text>
                        </View>
                    </DialogContent>
                </Dialog>               
            </View>
        )
    }
}


export default inputBoxName

const styles = StyleSheet.create(
    {
    containerStyle: {
        flex: 3.5,
        height: 40,
        flexDirection: 'row',
    },
    touchAreaStyle: {
        flex: 1,
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
    boxStyle: {
        flex: 2,
        height: 40,
        backgroundColor: 'black'
    },
    iconStyle: {
        flex: 1,
        height: 40,
        backgroundColor: 'blue'
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 15,  
        color: mainColor,
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