import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';// to reload if we have new produts
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem from './ListItem';

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headeritem}></View>
            <View style={styles.headeritem}><Text style={styles.text}>Brand</Text></View>
            <View style={styles.headeritem}><Text style={styles.text}>Name</Text></View>
            <View style={styles.headeritem}><Text style={styles.text}>Category</Text></View>
            <View style={styles.headeritem}><Text style={styles.text}>Price</Text></View>
        </View>
    )
}

const Products = props => {
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    // to reload if we have new produts on navigation
    useFocusEffect(
        useCallback(
            () => {
                // get token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((err) => console.log(err))


                axios.get(`${baseURL}products`)
                    .then(res => {
                        console.log("hjjjjjjjj", res)
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })
                // cleatup function
                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }

            }, []
        )
    )

    const searchProduct = text => {
        console.log("RUUN",text)
        if (text == '') {
            setProductFilter(productList);
        }
        setProductFilter(productList.filter(i => i.name.toLowerCase().includes(text.toLowerCase())))
    }

    return (
        <View>
            <View>
                <Header searchBar rounded>
                    <Item style={{ padding: 5 }}>
                        <Icon name="search" />
                        <Input
                            placeholder="search"
                            onChangeText={text => searchProduct(text)}
                        />
                    </Item>

                </Header>
            </View>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" color="red" style={styles.spinner} />
                </View>
            ) :
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
                        //  send all item as props to ListItem
                        <ListItem {...item}
                            navigation={props.navigation}
                            index={index}
                        />
                    )}
                />

            }
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headeritem: {
        margin: 3,
        width: width / 6
    },
    text: {
        fontWeight: '600'
    },
    spinner: {
        height: height / 2,
        alignItems: "center",
        justifyContent: "center"
    }

})



export default Products;