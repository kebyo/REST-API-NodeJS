const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product  = require('../models/product');

router.get('/', (req, res) => {
    res.json({
        message: 'Get orders',
    })
})

router.post('/', async (req, res) => {
    console.log(req.body.products);
    const order = new Order({
        customerID: req.body.customerID,
        products: req.body.products,
    })
    await order.save();
    res.json({
        message: 'Add new order', 
        order: order,
    });
})

router.get('/:id', (req, res) => {
    const id  = req.params.id;
    res.json({
        message: `Get order with id: ${id}`
    })
})

router.delete('/:id', (req, res) => {
    const id  = req.params.id;
    res.json({
        message: `Delete order with id: ${id}`
    })
})

module.exports = router;