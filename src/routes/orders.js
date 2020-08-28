const express = require('express');
const { route } = require('./products');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Get orders'
    })
})

router.post('/', (req, res) => {
    res.json({
        message: 'Update orders'
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