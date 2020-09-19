const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const orders = (await Order.find()).map(order => ({ orderID: order.id, productID: order.productID, quantity: order.quantity }));
    res.json({
        orders,
    })
})

router.post('/', async (req, res) => {
    try {
        const order = new Order({
            id: (await Order.find()).length + 1,
            quantity: req.body.quantity,
            productID: req.body.product,
        })
        await order.save();
        console.log(order);
        res.json({
            message: 'Add new order',
            order,
        });
    } catch (err) {
        res.json({
            error: err.message,
        })
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `Get order with id: ${id}`
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `Delete order with id: ${id}`
    })
})

module.exports = router;