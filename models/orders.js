var mongoose = require("mongoose");
var OrderDetailsSchema = new mongoose.Schema({
    product: {type: mongoose.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    total: {type: Number, get: getPrice, set: setPrice}
});