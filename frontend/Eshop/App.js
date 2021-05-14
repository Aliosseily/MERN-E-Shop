import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header';

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
