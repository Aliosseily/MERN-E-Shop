import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


//Redux
import store from './Redux/store';
import { Provider } from 'react-redux';

// navigators
import Main from './Navigators/Main';

//Contect Api
import Auth from './Context/store/Auth'

LogBox.ignoreAllLogs(true)

export default function App() {

  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          {/* <ProductContainer /> */}
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

