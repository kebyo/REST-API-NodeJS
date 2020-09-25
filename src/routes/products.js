const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');

    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + ' - ' + file.originalname);
    },
});

const upload = multer({ storage });

const Product = require('../models/product');

router.get('/', async (req, res) => {
    const products = (await Product.find()).map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        url: 'http://localhost:3000/products/' + product._id,
    }));

    res.json({
        products,
    })
});

router.post('/', upload.single('productImage'), async (req, res) => {
    console.log(req.file);

    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
        })
        await product.save();
        res.json({
            message: 'New product added!',
            AddedProduct: {
                id: product._id,
                name: product.name,
                price: product.price,
                url: 'http://localhost:3000/products/' + product._id,
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
    const product = await Product.findById(id);
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

    await Product.update({ _id: id }, { $set: upd });

    const updProduct = await Product.find({ _id: id });

    res.json({
        message: `Update product with id: ${id}`,
        updatedProduct: {
            id,
            name: updProduct[0].name,
            price: updProduct[0].price,
            url: 'http://localhost:3000/products/' + id,
        },
    })
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Product.remove({ _id: id });
    res.json({
        message: `Delete product with id: ${id}`
    })
})

module.exports = router;