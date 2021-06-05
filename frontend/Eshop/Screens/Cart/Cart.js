import React from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux'; // this method allow us to connect to our store and so we can have access to the state of the store

const Cart = props => {
    console.log("props",props)

    return (
        <View style={{ flex: 1 }}>
            {props.cartItems.map(prod => {
                return (
                    <Text>{prod.product.name}</Text>
                )
            })}
        </View>
    )
}


const mapStateToProps = state => {
    const  {cart}  = state; //cart is the namr of combinedReducers in Store.js
    return {
        cartItems: cart
    }
}


export default connect(mapStateToProps)(Cart);