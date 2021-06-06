import React from 'react'
import { View, Text, Button, Image, Dimensions, StyleSheet } from 'react-native';

import { connect } from 'react-redux'; // this method allow us to connect to our store and so we can have access to the state of the store
import * as cartActions from '../../Redux/Actions/cartActions';

var { width } = Dimensions.get('window');
console.log("width", width)
const ProductCart = props => {
    const { name, price, image, countInStock } = props;
    console.log(image)

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode='contain' // make image fit the container               
                source={{ uri: image ? image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
            />
            <View style={styles.card} />
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
            </Text >
            <Text style={styles.price}>
                ${price}
            </Text>
            {countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <Button
                        title='Add'
                        color='green'
                        onPress={() => {
                            console.log("PROPSALIOss",props)

                             props.addItemToCart(props) }}
                    />
                </View>
            ) : <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>}
        </View>
    )
}


const mapDispatachToProps = dispatch => {
    return {
        addItemToCart: (product) => {
            console.log("ADDED", product)
            dispatch(cartActions.addToCart({ quantity: 1, product }))
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -45
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    }
})

export default connect(null, mapDispatachToProps)(ProductCart);