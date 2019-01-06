import React, { Component } from 'react'
import {
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { mainColor, mainAccentColor } from '../Styles/ColorConstants';

class DrawerContents extends Component {
    constructor(props) {
        super(props)
        
        this.state ={
            toolsActive: true,
            linksActive: false,
            aboutFIREActive: false,
            settingsActive: false,
        }
    }

    navigateToScreen( route, stateKey ){
        this.props.navigation.navigate(route);
        for (item in this.state) {
            if (this.state[item] === true) {
                this.state[item] = false;
                this.state[stateKey] = true;
                break;
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1,}}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/flamer.png')} style={{height: 120, width: 120, borderRadius: 60}} />
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.navigateToScreen('Tools', 'toolsActive')} style={styles.linkContainer}>
                        <Icon color={this.state.toolsActive ? mainColor : 'black'} name='calculator' type='material-community'/>
                        <Text style={[styles.linkText, {color: this.state.toolsActive ? mainColor : 'black'}]}>Tools</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigateToScreen('Links', 'linksActive')} style={styles.linkContainer}>
                        <Icon color={this.state.linksActive ? mainColor : 'black'} name='link' type='entypo'/>
                        <Text style={[styles.linkText, {color: this.state.linksActive ? mainColor : 'black'}]}>Links</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigateToScreen('AboutFIRE', 'aboutFIREActive')} style={styles.linkContainer}>
                        <Icon color={this.state.aboutFIREActive ? mainColor : 'black'} name='information-outline' type='material-community'/>
                        <Text style={[styles.linkText, {color: this.state.aboutFIREActive ? mainColor : 'black'}]}>About FIRE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.navigateToScreen('Disclaimer', 'settingsActive')} style={styles.linkContainer}>
                        <Icon color={this.state.settingsActive ? mainColor : 'black'} size={19} name='balance-scale' type='font-awesome'/>
                        <Text style={[styles.linkText, {color: this.state.settingsActive ? mainColor : 'black'}]}>Disclaimer & Privacy</Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 10, textAlign: 'center', color: mainAccentColor}}> More Coming Soon! </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default DrawerContents

const styles = StyleSheet.create({
    imageContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkContainer: {
        paddingLeft: 10,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    linkText: {
        fontSize: 16,
        marginLeft: 20,
    }
})