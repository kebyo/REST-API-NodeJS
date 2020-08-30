const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://oybek:' + process.env.MONGO_PASS + '@node-rest-api.dts1j.mongodb.net/'+ process.env.DB_NAME + '?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('DB is working');
});

app.use(bodyParser.urlencoded({
    extended: false,
}))
app.use(bodyParser.json());

const productRouts = require('./src/routes/products');
const ordersRouts = require('./src/routes/orders');

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Headres', '*');
    if (req.method === 'OPTIONS'){
        res.header('Acces-Control=Allow-Methods', 'GET, DELETE, PATCH, POST');
        return res.json({});
    }
    next();
})

app.use('/products', productRouts);
app.use('/orders', ordersRouts);

app.post('/test', (req, res) => {
    console.log(req.body);
    console.log(req.body.oybek);
    res.json({
        message: req.body
    })
});

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