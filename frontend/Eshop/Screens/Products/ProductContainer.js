import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native';
import { Container, Header, Icon, Item, Input, Text } from 'native-base';

import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

import Products from '../../assets/data/products.json';
import Categories from '../../assets/data/categories.json';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import CategoryFilter from './CategoryFilter';
import Banner from '../../Shared/Banner';
var { height } = Dimensions.get('window')

const ProductContainer = props => {


    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState(); // when we focus
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("RUUUUUUN", baseURL)
        setFocus(false);
        //setCategories(Categories);
        setActive(-1);

        axios.get(`http://7c5a135f2a1d.ngrok.io/api/v1/products`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDkwMDdlMzliMzhhNjNmZDRiMzk4OWQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MjQ1NDI1NTIsImV4cCI6MTYyNDYyODk1Mn0.26rIH0msf_ooWFIaVOw3HfIhL2uQ--OGBYBsscy9CXk'
            }
        })
            .then((res) => {
                console.log("resresAAAOss", res.data.length)
                setProducts(res.data)
                setProductsFiltered(res.data)
                setProductsCtg(res.data)
                setInitialState(res.data)
                console.log("productsCtg", productsCtg.length)

            })
            .catch(error => console.log("error", error));


        axios.get(`http://7c5a135f2a1d.ngrok.io/api/v1/categories`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDkwMDdlMzliMzhhNjNmZDRiMzk4OWQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MjQ1NDI1NTIsImV4cCI6MTYyNDYyODk1Mn0.26rIH0msf_ooWFIaVOw3HfIhL2uQ--OGBYBsscy9CXk'
            }
        })
            .then((res) => {
                console.log("setCategoriesAAAOss", res.data)
                setCategories(res.data);
            })
            .catch(error => console.log("error", error));

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
        };
    }, []);


    // useEffect(() => {
    //     console.log("resresAAA", `${baseURL}`)

    //     setFocus(false);
    //     setCategories(Categories);
    //     setActive(-1);

    //     axios.get(`${baseURL}products`)
    //         .then((res) => {
    //             console.log("resresAAAOss", res)
    //             setProducts(res.data)
    //             setProductsFiltered(res.data)
    //             setProductsCtg(res.data)
    //             setInitialState(res.data)

    //         })
    //     return () => {
    //         setProducts([]);
    //         setProductsFiltered([]);
    //         setFocus();
    //         setCategories([]);
    //         setActive();
    //         setInitialState();
    //     };
    // }, [])


    //numColumns={2} devide screen into 2 columns
    const searchProduct = text => {
        let filtered = products.filter(product => product.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
        setProductsFiltered(filtered)
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    const changeCtg = category => {
        console.log("categoryAA",category)
        {
            category === "all"
                ? [setProductsCtg(initialState), setActive(true)]
                : [setProductsCtg(products.filter(prod => prod.category._id === category)), setActive(true)]
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
                (<SearchedProduct productsFilterd={productsFiltered} navigation={props.navigation} />)
                :
                (
                    <ScrollView >
                        <View>
                            <View>
                                <Banner />
                            </View>
                            <View>
                                <CategoryFilter
                                    categories={categories}
                                    categoryFilter={changeCtg}
                                    products={productsCtg}
                                    active={active}
                                    setActive={setActive}
                                />
                            </View>
                            {productsCtg.length > 0 ?
                                (
                                    <View style={styles.listContainer}>
                                        {productsCtg.map(item => {
                                            return (
                                                <ProductList
                                                    navigation={props.navigation}
                                                    key={item.name}
                                                    item={item}
                                                />
                                            )
                                        })}
                                    </View>
                                ) :
                                (
                                    <View style={[styles.center, { height: height / 2 }]}>
                                        <Text>No products found!</Text>
                                    </View>
                                )
                            }
                            {/* <View style={styles.listContainer}>
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
                            </View>*/}
                        </View>
                    </ScrollView>
                )
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
        //height: height,
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