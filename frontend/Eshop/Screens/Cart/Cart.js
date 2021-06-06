import React from 'react';
import { View, Dimensions, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
//Rdux
import { connect } from 'react-redux'; // this method allow us to connect to our store and so we can have access to the state of the store
import * as cartAction from '../../Redux/Actions/cartActions';
var { height, width } = Dimensions.get('window');
const Cart = props => {
    console.log("props", props)

    return (
        <>
            {props.cartItems.length ? (
                <Container>
                    <H1 style={{ alignSelf: 'center' }}>Cart Name</H1>
                    {props.cartItems.map(data => {
                        return (
                            <ListItem
                                style={styles.listItem}
                                key={Math.random()}
                                avatar
                            >
                                <Left>
                                    <Thumbnail 
                                    source={{ uri: data.product.image ? data.product.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}/>
                                </Left>
                                <Body style={styles.body}>
                                        <Left>
                                            <Text>{data.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>$ {data.product.price}</Text>
                                        </Right>
                                </Body>

                            </ListItem>
                        )
                    })}

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
    listItem:{
        alignItems:'center',
        backgroundColor:'white',
        justifyContent:'center'
    },
    body:{
        margin:10,
        alignItems:'center',
        flexDirection:'row'
    }
})

const mapStateToProps = state => {
    const { cart } = state; //cart is the namr of combinedReducers in Store.js
    return {
        cartItems: cart
    }
}


export default connect(mapStateToProps)(Cart);