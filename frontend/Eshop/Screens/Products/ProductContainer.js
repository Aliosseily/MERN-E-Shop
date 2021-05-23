import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';

import Products from '../../assets/data/products.json'
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';

const ProductContainer = () => {
    const [productsFiltered, setProductsFiltered] = useState(Products);
    const [focus, setFocus] = useState(false); // state to know when we focus on input
    //numColumns={2} devide screen into 2 columns

    const searchProduct = text => {
        let filtered = Products.filter(product => product.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        setProductsFiltered(filtered)
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus === true ? (<Icon name='ios-close' onPress={onBlur} />) : null}
                </Item>
            </Header>
            {focus === true ?
                (<SearchedProduct productsFilterd={productsFiltered} />)
                    :
                    (   <View>
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
                    </View>)
            }
         
        </Container>
    )
}

export default ProductContainer;