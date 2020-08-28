const express = require('express');
const { route } = require('./products');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Get orders'
    })
})

router.post('/', (req, res) => {
    const newOrder = {
        productID: req.body.productID,
        quantity: req.body.quantity,
    }
    res.json({
        message: 'Add new order', 
        order: newOrder,
    })
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