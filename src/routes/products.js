const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const products = (await Product.find()).map(product => ({name: product.name, price: product.price}));
    console.log(products);
    res.json({
        products,
    })
});

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    })
    const result = await product.save();
    res.json({
        message: "It works",
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `Get product with id: ${id}`
    })
})

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `Update product with id: ${id}`
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        message: `Delete product with id: ${id}`
    })
})

module.exports = router;