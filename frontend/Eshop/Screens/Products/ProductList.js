import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

//Dimensions, allow us to get the dimensions of the device, so we can calculate dynamically our style
var { width } = Dimensions.get("window");

const ProductList = props => {
    var { item } = props; // store every thing in props in item varaible (Destructuring)
    // width / 2 to have two columns
    // {...item} send every thing in props to ProductCart 
    return (
        <TouchableOpacity
            style={{ width: '50%' }}
            onPress={() =>
                props.navigation.navigate('Product Detail' , {item:item}) // pass item in the route as param, get it in SingleProduct.js
            }
        >
            <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default ProductList;