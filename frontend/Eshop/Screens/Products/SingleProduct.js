import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Left, Radio, Container, H1, Right } from 'native-base';

//Redux
import { connect } from 'react-redux';
import * as cartActions from '../../Redux/Actions/cartActions';

const SingleProduct = props => {
    const [item, setItem] = useState(props.route.params.item); // take the props from the route
    const [availability, setAvailability] = useState(null);

    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image style={styles.image}
                        source={{
                            uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>$ {item.price}</Text>
                </Left>
                <Right>
                    <Button 
                    title="Add"  
                    onPress={() => {
                        console.log("PROPSALI",props)
                        props.addItemToCart(item)}}
                    
                    />
                </Right>
            </View>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
return {
    addItemToCart :(product) =>{
        console.log("productproductproduct", product)
        dispatch(cartActions.addToCart({quantity:1, product}))
    }
}

}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red',
    }
})

export default connect(null,mapDispatchToProps)(SingleProduct);