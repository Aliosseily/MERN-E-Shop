import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';
import { NavigationContainer } from '@react-navigation/native';

// navigators
import Main from './Navigators/Main';

LogBox.ignoreAllLogs(true)

export default function App() {

  return (
    <NavigationContainer>
        <Header />
        {/* <ProductContainer /> */}
        <Main />
    </NavigationContainer>

  );
}

