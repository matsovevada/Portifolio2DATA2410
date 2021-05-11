const express = require('express');
const { db } = require('../models/User');
const User = require('../models/User')
const Movie = require('../models/Movie')
const middleware = require('../middleware');

const router = express.Router()

// Google OAuth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

// login 
router.post('/login', (req, res) => {

    let token = req.body.token;

    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    return userid

    }

    verify()
    .then((userid) => {
       
        // check if user is in database
        User.findById(userid)
            .then(data => {

                // user is in db
                if (data) {
                    res.cookie('session-token', token, { maxAge: 24 * 60 * 60 * 1000  }) // 24 hours
                    res.status(200).json({'userInDb': true})
                }

                // user not in db
                else {
                    res.cookie('session-token', token, { maxAge: 24 * 60 * 60 * 1000 }) // 24 hours
                    res.status(200).json({'userInDb': false})
                }

            })    
    })
    .catch(console.error);
})

router.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.send('success')
})

// Create user 
router.post('/', middleware.checkAuthentification, (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    const user = new User({
        _id: req.user.userId, // get user id from authentification middleware
        email: req.user.email,
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
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "Error while creating user"
        })
    );
})

// Get user
router.get('/', middleware.checkAuthentification, (req, res) => {
 
    if (!req.user) {
        return res.status(400).json(null)
    }

    let id = req.user.userId // get user id from authentification middleware

    User.findById(id)
        .then((data) => {
            res.status(200).json(data)
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "User not found"
        })
    );
})

// get users
router.get('s', (req, res) => {

    User.find()
            .then((data) => {
                res.status(200).json(data)
            }) .catch(err => res.status(400).json({
                'Status' : 400,
                'Message' : "User not found"
            })
        );
})

// Alter userdata for given _id
router.put('/', middleware.checkAuthentification, (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    User.findById(req.user.userId)
        .then((data) => {
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
router.delete('/id', middleware.checkAuthentification, (req, res) => {
    
    if (!req.user) {
        return res.status(400).json(null)
    }

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
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "Error while deleting all users"
        }))
    }
)

// Get orderhistory
router.get('/orders', middleware.checkAuthentification, (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    User.findById(req.body._id)
        .then((data) => {
            res.status(200).json(data.orderHistory)
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "Error while fetching orders"
        })
    );    
}) 

// Add order to orderhistory
router.put('/checkout', middleware.checkAuthentification, (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }
 
    User.findById(req.user.userId)
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
router.put('/shoppingCart', middleware.checkAuthentification, async (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    const movieCount = req.body.count
    const movieID = req.body.movieID
    const userID = req.user.userId;

    let user = await User.findById(userID);

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
router.put('/shoppingCart/remove', middleware.checkAuthentification, async (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    const movieCount = req.body.count
    const movieID = req.body.movieID
    const userID = req.user.userId

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

        if (!req.user) {
            return res.status(400).json(null)
        }

        User.findById(req.user.userId)
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
