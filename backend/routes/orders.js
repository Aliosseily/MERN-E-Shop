const { Order } = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();
// get all orders
router.get(`/`, async (req, res) => {
    // get only the name in the populated user object, and sort result by date , you can use .sort('dateOrdered'); like this, -1 measn that sort form newest to oldes
    const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
})
// get specific order by order id 
router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name') // populate user inside orders and get only user name
        // .populate({path:'orderItems', populate:'product'}) // populate orderItems inside orders and product inside orderItems
        .populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } }) // also populate the category inside product
    if (!order) {
        res.status(500).json({ success: false })
    }
    res.send(order);
})
// create new order and create order items of the order
router.post('/', async (req, res) => {
    //Promise.all to combine two promises togrther [ Promise { <pending> }, Promise { <pending> } ] returned, because user sned array of items together we got multiple promises
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => { // loop over the array of order items sent from the user
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save(); // Saving the orderitems of order in the database
        return newOrderItem._id; // return only the ids of the order items sent from the user
    }))
    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices =  await Promise.all(orderItemsIdsResolved.map( async(orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price'); // ppulate product in orderitem and get price
        console.log("orderItem",orderItem)
        const totalPrice = orderItem.product.price * orderItem.quantity;
        console.log("totalPrice",totalPrice)

        return totalPrice; 
    }))
      // totalPrices is array of totalPrice (quantity * price)
    const totalPrice = totalPrices.reduce((a,b) => a +b , 0)


    let order = new Order({
        orderItems: orderItemsIdsResolved, // post the ids of the order itmes to order
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice:totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if (!order) {
        return res.status(404).send('The order cannot be created!');
    }
    res.send(order);
})
//update the status of the order (admin can update the status from pending to shipped ...)
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            { new: true } // this mean that I want to return the new updated data not the old one
        )

        if (!order) {
            return res.status(404).send('The order cannot be updated!');
        }
        res.send(order);
    }
    catch (err) {
        console.log("ERRRRRRRRRRRRR", err)
    }
})
// delete order and its related items
router.delete('/:id', async (req, res) => {
    try {
        let deletedOrder = await Order.findByIdAndRemove(req.params.id) // get id param from frontend
        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found!' });
        }
        // delete related orderitems when order deleted
        deletedOrder.orderItems.map(async orderItem => {
            await OrderItem.findByIdAndRemove(orderItem)
        })
        return res.status(200).json({ success: true, message: 'Order deleted' });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });

    }
})
// get the total price of all orders 
router.get('/get/totalsales', async (req, res) => {
    //Aggregation operations group values from multiple documents together, and can perform a variety of operations on the grouped data to return a single result.
    // aggregate like join in relatiional database, we can group all tables or documents inside that table to one, and then i get one of these fields in that table and use one of mongoose methods $sum for example for specific field , and it will return to me the sum of all field of the same name 
    const totalSales = await Order.aggregate([
        // get the sum of all totalPrice fileds in every order by using mongoose $sum method
        // mongoose cannot return object without an id
        // get the sum of totalPrice filed in each order
        {$group :{_id:null , totalsales : {$sum : '$totalPrice'}}}
    ])
    if(!totalSales){
        res.status(400).send('The order itme cannot be generated!')
    }
    res.send({totalsales:totalSales.pop().totalsales})

})
// count the number of orders
router.get(`/get/count`, async (req, res) => {
    // countDocuments to count the number of orders
    const ordersCount = await Order.countDocuments((count) => count); //(count) => count) get count return count and store it in ordersCount variable
    if (!ordersCount) { // in case of error
        res.status(500).json({ success: false })
    }
    res.send({ ordersCount }); // return ordersCount as object
})
// get list of orders for specific user
router.get(`/get/userorders/:userid`, async (req, res) => {
    const userOrdersList = await Order.find({user:req.params.userid})
    .populate({path:'orderItems' , populate:{path:'product', populate: 'category'}}).sort({'dateOrdered': -1})
    if (!userOrdersList) {
         res.status(500).json({ success: false })
     }
     res.send(userOrdersList);
})

module.exports = router;