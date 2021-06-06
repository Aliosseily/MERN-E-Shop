import React from 'react';
import { View, Dimensions, StyleSheet, Button, TouchableOpacity, Touchable } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartItem from './CartItem'
//Redux
import { connect } from 'react-redux'; // this method allow us to connect to our store and so we can have access to the state of the store
import * as cartAction from '../../Redux/Actions/cartActions';

import {SwipeListView} from "react-native-swipe-list-view";



var { height, width } = Dimensions.get('window');





const Cart = props => {
    console.log("props", props)
    var total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });
    return (
        <>
            {props.cartItems.length ? (
                <Container>
                    <H1 style={{ alignSelf: 'center' }}>Cart</H1>
                    <SwipeListView
                    data={props.cartItems}
                    renderItem={(data) => (
                        <CartItem item={data}/>
                    )}
                    renderHiddenItem={(data) => (
                        <View style={styles.hiddenContainer}>
                            <TouchableOpacity style={styles.hiddenButton}>
                                <Icon name="trash" color={"white"} size={30} onPress={() => {props.removeFromCart(data.item)}}/>
                            </TouchableOpacity>
                        </View>
                    )}
                    disableRightSwipe={true}
                    previewOpenDelay={3000}
                    friction={1000}
                    tension={40}
                    leftOpenValue={75}
                    stopLeftSwipe={75}
                    rightOpenValue={-75}

                    />
                    {/* {props.cartItems.map(data => {
                        return (
                           <CartItem item={data}/>
                        )
                    })} */}
                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}>${total}</Text>
                        </Left>
                        <Right>
                            <Button
                             title="Clear" 
                             onPress={() => {
                                 props.clearCart()
                             }}
                             
                             />
                        </Right>
                        <Right>
                            <Button
                                title="Checkout"
                                onPress={() => {
                                    props.navigation.navigate('Checkout')
                                }}
                            />
                        </Right>
                    </View>

                </Container>
            ) :
                (
                    <Container style={styles.emptyContainer}>
                        <Text>Your cart is empty</Text>
                    </Container>

                )
            }
        </>
        // <View style={{ flex: 1 }}>
        //     {props.cartItems.map(prod => {
        //         return (
        //             <Text>{prod.product.name}</Text>
        //         )
        //     })}
        // </View>
    )
}



const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
      },
      hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
      }
})

const mapStateToProps = state => {
    console.log("statestateAli",state);
    const { cart } = state; //cart is the namr of combinedReducers in Store.js
    return {
        cartItems: cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => {dispatch(cartAction.clearCart())},
        removeFromCart: (item) => {dispatch(cartAction.removeFromCart(item))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);