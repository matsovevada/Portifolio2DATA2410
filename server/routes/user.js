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
    console.log(userid)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    }
    verify()
        .then(() => {
            console.log('setting cookie')
            res.cookie('session-token', token, { maxAge: 90000 })
            console.log('cookie set')
            res.send('success')
        })
        .catch(console.error);
})

router.get('/logout', (req, res) => {
    // res.clearCookie('session-token');
   
})

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

    console.log('token:')
    console.log(req.cookies['session-token'])

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
