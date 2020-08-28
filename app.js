const express = require('express');
const app = express();

const productRouts = require('./src/routes/products');
const ordersRouts = require('./src/routes/orders');

app.use('/products', productRouts);
app.use('/orders', ordersRouts);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status);
    res.json({
        error: {
            message: error.message
        }
    })
}) 

module.exports = app;