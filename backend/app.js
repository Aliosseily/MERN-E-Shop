const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');//mongoose is responsible for all operation of mongoDb database in the application or in node application. here ew loke import every library and stor it in the constant 
const cors = require('cors')
require('dotenv/config') // npm install --save dotenv yo add variables that will be used globally in all files inside the app
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
app.use(cors()); // enable cors
app.options('*', cors()); // allow every thing to use this cors, allow all http requests (GET, POST, DELETE, PUT) to be passed from any other origin 
// define the public upload as static folder in the middleware of our application so that images can be shwon to user ex: (http://localhost:3000/public/uploads/Repository.PNG-1620566725991.png) 
// so any file uploaded to /public/uploads it will not be as an API, it will be like a static path , which is serving the files
app.use('/public/uploads' , express.static(__dirname + '/public/uploads'))
const api = process.env.API_URL; // target the API_URL defined inside .env file

// Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

// middleware - middleware is cheking every thing going to the server before it get executed
app.use(express.json()); // this is called middleware, express will accept json data, this method allow our data to be understandable by express , which we are sent from front end
app.use(morgan('tiny')); // this is library morgan npm install morgan used to log http requests in the console 
app.use(authJwt()); // our server is secured by the token, so any request will come, will be asked authentication
app.use(errorHandler) // this method will be executed every time there is an error in our api 
// instead of handling errors directly inside app.js here, we can create helper file and add the logic inside it and then use it here like we do above app.use(errorHandler)
// app.use((err, req, res, next) => {
//     if (err) {
//         return res.status(500).json({ message: err })
//     }
// })

// Routes middleware
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

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