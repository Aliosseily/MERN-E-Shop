const express = require('express');
const { Product } = require('../models/product')// import product schema . import it as object {} beacause of export structure
const { Category } = require('../models/category');
const router = express.Router(); // this router is only responsible for creating API's, storing the API's and sharing them between the files
const mongoose = require('mongoose');
//#region 
// app.get(`${api}/products`, (req, res) => {
//     const product = {
//         id: 1,
//         name: 'product 1',
//         image: "Some image"
//     }
//     res.send(product)
// })
// app.post(`${api}/products`, (req, res) => {
//     const newProduct = req.body;
//     console.log("newProduct", newProduct)
//     res.send(newProduct)
// })
//#endregion


// replace app.get with router.getand ${api}/products with /
router.get(`/`, async (req, res) => {
    let filter = {};
    // another type of parameter id query parameter (:id url parameter , and body parmeter)
    if (req.query.categories) {
        // get categories from url ex : http://localhost:300/api/v1/products?categories=15255,9845665
        filter = { category: req.query.categories.split(',') } // sploit the categories
        console.log('filter',filter)
    }
    // we should wait the database to send us the response then we send it to frontend
    const productsList = await Product.find(filter).populate('category'); // populate means that any connected id or field to another table will be displayed as detailed in this field (ex: here product related to category by categry id);
    //const productsList = await Product.find().select('name image -_id'); // return only the selected data from array instead of the whole array and execlude _id
    if (!productsList) { // in case of error
        res.status(500).json({ success: false })
    }
    res.send(productsList);
})

router.get(`/:id`, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) { // this will check if the id of product to be updated is valid or not
            return res.status(400).send('Invalid Product Id!');
        }
        const product = await Product.findById(req.params.id).populate('category'); // populate means that any connected id or field to another table will be displayed as detailed in this field (ex: here product related to category by categry id)
        if (!product) {
            res.status(500).json({ success: false })
        }
        res.send(product);
    } catch (err) {
        return res.status(400).send('Product Not Found!', err);

    }
})

// replace app.post with router.post and ${api}/products with /
router.post(`/`, async (req, res) => {
    try {
        const category = await Category.findById(req.body.category) // category is category id sent from frontend
        if (!category) { // check if category id exists
            return res.status(400).send('Invalid category!');
        }
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            dateCreated: req.body.dateCreated
        })
        product = await product.save();

        if (!product) {
            return res.status(500).send('The product cannot be created!');
        }
        res.send(product);
    } catch (err) {
        console.log("err", err)
        return res.status(500).send('Error occured!');

    }
})

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) { // this will check if the id of product to be updated is valid or not
        return res.status(400).send('Invalid Product Id!');
    }
    try {
        const category = await Category.findById(req.body.category) // category is category id sent from frontend
        if (!category) { // check if category id exists
            return res.status(400).send('Invalid category!');
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
                dateCreated: req.body.dateCreated
            },
            { new: true } // this mean that I want to return the new updated data not the old one
        )

        if (!product) {
            return res.status(404).send('The product cannot be updated!');
        }
        res.send(product);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send('Error occured while trying to update this product!');

    }
})


router.delete('/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findByIdAndRemove(req.params.id) // get id param from frontend
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'category not found!' });
        }
        return res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });

    }
})
//http://localhost:3000/api/v1/products/get/count
router.get(`/get/count`, async (req, res) => {
    const productsCount = await Product.countDocuments((count) => count); //(count) => count) get count return count and store it in productsCount variable
    if (!productsCount) { // in case of error
        res.status(500).json({ success: false })
    }
    res.send({ productsCount }); // return productsCount as object
})

router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const featuredProducts = await Product.find({ isFeatured: true }).limit(+count) // get list of all products that has isFeatured field true and limit the list returned by using limit and passing count to it
    if (!featuredProducts) { // in case of error
        res.status(500).json({ success: false })
    }
    res.send({ featuredProducts }); // return productsCount as object
})
module.exports = router;
