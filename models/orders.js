var mongoose = require("mongoose");
var User = require('../models/user');
var Product = require('../models/products');

var orderDetailsSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    total: {type: Number}
});

var orderSchema = new mongoose.Schema({
    // buyer details
    id: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    deliveryAddress: String,
    // price details
    items: [orderDetailsSchema],
    total: {type: Number, required: true},
    // payment info
    status: {type: String, default: 'pending'}, // pending, paid/failed, delivered, canceled, refunded.
    type: String
});
module.exports = mongoose.model('Order', orderSchema);