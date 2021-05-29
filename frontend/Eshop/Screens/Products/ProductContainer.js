import React, { useState } from 'react'
import { View, StyleSheet, FlatList,Dimensions,ScrollView } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';

import Products from '../../assets/data/products.json';
import Categories from '../../assets/data/categories.json';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import CategoryFilter from './CategoryFilter';
import Banner from '../../Shared/Banner';
var { height } = Dimensions.get('window')

const ProductContainer = () => {
    const [productsFiltered, setProductsFiltered] = useState(Products);
    const [focus, setFocus] = useState(false); // state to know when we focus on input
    const [active, setActive] = useState(-1);
    const [initialState, setInitialState] = useState(Products);
    const [productsCtg, setProductsCtg] = useState([]);

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

    const changeCtg = category =>{
        {
            category === "all"  
            ? [setProductsCtg(initialState), setActive(true)]
            : [setProductsCtg(Products.filter(prod => prod.category._id === category )),setActive(true)]
        }
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
                (<View>
                    <View>
                        <Banner />
                    </View>
                    <View>
                    <CategoryFilter
                    categories = {Categories}
                    categoryFilter={changeCtg}
                    products={productsCtg}
                    active={active}
                    setActive={setActive}
                    />
                    </View>
                    <View style={styles.listContainer}>
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

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      center: {
          justifyContent: 'center',
          alignItems: 'center'
      }
})

export default ProductContainer;