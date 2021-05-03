const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash'); // execlude passwordHash from being returned with the object

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash'); // execlude passwordHash from being returned with the object;

    if (!user) {
        res.status(500).json({ success: false, message: "User mot found!" })
    }
    res.status(200).send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        // we send password field which is not added in schema model and assign it to passwordHash
        passwordHash: bcrypt.hashSync(req.body.password, 10), // 10 is called salt you can add any thing. it is like extra secret information so any person cannot decrypt this hash
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if (!user) {
        return res.status(404).send('The user cannot be registered!');
    }
    res.send(user);
})
//http://localhost:3000/api/v1/users/login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email }) // check if the user with this email is exist
    const secret = process.env.SECRET;
    if (!user) {
        return res.status(400).send('User not found!'); // if user not exist send USer not found
    }
    // decrypt passwordHash and compare it with password entered by user
    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) { // if user and password entered right ?
        const token = jwt.sign(
            {
                userId: user.id // here you can pass the data (any data) you want with the token
            },
           // this called secret is like a password you choose on your own used to create your tokens . it can be any string
           // the token is created by thi secret string which can be any thing , and this secret no body knows about it . So no one can create same tokens which are used in your web shop
           secret, //'secrete' you can add it as string directly or load it from .env file
           {expiresIn : '1d'} // token expires in 1 day , 1w 1 week
           )
        // send the token so that the user can use it to access the api
        res.status(200).send({
            user: user.email,
            token: token,
            message: 'User Authenticated'
        })
        //return res.status(200).send(user) // if user exist then send the user
    }
    else {
        res.status(400).send('Wrong Password!')
    }
})

module.exports = router;