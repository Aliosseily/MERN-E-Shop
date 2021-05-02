const mongoose = require("mongoose");//mongoose is responsible for all operation of mongoDb database in the application or in node application. here ew loke import every library and stor it in the constant 

// create schema for products tha contains it's fields
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStick: {
        type: Number,
        required: true
    }
})

// creating model which is same as collection in mongoDb and model in Node.js
// export Product to be used in other files
exports.Product = mongoose.model('Product', productSchema)