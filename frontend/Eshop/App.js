import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';
import { NavigationContainer } from '@react-navigation/native';

//Redux
import store from './Redux/store';
import { Provider } from 'react-redux';

// navigators
import Main from './Navigators/Main';

LogBox.ignoreAllLogs(true)

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
        <Header />
        {/* <ProductContainer /> */}
        <Main />
    </NavigationContainer>
    </Provider>
  );
}

