const mongoose = require("mongoose");//mongoose is responsible for all operation of mongoDb database in the application or in node application. here ew loke import every library and stor it in the constant 

// create schema for products tha contains it's fields
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: '' // default value if not entered
    },
    image: {
        type: String,
        default: ''
    },
    images: [{ // images is array og images and type of each image is String
        type: String,
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: { // 
        type: mongoose.Schema.Types.ObjectId, // type is id of category
        ref: 'Category', // refferrence to category Schema, to insure that the id above is connected to category schema
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0, // to prevent minus numbers
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

// creating model which is same as collection in mongoDb and model in Node.js
// export Product to be used in other files
exports.Product = mongoose.model('Product', productSchema)