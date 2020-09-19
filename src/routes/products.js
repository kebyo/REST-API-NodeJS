const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const products = (await Product.find()).map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        url: "http://localhost:3000/products/" + product.id,
    }));

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
            message: "New product added!",
            AddedProduct: {
                id: product.id,
                name: product.name,
                price: product.price,
                url: "http://localhost:3000/products/" + product.id,
            }
        })
    } catch (err) {
        res.json({
            error: err.message,
        })
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.find({ id });
    res.json({
        message: `Get product with id: ${id}`,
        product,
    })
})

router.patch('/:id', async (req, res) => {
    const upd = {};
    const id = req.params.id;

    for (const key in req.body) {
        upd[key] = req.body[key];
    }

    await Product.update({ id }, { $set: upd });

    const updProduct = await Product.find({ id });

    res.json({
        message: `Update product with id: ${id}`,
        updatedProduct: {
            id,
            name: updProduct[0].name,
            price: updProduct[0].price,
            url: "http://localhost:3000/products/" + id,
        },
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Product.remove({ id });
    res.json({
        message: `Delete product with id: ${id}`
    })
})

module.exports = router;