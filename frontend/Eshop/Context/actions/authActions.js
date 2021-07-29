import jwt_decode from 'jwt-decode';
//AsyncStorage used to store data in the phone storage, on the phone memory without having to refresh every time
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseUrl';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    console.log("loginUser",user)
    console.log("dispatch",dispatch)
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json() )
        .then((data) => {
            if (data) {
                const token = data.token;
                AsyncStorage.setItem("jwt", token) // we are saving our token for authentication of our user into our async storage from our mobile device
                const decoded = jwt_decode(token)// decode our token
                dispatch(setCurrentUser(decoded, user));//TODO
            }
            else {
                logoutUser(dispatch);
            }
        })
        .catch((error) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please provide correct credentials",
                text2: ""
            });
            logoutUser(dispatch);
        })
}


export const getUserProfile = id => {
    fetch(`${baseURL}users/${id}`,{
        method:"GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => console.log(data))

}

export const logoutUser = dispatch => {
    AsyncStorage.removeItem("jwt"); // remove token from jwt 
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) =>{
    return{
        type:SET_CURRENT_USER,
        payload:decoded,
        userProfile:user
    }
}