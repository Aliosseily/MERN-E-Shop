import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                headerShown: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                headerShown: false // remove back button from top of the page
                }}
            />
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                headerShown: false // remove back button from top of the page
                }}
            />
        </Stack.Navigator>
    )
}

export default MyStack;