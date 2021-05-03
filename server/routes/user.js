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



// Add item to shoppingcart
router.put('/shoppingCart2', async (req, res) => {
    if (!req.body._id) {
        return res.status(401).json('Log-in to add to shoppingcart')
    }

    const movieCount = req.body.count
    const movieID = req.body.movieID

    console.log("\n\n\nCount for movie:")
    console.log(movieCount)

    let movieExists = false
    //let movie = await Movie.findById(req.body.movieID);

    // Movie.findById(req.body.movieID)
    //     .then((data) => {
    //         movie = data
    //     })

    User.findById(req.body._id)
        .then(async (data) => {

            console.log("SHOPPING CART:")
            data.shoppingCart.forEach((item) => {
                console.log(item.title)
                console.log(item.count)
            })

            for (let obj of data.shoppingCart) {

                console.log("Evaluating movie:")
                console.log(obj.title)
                console.log(obj.count)

                if(obj._id == movieID) {
                    obj.count = movieCount

                    console.log("Count is updated:")
                    console.log(obj.title)
                    console.log(obj.count)

                    movieExists = true
                    
                    return data.save()
                    .then((data) => {
                        
                        console.log("SCANNING ITEMS:")
                        data.shoppingCart.forEach((item) => {
                            console.log(item.title)
                            console.log(item.count)
                        })

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
                }
            }

            if(!movieExists) {
                let movie = await Movie.findById(movieID);
                movie = movie.toJSON();
                movie.count = movieCount
                console.log("Movie is added")
                console.log(movie.title)
            
                console.log(movie.count)
                data.shoppingCart.push(movie)
                        
            }

                data.save()
                    .then((data) => {
                        
                        console.log("SCANNING ITEMS:")
                        data.shoppingCart.forEach((item) => {
                            console.log(item.title)
                            console.log(item.count)
                        })

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
