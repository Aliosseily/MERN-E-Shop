import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';

import Products from '../../assets/data/products.json'
import ProductList from './ProductList';

const ProductContainer = () => {
    //numColumns={2} devide screen into 2 columns
    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search"/>
                    <Input placeholder="search"/>
                </Item>
            </Header>
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
        </Container>
    )
}

export default ProductContainer;