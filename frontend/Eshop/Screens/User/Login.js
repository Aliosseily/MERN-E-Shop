import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Forms/FormContainer';
import Input from '../../Shared/Forms/Input';
import Error from '../../Shared/error';

//Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/authActions';


const Login = props => {
    const context = useContext(AuthGlobal) // AuthGlobal will be availbale in our component through the context constant

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (context.stateUser.isAuthenticated) { //stateUser in Auth.js
            console.log("Navigate",context.stateUser.isAuthenticated)
            props.navigation.navigate("User Profile")
        }
    }, [context.stateUser.isAuthenticated]) // dependency to fire useEffect 


    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Please fill in your credentials")
        }
        else {
            loginUser(user, context.dispatch)
            console.log("Success")
        }
    }

    return (
        <FormContainer title={"Login"}>
            <Input
                placeholder={"Enter Email"}
                name={"Email"}
                id={"Email"}
                value={email}
                onChangeText={text => setEmail(text.toLowerCase())}
            />

            <Input
                placeholder={"Enter Password"}
                name={"Password"}
                id={"Password"}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />

            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title="Login" onPress={() => { handleSubmit() }} />
            </View>

            <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
                <Text style={styles.middleText}>Don't have an account yet ?</Text>
                <Button title="Register" onPress={() => props.navigation.navigate("Register")} />
            </View>

        </FormContainer>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        alignItems: 'center'
    },
    middleText: {
        marginBottom: 20,
        alignSelf: 'center'
    }
})


export default Login;
