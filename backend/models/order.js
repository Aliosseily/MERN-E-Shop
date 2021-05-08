const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{// we put it in array beacuse we need to pass order items, array of Id's of of order items which are existing in the database(one order have multiple of items)
        type: mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type:String,
        required: true
    },
    shippingAddress2:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    zip:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true,
        default:'Pending'
    },
    totalPrice:{
        type:Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }

})

// create new virtual attribute from products object , instead of having _id this will create another field called id
productSchema.virtual('id').get(function () {
    return this._id.toHexString(); // toHexString because we have hexSting for id called object Id
})
// enable virtual fields created above (id)
productSchema.set('toJSON',{
    virtuals:true 
})

exports.Order = mongoose.model('Order', orderSchema);
