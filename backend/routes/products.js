const express = require('express');
const router = express.Router(); // this router is only responsible for creating API's, storing the API's and sharing them between the files
const {Product} = require('../models/product')// import product schema . import it as object {} beacause of export structure
// app.get(`${api}/products`, (req, res) => {
//     const product = {
//         id: 1,
//         name: 'product 1',
//         image: "Some image"
//     }
//     res.send(product)
// })
// replace app.get with router.getand ${api}/products with /
router.get(`/`, async (req, res) => {
    // we should wait the database to send us the response then we send it to frontend
    const productsList = await Product.find();
    if (!productsList) { // in case of error
        res.status(500).json({ success: false })
    }
    res.send(productsList);
})
// app.post(`${api}/products`, (req, res) => {
//     const newProduct = req.body;
//     console.log("newProduct", newProduct)
//     res.send(newProduct)
// })
// replace app.post with router.post and ${api}/products with /
router.post(`/`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStick: req.body.countInStick,
    })
    product.save().then((createdProduct) => { // you can use async await instead
        res.status(201).json(createdProduct);
    }).catch((err) => {
        res.status(500).json({
            error: err,
            succsee: false
        })
    })
})

module.exports = router;
