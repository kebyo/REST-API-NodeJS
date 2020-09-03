const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const products = (await Product.find()).map(product => ({id: product.id, name: product.name, price: product.price}));
    console.log(products);
    res.json({
        products,
    })
});

router.post('/', async (req, res) => {
    try { 
        const product = new Product({
            id: (await Product.find()).length + 1,
            name: req.body.name,
            price: req.body.price,
        })
        await product.save();
        res.json({
            message: "It works",
        })
    } catch (err) {
        res.json({
            error: err.message,
        })
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.find({id});
    res.json({
        message: `Get product with id: ${id}`,
        product,
    })
})

router.patch('/:id', async (req, res) => {
    const upd = {};
    for (const item of req.body){
        upd[item.propName] = item.value;
    }
    await Product.update({id: upd.id}, {upd});
    res.json({
        message: `Update product with id: ${id}`, 
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Product.remove({id});
    res.json({
        message: `Delete product with id: ${id}`
    })
})

module.exports = router;