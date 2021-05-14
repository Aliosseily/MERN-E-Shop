import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Products from '../../assets/data/products.json'
import ProductList from './ProductList';

const ProductContainer = () => {
    //numColumns={2} devide screen into 2 columns
    return (
        <View>
            <Text>Product Container</Text>
            <View style={{ marginTop: 100 }}>
                <FlatList
                    numColumns={2}
                    data={Products}
                    keyExtractor={item => item.name}
                    renderItem={item =>
                        <ProductList
                            key={item.id}
                            item={item.item}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default ProductContainer;