var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    type: {
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
    price: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Product', productSchema);