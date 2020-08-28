    const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Get products'
    })
});

router.post('/', (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
    };

    res.json({
        message: 'Add new product',
        addedProduct: newProduct,
    });
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