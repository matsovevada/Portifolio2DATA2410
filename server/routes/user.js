const express = require('express')
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

// Get user
router.get('/', (req, res) => {
    User.find()
        .then((data) => {
            res.status(200).json(data)
        }) .catch(err => res.status(400)({
            'Status' : 400,
            'Message' : "User not found"
        })
    );
})

// Alter userdata 
router.put('/', (req, res) => {

    
}) 

// Get orderhistory
router.get('/', (req, res) => {

    
}) 

router.get('/', (req, res) => {
    
}) 

router.get('/', (req, res) => {
    
}) 
module.exports = router;
