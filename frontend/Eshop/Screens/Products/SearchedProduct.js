import React from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';

import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

const {width} = Dimensions.get('window');

const SearchedProduct = props => {
    const { productsFilterd } = props; // store props in variable to not write props every time
    return (
        <Content style={{width:width}}> 
            {productsFilterd.length > 0 ? (
                productsFilterd.map(item => (
                    <ListItem
                        /* onPress navigation */
                        key={item.id}
                        avatar
                    >
                        <Left>
                            <Thumbnail
                                source={{ uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No Products match the selected criteria
                    </Text>
                </View>
            )
            }
        </Content>
    )
}

const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})

export default SearchedProduct;