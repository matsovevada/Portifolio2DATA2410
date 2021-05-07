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

            // create timestamp
            let timestamp = new Date().toString()
            timestamp = timestamp.split(" ")
            timestamp = `${timestamp[2]} ${timestamp[1]} ${timestamp[3]} ${timestamp[4]}`

            let orderHistoryObject = {
                "movies": data.shoppingCart,
                "timestamp": timestamp
            }

            data.orderHistory.push(orderHistoryObject)
            data.shoppingCart = [];
            data.save()
                .then((data) => {
                    res.status(200).json(data)
            }) 
            .catch(err => {
                res.status(400).json({
                'Status' : 400,
                'Message' : "Error while updating orders" 
            })
        })
    })
})


// Add item to shoppingcart
router.put('/shoppingCart', async (req, res) => {
    if (!req.body._id) {
        return res.status(401).json('Log-in to add to shoppingcart')
    }

    const movieCount = req.body.count
    const movieID = req.body.movieID
    const userID = req.body._id;

    let user = await User.findById(userID);
    // console.log(user.shoppingCart)

    let movie = await Movie.findById(movieID);
    movie = movie.toJSON();

    for (movieInCart of user.shoppingCart) {

        if (movieInCart._id == movieID) {
            movieInCart.count = movieCount;

            return User.findByIdAndUpdate(userID, user)
                .then(data => {
                    res.status(200).json(user.shoppingCart)
                })
                .catch(err => console.log(err))
        }
    }

    movie.count = movieCount;
    user.shoppingCart.push(movie)
  
    return user.save()
        .then(data => {
            res.status(200).json(data.shoppingCart)
        })
})

//Remove or decrease count for item in shoppingcart
router.put('/shoppingCart/remove', async (req, res) => {
    if (!req.body._id) {
        return res.status(401).json('Log-in to add to shoppingcart')
    }

    const movieCount = req.body.count
    const movieID = req.body.movieID
    const userID = req.body._id;

    let user = await User.findById(userID);
    // console.log(user.shoppingCart)

    let movie = await Movie.findById(movieID);
    movie = movie.toJSON();

    for (movieInCart of user.shoppingCart) {
        let index = user.shoppingCart.indexOf(movieInCart)
        if (movieInCart._id == movieID) {
            if(movieInCart.count == 1 && index > -1) {
                user.shoppingCart.splice(index, 1)
            }
            else {
            movieInCart.count = movieInCart.count-1;
            }

            return User.findByIdAndUpdate(userID, user)
                .then(data => {
                    res.status(200).json(user.shoppingCart)
                })
                .catch(err => console.log(err))
        }
    }
  
    return user.save()
        .then(data => {
            res.status(200).json(data.shoppingCart)
        })
})

    

// Update field shoppingcart to empty array
//function deleteShoppingCart() {
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
//}


module.exports = router;
