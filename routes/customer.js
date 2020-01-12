const CustomerModel = require('../model/user.model');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/add', (req, res) => {
    let model = new CustomerModel.User(req.body);
    model.save().then((doc) => {
        res.send({ doc: doc });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.get('/email', (req, res) => {
    CustomerModel.User.findOne({
        email: req.query.email
    }).then((doc) => {
        res.send({ doc: doc });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.get('/customers', (req, res) => {
    CustomerModel.Customer.find({}).then((doc) => {
        res.send({ doc: doc });
    }).catch((err) => {
        res.status(500).json(err);
    });
})

module.exports = router;
