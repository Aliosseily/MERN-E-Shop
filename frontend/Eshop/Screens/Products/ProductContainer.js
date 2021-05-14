import React from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native';

import Products from '../../assets/data/products.json'

const ProductContainer = () => {
    return(
        <View>
            <FlatList
            data={Products}
            keyExtractor={item => item.name}
            renderItem={itemData =>
            <Text>{itemData.item.brand}</Text>
            }
            />
        </View>
    )
}

export default ProductContainer;