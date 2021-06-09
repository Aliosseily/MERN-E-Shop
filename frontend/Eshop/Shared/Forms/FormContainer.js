import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';

var { width } = Dimensions.get('window');

const FormContainer = () => {
    //in ScrollView we can't use styles, instead we use contentContainerStyle
    return (
        <ScrollView contentContainerStyle={StyleSheet.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignContent: 'center'
    },
    title: {
        fontSize: 30
    }
})

export default FormContainer;