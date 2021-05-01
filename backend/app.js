const express = require("express");
const app = express();

require('dotenv/config') // npm install --save dotenv yo add variables that will be used globally in all files inside the app
var api = process.env.API_URL; // target the API_URL defined inside .env file
app.use(express.json()); // this is called middleware, exprees will accept json data, this method allow our data to be understandable by express , which we are sent from front end
app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'product 1',
        image: "Some image"
    }
    res.send(product)
})
app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    console.log("newProduct",newProduct)
    res.send(newProduct)
})

app.listen(3000, () => {
    console.log("url", api)
    console.log("server is running http://localhost:3000")
})