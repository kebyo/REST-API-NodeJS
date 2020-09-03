const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerID: { type: Number, required: true },
    products: { type: [{}], required: true },
});

module.exports = mongoose.model('Order', orderSchema);