const express = require('express');
const { db } = require('../models/User');
const User = require('../models/User')
const Movie = require('../models/Movie')


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
        city : req.body.city
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
router.get('/:id', (req, res) => {
 
    User.findById(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        }) .catch(err => res.status(400)({
            'Status' : 400,
            'Message' : "User not found"
        })
    );
})

// get users
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
router.delete('/id', (req, res) => {
    
    User.findById(req.params.id)
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
})

// Delete all users 
router.delete('/', (req, res) => {

    User.deleteMany({})
        .then((data) => {
            res.status(200).json(data)
        }) .catch(err => res.status(400)({
            'Status' : 400,
            'Message' : "Error while deleting all users"
        }))
    }
)

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
  
    User.findById(req.body._id)
        .then((data) => {
            data.orderHistory.push(data.shoppingCart)
            data.save()
            deleteShoppingCart()

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

// Get shoppingcart
router.get('/shoppingCart', (req, res) => {

    if (!req.body._id) {
        return res.status(401).json('Log-in to get shoppingcart')
    }

    User.findById(req.body._id)
        .then((data) => {
            res.status(200).json(data.shoppingCart)
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "Error while fetching orders"
        })
    );    
}) 

// Add item to shoppingcart
router.put('/shoppingCart', async (req, res) => {
    if (!req.body._id) {
        return res.status(401).json('Log-in to add to shoppingcart')
    }

    const movieID = req.body.movieID
    let movie = await Movie.findById(req.body.movieID);

    // Movie.findById(req.body.movieID)
    //     .then((data) => {
    //         movie = data
    //     })

    User.findById(req.body._id)
        .then((data) => {
            data.shoppingCart.push(movie)
            data.save()

                .then((data) => {
                    res.status(200).json(data.shoppingCart)
            }) 

                        .catch(err => { 
                            console.log(err)
                            res.status(400).json({
                        'Status' : 400,
                        'Message' : "Error while saving shoppingcart"
                        
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json({
                        'Status' : 400,
                        'Message' : "Error while updating shoppingcart" 
                    })
                })
            })
        })
    

// Update field shoppingcart to empty array
function deleteShoppingCart() {
    router.put('/shoppingCart/delete', (req, res) => {

        if (!req.body._id) {
            return res.status(401).json('Log-in to add to shoppingcart')
        }

        User.findById(req.body._id)
            .then((data) => {
                data.shoppingCart = []
                data.save()
                res.status(200).json(data)
            })       
                
            .catch(err => { 
                res.status(400).json({
                'Status' : 400,
                'Message' : "Error while deleting shoppingcart"
            })
        })
    })
}


module.exports = router;
