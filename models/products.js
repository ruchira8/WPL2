var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    price: [{size: String, price: Number}]
});
var toppingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    toppings: [{name: String, price: Number}]
});
module.exports = mongoose.model('Product', productSchema);