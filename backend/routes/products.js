const express = require('express');
const { Product } = require('../models/product')// import product schema . import it as object {} beacause of export structure
const { Category } = require('../models/category');
const router = express.Router(); // this router is only responsible for creating API's, storing the API's and sharing them between the files
const mongoose = require('mongoose');
// multer is a library used to upload files to our server
const multer = require('multer');
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

// this file contain the list of file type that are allowed to be uploaded
const FILE_TYPE_MAP = {
    'image/png':'png', // key image/png is the minmetype,  and value png
    'image/jpeg':'jpeg', 
    'image/jpg':'jpg'     
}

// https://github.com/expressjs/multer#readme
// diskStorage is used to generate unique name for every file we need to upload it to server, to not lose some files because hey have same name 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       const isValidFile = FILE_TYPE_MAP[file.mimetype] // check if the value of file is found in my FILE_TYPE_MAP list, it will get the mime type and check if it is founf in tha MAP
       let uploadError = new Error('invalid image type');
       if(isValidFile){ // if isValidFile uploadError is null, no error.
        uploadError = null
       }
        cb(uploadError, 'public/uploads') // upload destination where my files located when uploaded, when upload file it will be located in this destination
    },
    filename: function (req, file, cb) { // filename is the name of the file generated unique
      const fileName = file.originalname.split(" ").join('-')// replace " " with -
      // mimetype will include the file information with the extension of the mimetype   
        const extension = FILE_TYPE_MAP[file.mimetype]// it will got to FILE_TYPE_MAP array and check the mimetype(image/png...) and then assign the extension as value
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })


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
//  uploadOptions.single('image') image is the filed I want to send from frontend
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    try {
        const category = await Category.findById(req.body.category) // category is category id sent from frontend
        if (!category) { // check if category id exists
            return res.status(400).send('Invalid category!');
        }

        const file = req.file;
        if(!file) return res.status(400).send("No image in the request!")

        const fileName = req.file.filename; // multer send us with this request the file name, cmoing from diskStorage defined above
       //req.protocol => this will return 'http'
       //req.get('host') => this will return host from the request 'localhost:3000'
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`, // we should insert the full path of the file  http://localhost:3000/public/upload/filename.jpg
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

router.put('/:id',uploadOptions.single('image'),  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) { // this will check if the id of product to be updated is valid or not
        return res.status(400).send('Invalid Product Id!');
    }
    try {
        const category = await Category.findById(req.body.category) // category is category id sent from frontend
        if (!category) return res.status(400).send('Invalid category!'); // check if category id exists
        const product = await Product.findById(req.params.id);
        if (!product) res.status(400).send('Invalid Product!') // chaeck if product is valid , if the user updating a right product

        const file = req.file;
        let imagePath; 

        if(file){ // if user enter new image , the get the new image path
            const fileName = req.file.filename; 
            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
            imagePath =`${basePath}${fileName}`
        }
        else{ //if the user do not change the image, then take the old one
            imagePath = product.image;
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: imagePath,
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

        if (!updatedProduct) {
            return res.status(404).send('The product cannot be updated!');
        }
        res.send(updatedProduct);
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
