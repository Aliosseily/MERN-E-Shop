import React, { useState } from 'react';

import { View, Text, Button, StyleSheet } from 'react-native';
import FormContainer from '../../Shared/Forms/FormContainer';
import Input from '../../Shared/Forms/Input';
import Error from '../../Shared/error';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import Toast from 'react-native-toast-message';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Register = props => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const register = () => {
        if (email === "" || name === "" || phone === "" || password === "") {
            setError("Please fill in the form correctly")
        }
        let user = {
            name,
            email,
            password,
            phone,
            isAdmin: false
        }

        axios.post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: "Please login into your account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate("Login");
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again"
                });
            });
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >

            <FormContainer title={"Register"}>
                <Input
                    placeholder={"Email"}
                    name={"Email"}
                    id={"Email"}
                    onChangeText={text => setEmail(text.toLowerCase())}
                />

                <Input
                    placeholder={"name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={text => setName(text.toLowerCase())}
                />

                <Input
                    placeholder={"Phone number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={text => setPhone(text)}
                />

                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />

                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <Button title={"Register"} onPress={() => register()} />
                </View>
                <View>
                    <Button title={"Back to login"} onPress={() => props.navigation.navigate("Login")} />
                </View>

            </FormContainer>

        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: 'center'
    },

})

export default Register;
