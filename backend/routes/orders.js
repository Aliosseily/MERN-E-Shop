const {Order} = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.send(orderList);
})

router.post('/', async (req, res) => {
    //Promise.all to combine two promises togrther [ Promise { <pending> }, Promise { <pending> } ] returned, because user sned array of items together we got multiple promises
 const orderItemsIds = Promise.all(req.body.orderItems.map( async orderItem => { // loop over the array of order items sent from the user
     let newOrderItem = new OrderItem({
         quantity: orderItem.quantity,
         product:orderItem.product
     })
     newOrderItem = await newOrderItem.save(); // we are saving the order item in the database
     return newOrderItem._id; // return only the ids of the order items sent from the user
 }))
    const orderItemsIdsResolved = await orderItemsIds
    let order = new Order({
        orderItems: orderItemsIdsResolved, // post the ids of the order itmes to order
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if (!order) {
        return res.status(404).send('The order cannot be created!');
    }
    res.send(order);
})

module.exports =router;