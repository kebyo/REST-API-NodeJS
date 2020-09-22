const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const orders = (await Order.find().populate('productID')).map(order => ({ orderID: order._id, productID: order.productID, quantity: order.quantity }));
    res.json({
        orders,
    })
})

router.post('/', async (req, res) => {
    try {
        const order = new Order({
            quantity: req.body.quantity,
            productID: req.body.product,
        })
        await order.save();
        console.log(order);
        res.json({
            message: 'Add new order',
            order,
            url: "http://localhost:3000/orders/" + order._id,
        });
    } catch (err) {
        res.json({
            error: err.message,
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id).populate('productID');
        res.json({
            message: `Get order with id: ${id}`,
            order,
        })
    } catch(err){
        res.json({
            error: err,
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Order.remove({_id: id});
        res.json({
            message: `Delete order with id: ${id}`
        })   
    } catch (error) {
        res.json({
            ErrorMessage: error.message,
        })
    }
})

module.exports = router;