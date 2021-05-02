const express = require('express');
const { Product } = require('../models/product')// import product schema . import it as object {} beacause of export structure
const { Category } = require('../models/category');
const router = express.Router(); // this router is only responsible for creating API's, storing the API's and sharing them between the files
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
    // we should wait the database to send us the response then we send it to frontend
    const productsList = await Product.find().populate('category'); // populate means that any connected id or field to another table will be displayed as detailed in this field (ex: here product related to category by categry id);
    //const productsList = await Product.find().select('name image -_id'); // return only the selected data from array instead of the whole array
    if (!productsList) { // in case of error
        res.status(500).json({ success: false })
    }
    res.send(productsList);
})

router.get(`/:id`, async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category'); // populate means that any connected id or field to another table will be displayed as detailed in this field (ex: here product related to category by categry id)
    if (!product) { 
        res.status(500).json({ success: false })
    }
    res.send(product);
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

module.exports = router;
