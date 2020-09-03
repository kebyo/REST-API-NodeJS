const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    const orders = (await Order.find()).map(order => ({ customerID: order.customerID, products: order.products }));
    res.json({
        orders,
    })
})

router.post('/', async (req, res) => {
    try {
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