const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");//mongoose is responsible for all operation of mongoDb database in the application or in node application. here ew loke import every library and stor it in the constant 

require('dotenv/config') // npm install --save dotenv yo add variables that will be used globally in all files inside the app
const api = process.env.API_URL; // target the API_URL defined inside .env file

const productsRouter = require('./routers/products')

// middleware
app.use(express.json()); // this is called middleware, express will accept json data, this method allow our data to be understandable by express , which we are sent from front end
app.use(morgan('tiny')); // this is library morgan npm install morgan used to log http requests in the console 

// Routers middleware
app.use(`${api}/products`, productsRouter)

// add mongoose connection before starting the server 
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
}).then(() => {
    console.log("Connection succesfully")
}).catch((err) => {
    console.log("error", err)

})

app.listen(3000, () => {
    console.log("url", api)
    console.log("server is running http://localhost:3000")
})