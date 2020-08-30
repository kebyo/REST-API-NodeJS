const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerID: Number, 
    products: [{}],
});

module.exports = mongoose.model('Order', orderSchema);