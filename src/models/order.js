const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id: { type: Number, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, default: 1},
});

module.exports = mongoose.model('Order', orderSchema);