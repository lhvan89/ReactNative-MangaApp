import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            username: 'a@yopmail.com',
            password: 'Aa@123456'
        };
    }

    render() {
        return(
            <View style={styles.body}>
                <Image style={{width: 243, height: 29}} source={require('../assets/images/logo.png')} />
                <View style={styles.container}>
                    <TextInput
                        value={this.state.username}
                        style={styles.textInput}
                        placeholder={'Username'}
                        placeholderTextColor={'#DAE5F1'}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput style={styles.textInput}
                        value={this.state.password}
                        placeholder= {'Password'}
                        secureTextEntry={true}
                        placeholderTextColor={'#DAE5F1'}
                        onChangeText={(password) => this.setState({password})}
                    />

                    <TouchableOpacity
                        onPress={this.login}>
                        <Text style={styles.button}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    login = async () => {
        this.props.navigation.navigate('Home');

        // let response = await fetch(global.apiLogin, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password
        //     }),
        // });
        // let responseJson = await response.json();
        // console.log(responseJson)
        // if (responseJson.status > 0) {
        //     Alert.alert(
        //         'Error',
        //         responseJson.message,
        //         [
        //             {text: 'OK'}
        //         ],
        //         { cancelable: false }
        //     )
        // } else {
        //     this.props.navigation.navigate('Home');
        // }
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#0e0f1a',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#478EC4',
    },
    container: {
        backgroundColor: '#DFEDF6',
        padding: 20,
        margin: 20,
        alignSelf: 'stretch',
        borderRadius: 10,
        alignItems: 'center',
        shadowOffset:{ width: 5,  height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.2,
    },
    textInput: {
        backgroundColor: '#484B50',
        height: 40,
        margin: 10,
        paddingLeft:10,
        color: "#DAE5F1",
        borderRadius: 10,
        alignSelf: 'stretch',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#54a3e3',
        padding: 10,
        backgroundColor: '#7B828A',
        width: 150,
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        color: '#CAD5E1',
        fontWeight: 'bold',
        marginTop:20,
    }
    
})