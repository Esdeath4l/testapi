const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('./modules/orders');

router.get('/', (req, res, next) => {
  Order.find()
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quanitity: doc.quanitity,
            date: doc.date,
            status: doc.status,
            paymentMethod: doc.paymentMethod,
            shippingAddress: doc.shippingAddress,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/orders/' + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.post('/', (req, res, next) => {
  const od = new Order({
    _id: new mongoose.Types.ObjectId(),
    product: req.body.product,
    quanitity: req.body.quanitity,
    date: req.body.date,
    status: req.body.status,
    paymentMethod: req.body.paymentMethod,
    shippingAddress: req.body.shippingAddress
  });

  od.save()
    .then(result => {
      res.status(201).json({
        message: "Order created",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quanitity: result.quanitity,
          date: result.date,
          status: result.status,
          paymentMethod: result.paymentMethod,
          shippingAddress: result.shippingAddress,
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({
        order,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/orders'
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Order deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/orders',
          body: {
            product: 'productId',
            quanitity: 'Number',
            date: 'Date',
            status: 'String',
            paymentMethod: 'String',
            shippingAddress: 'String'
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
