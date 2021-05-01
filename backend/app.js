const express = require("express");
const app = express();

require('dotenv/config') // npm install --save dotenv yo add variables that will be used globally in all files inside the app
var api = process.env.API_URL; // target the API_URL defined inside .env file

app.get('/', (req , res) => { 
res.send("Hello")
})

app.listen(3000 , () => {
    console.log("url", api)
    console.log("server is running http://localhost:3000")
})