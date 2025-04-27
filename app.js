const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const ProductsRouter = require('./routes/products');
const orderRouter = require('./routes/order');
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/users', usersRoutes); 

app.use('/orders', orderRouter);
app.use('/products', ProductsRouter);

app.use((req, res) => {
    res.status(404).json({ error: { message: 'Not found' } });
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE, GET, POST');
        return res.status(200).json({});
    }
    next();
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
