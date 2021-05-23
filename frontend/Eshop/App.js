import React from 'react';
import { LogBox, StyleSheet, View} from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';

LogBox.ignoreAllLogs(true)

export default function App() {

  return (
    <View style={styles.screen}>
      <Header />
      <ProductContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems:"center",
    justifyContent:'center',
    backgroundColor:'#fff'
  },
});
