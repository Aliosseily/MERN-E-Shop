import React from 'react'
import { View, Text, TouchableOpacity, Dimensions,Image, StyleSheet, SafeAreaView } from 'react-native';


const Header = () => {
    // SafeAreaView to avoid header notches
    return (
        <SafeAreaView style={styles.header}>
            <Image style={{height:50}}
            source={require('../assets/Logo.png')}
            resizeMode='contain'
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        padding:20,
        marginTop:80// to be deleted
    }
})

export default Header;