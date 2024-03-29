import React, { useContext, useState, useCallback, useEffect } from 'react';

import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/authActions';


const UserProfile = props => {
    const context = useContext(AuthGlobal) // AuthGlobal will be availbale in our component through the context constant
    const [userProfile, setUserProfile] = useState();

    useEffect(() => {
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
            props.navigation.navigate("Login") // will trigger when we loged out user from user profile screen
        }

        AsyncStorage.getItem("jwt") //get token 
            .then((res) => {
                // sub is the id of the user 
                axios.get(`${baseURL}users/${context.stateUser.user.userId}`, {
                    headers: { Authorization: `Bearer ${res}` },
                }).then((user) => {
                    setUserProfile(user.data)
                })
            })
            .catch((err) => console.log(err))
        return () => {
            setUserProfile();
        }
    }, [context.stateUser.isAuthenticated])

    return (
        <Container style={styles.container}>
            <ScrollView  contentContainerStyle={styles.subContainer}>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email : {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone : {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"} onPress={() => {
                        AsyncStorage.removeItem("jwt");
                        logoutUser(context.dispatch)
                    }} />
                </View>

            </ScrollView>
        </Container>

    )
}


const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    subContainer:{
        alignItems:'center',
        marginTop:60
    }
})

export default UserProfile;
