import { Platform } from 'react-native';

let baseURL = 'https://eshop-mern.herokuapp.com/api/v1/'

// let baseURL = '';

// {
//     Platform.OS === "android"
//         ? baseURL = 'http://10.0.2.2:3000/api/v1/'//in android localhost is a reserved word so we need to use differrent url
//         : baseURL = 'http://localhost:3000/api/v1/'
// }

export default baseURL;