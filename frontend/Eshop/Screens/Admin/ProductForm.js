import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Item, Picker } from 'native-base';
import FormContainer from '../../Shared/Forms/FormContainer';
import Input from '../../Shared/Forms/Input';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import Error from '../../Shared/error';
import AsyncStorage from '@react-native-community/async-storage';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import * as ImagePicker from "expo-image-picker";

const ProductForm = props => {

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState();
    const [isFeatured, setIsFeatured] = useState(false); // set featured products in main page
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState();
    const [item, setItem] = useState(null);


    useEffect(() => {
        axios.get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data)
            })
            .catch((error) => {
                alert("Error to load categories")
            });


            // Image Picker
            (async () => {
                if (Platform.OS !== "web") {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== "granted") {
                        alert("Sorry, we need camera roll permissions to make this work");
                    }
                }
            })();

        return () => {
            setCategories([]);
        }

    }, [])


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // accept all formats of image (you can specifiy the formats you need)
            allowsEditing: true, //to edit image before upload
            aspect: [4, 3], // size of our image 
            quality: 1 //quality of image 
        })
        if(!result.cancelled){
            setMainImage(result.uri);
            setImage(result.uri);
        }
    }

    return (
        <FormContainer title="Add Product">
            <View style={styles.imageContainer}>
                <Image source={{ uri: mainImage }} style={styles.image} />
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Icon style={{ color: "white" }} name="camera" />
                </TouchableOpacity>
            </View>

            <View style={styles.label}>
                <Text style={styles.textLabel}>Brand</Text>
            </View>
            <Input
                placeholder="Brand"
                name="brand"
                id="brand"
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />

            <View style={styles.label}>
                <Text style={styles.textLabel}>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="name"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <View style={styles.label}>
                <Text style={styles.textLabel}>Price</Text>
            </View>
            <Input
                placeholder="Price"
                name="price"
                id="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) => setPrice(text)}
            />

            <View style={styles.label}>
                <Text style={styles.textLabel}>Count In Stock</Text>
            </View>
            <Input
                placeholder="Stock"
                name="stock"
                id="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) => setCountInStock(text)}
            />

            <View style={styles.label}>
                <Text style={styles.textLabel}>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="sescription"
                id="description"
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
            <Item picker>
                <Picker
                    style={{ width: 200, height: 40 }}

                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    placeholder="Select your Category"
                    selectedValue={pickerValue}
                    placeholderStyle={{ color: "#007aff" }}
                    placeholderIconColor="#007aff"
                    onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                >
                    {categories.map((c) => {
                        return <Picker.Item key={c._id} label={c.name} value={c._id} />
                    })}
                </Picker>
            </Item>

            {error ? <Error message={error} /> : null}
            <View style={styles.buttomContainer}>
                <EasyButton
                    large
                    primary
                //onPress
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EasyButton>
            </View>

        </FormContainer>

    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    textLabel: {
        textDecorationLine: "underline"
    },
    buttomContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        borderRadius: 100,
        elevation: 20
    }
})

export default ProductForm;