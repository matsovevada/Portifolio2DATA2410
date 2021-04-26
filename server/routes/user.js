const express = require('express');
const { db } = require('../models/User');
const User = require('../models/User')


const router = express.Router()

// Create user 
router.post('/', (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        zipcode : req.body.zipcode,
        city : req.body.city,
        orderHistory: req.body.orderHistory
    });

    user.save()
        .then((data) => {
            res.status(200).json(data)
        }) .catch(err => res.status(400)({
            'Status' : 400,
            'Message' : "Error while creating user"
        })
    );
})

// Get user(s)
router.get('/', (req, res) => {
    if(req.body._id) {
        User.findById(req.body._id)
            .then((data) => {
                res.status(200).json(data)
            }) .catch(err => res.status(400)({
                'Status' : 400,
                'Message' : "User not found"
            })
        );
    } else {
        User.find()
            .then((data) => {
                res.status(200).json(data)
            }) .catch(err => res.status(400)({
                'Status' : 400,
                'Message' : "User not found"
            })
        );
    }
})

// Alter userdata for given _id
router.put('/', (req, res) => {

    User.findById(req.body._id)
        .then((data) => {
            data.email = req.body.email
            data.password = req.body.password
            data.firstname = req.body.firstname
            data.lastname = req.body.lastname
            data.address = req.body.address
            data.zipcode = req.body.zipcode
            data.city = req.body.city
                 
                data.save()
                    .then((data) => {
                        res.status(200).json(data)
                }) 
                
                .catch(err => { 
                res.status(400).json({
                'Status' : 400,
                'Message' : "Error while updating user"
                })
            })

            .catch(err => {
                res.status(400).json({
                'Status' : 400,
                'Message' : "Error while updating user" 
            })
        })
    })
})

// Delete user for given _id
router.delete('/', (req, res) => {
    if(req.body._id){
        User.findById(req.body._id)
            .then((data) => {
                User.deleteOne(data)
                    .then((data) => {
                        res.status(200).json(data)
                    }) 
                    
                .catch(err => { 
                    res.status(400).json({
                    'Status' : 400,
                    'Message' : "Error while deleting user"
                })
            })
        })
    }
    else{
        User.deleteMany({})
        .then((data) => {
            res.status(200).json(data)
        }) .catch(err => res.status(400)({
            'Status' : 400,
            'Message' : "Error while deleting all users"
        }))
    }
})

// Get orderhistory
router.get('/orders', (req, res) => {
    User.findById(req.body._id)
        .then((data) => {
            res.status(200).json(data.orderHistory)
        }) .catch(err => res.status(400)({
            'Status' : 400,
            'Message' : "Error while fetching orders"
        })
    );    
}) 

// Add order to orderhistory
router.put('/checkout', (req, res) => {
    const order = req.body.orderHistory

    User.findById(req.body._id)
        .then((data) => {
            data.orderHistory.push(order)
            data.save()
            
                    .then((data) => {
                        res.status(200).json(data)
                }) 
            
                .catch(err => { 
                    res.status(400).json({
                'Status' : 400,
                'Message' : "Error while saving order"
                })
            })
            .catch(err => {
                res.status(400).json({
                'Status' : 400,
                'Message' : "Error while updating orders" 
            })
        })
    })
})

module.exports = router;
