const express = require('express');
const User = require('../models/User')
const Movie = require('../models/Movie')
const middleware = require('../middleware');
const promClient = require('prom-client');

const router = express.Router()

// Google OAuth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

// backend-validation of inforamtion sent from frontend
function isInformationValid(firstname, lastname, address, zipcode, city) {

    if ( firstname.length < 2
        || lastname.length < 2
        || address.length < 6
        || zipcode.length < 4
        || city.length < 2 ) {
            return false;
        }
    else return true;
}

// Histogram and counter for login in as a user
const counterLoginUser = new promClient.Counter({
    name: 'login_user_operations_total',
    help: 'Total number of processed requests for login in a user'
})

const histogramLoginUser = new promClient.Histogram({
    name: 'login_user_duration_seconds',
    help: 'Histogram for the duration in seconds for login in a user',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})


// Histogram and counter for creating a user

const counterCreateUser = new promClient.Counter({
    name: 'create_user_operations_total',
    help: 'Total number of processed requests for creating a user'
})

const histogramCreateUser = new promClient.Histogram({
    name: 'create_user_duration_seconds',
    help: 'Histogram for the duration in seconds for creating a user',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for getting a user

const counterGetUser = new promClient.Counter({
    name: 'get_user_operations_total',
    help: 'Total number of processed requests for getting a user'
})

const histogramGetUser = new promClient.Histogram({
    name: 'get_user_duration_seconds',
    help: 'Histogram for the duration in seconds for getting a user',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for editing a user

const counterEditUser = new promClient.Counter({
    name: 'edit_user_operations_total',
    help: 'Total number of processed requests for editing a user'
})

const histogramEditUser = new promClient.Histogram({
    name: 'edit_user_duration_seconds',
    help: 'Histogram for the duration in seconds for editing a user',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for delete user based on given _id

const counterDelUser = new promClient.Counter({
    name: 'del_exact_user_operations_total',
    help: 'Total number of processed requests for deleting a user with given _id'
})

const histogramDelUser = new promClient.Histogram({
    name: 'del_exact_user_duration_seconds',
    help: 'Histogram for the duration in seconds for deleting a user with given _id',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for getting orderhistory

const counterGetOrderhistory = new promClient.Counter({
    name: 'get_orderhistory_operations_total',
    help: 'Total number of processed requests for getting an orderhistory'
})

const histogramGetOrderhistory = new promClient.Histogram({
    name: 'get_orderhistory_duration_seconds',
    help: 'Histogram for the duration in seconds for getting an orderhistory',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for adding an order to orderhistory

const counterAddOrderhistory = new promClient.Counter({
    name: 'add_orderhistory_operations_total',
    help: 'Total number of processed requests for adding an order to orderhistory'
})

const histogramAddOrderhistory = new promClient.Histogram({
    name: 'add_orderhistory_duration_seconds',
    help: 'Histogram for the duration in seconds for adding an order to orderhistory',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for add item to shoppingcart
const counterShoppingCartAddItem = new promClient.Counter({
    name: 'shopping_cart_add_item_operations_total',
    help: 'Total number of processed requests for shopping_cart_add_item'
})

const histogramShoppingCartAdditem = new promClient.Histogram({
    name: 'shopping_cart_add_item_duration_seconds',
    help: 'Histogram for the duration in seconds for shopping_cart_add_item',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for Remove or decrease count for item in shoppingcart
const counterShoppingCartDecreaseCount = new promClient.Counter({
    name: 'shopping_cart_decrease_count_operations_total',
    help: 'Total number of processed requests for shopping_cart_decrease_count'
})

const histogramShoppingCartDecreaseCount = new promClient.Histogram({
    name: 'shopping_cart_decrease_count_duration_seconds',
    help: 'Histogram for the duration in seconds for shopping_cart_decrease_count',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Histogram and counter for emptyShoppingCart
const counterEmptyShoppingCart = new promClient.Counter({
    name: 'empty_shopping_cart_operations_total',
    help: 'Total number of processed requests for empty_shopping_cart'
})

const histogramEmptyShoppingCart = new promClient.Histogram({
    name: 'empty_shopping_cart_duration_seconds',
    help: 'Histogram for the duration in seconds for getting movies',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})


// Metrics endpoint
router.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType)
    res.end(client.register.metrics())
})


// login 
router.post('/login', (req, res) => {

    let start = new Date()

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
                    let end = new Date() - start
                    histogramLoginUser.observe(end / 1000)
                    counterLoginUser.inc()
                    res.cookie('session-token', token, { maxAge: 24 * 60 * 60 * 1000  }) // 24 hours
                    res.status(200).json({'userInDb': true})
                }

                // user not in db
                else {
                    let end = new Date() - start
                    histogramLoginUser.observe(end / 1000)
                    counterLoginUser.inc()
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

    let start = new Date()

    if (!req.user) {
        return res.status(400).json(null)
    }

    if (!isInformationValid(req.body.firstname, req.body.lastname, req.body.address, req.body.zipcode, req.body.city)) {
        return res.status(400).json({
            'Status' : 400,
            'Message' : "Error while creating user"
        })
    }

    const user = new User({
        _id: req.user.userId, // get user id from authentification middleware
        email: req.user.email, // get email from authentification middleware
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        zipcode : req.body.zipcode,
        city : req.body.city
    });

    user.save()
        .then((data) => {
            let end = new Date() - start
            histogramCreateUser.observe(end / 1000)
            counterCreateUser.inc()
            res.status(200).json(data)
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "Error while creating user"
        })
    );
})

// Get user
router.get('/', middleware.checkAuthentification, (req, res) => {

    let start = new Date()
 
    if (!req.user) {
        return res.status(400).json(null)
    }

    let id = req.user.userId // get user id from authentification middleware

    User.findById(id)
        .then((data) => {
            let end = new Date() - start
            histogramGetUser.observe(end / 1000)
            counterGetUser.inc()
            res.status(200).json(data)
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "User not found"
        })
    );
})

// Alter userdata for given _id
router.put('/', middleware.checkAuthentification, (req, res) => {

    let start = new Date()

    if (!req.user) {
        return res.status(400).json(null)
    }

    if (!isInformationValid(req.body.firstname, req.body.lastname, req.body.address, req.body.zipcode, req.body.city)) {
        return res.status(400).json({
            'Status' : 400,
            'Message' : "Error while updating user"
        })
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
                        let end = new Date() - start
                        histogramEditUser.observe(end / 1000)
                        counterEditUser.inc()
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

// Delete user for given _id. Clear cookies from browser when the user is deleted. 
router.delete('/:id', middleware.checkAuthentification, (req, res) => {

    let start = new Date()
    
    if (!req.user) {
        return res.status(400).json(null)
    }

    User.findById(req.params.id)
        .then((data) => {
            User.deleteOne(data)
                .then((data) => {
                    let end = new Date() - start
                    histogramDelUser.observe(end / 1000)
                    counterDelUser.inc()
                    res.clearCookie('session-token');
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

// Get orderhistory
router.get('/orders', middleware.checkAuthentification, (req, res) => {

    let start = new Date()

    if (!req.user) {
        return res.status(400).json(null)
    }

    User.findById(req.body._id)
        .then((data) => {
            let end = new Date() - start
            histogramGetOrderhistory.observe(end / 1000)
            counterGetOrderhistory.inc()
            res.status(200).json(data.orderHistory)
        }) .catch(err => res.status(400).json({
            'Status' : 400,
            'Message' : "Error while fetching orders"
        })
    );    
}) 

// Add order to orderhistory
router.put('/checkout', middleware.checkAuthentification, (req, res) => {

    let start = new Date()

    if (!req.user) {
        return res.status(400).json(null)
    }
 
    User.findById(req.user.userId)
        .then((data) => {

            // create timestamp
            let timestamp = new Date().toString()
            timestamp = timestamp.split(" ")
            timestamp = `${timestamp[2]} ${timestamp[1]} ${timestamp[3]} ${timestamp[4]}`
            if(data.shoppingCart.length === 0) return res.status(405).json("Shoppingcart is empty - cannot proceed to checkout")  

            let orderHistoryObject = {
                "movies": data.shoppingCart,
                "timestamp": timestamp
            }

            data.orderHistory.push(orderHistoryObject)
            data.shoppingCart = [];
            data.save()
                .then((data) => {
                    let end = new Date() - start
                    histogramAddOrderhistory.observe(end / 1000)
                    counterAddOrderhistory.inc()
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


// Add item to shoppingcart. Qty of each item in the shopping cart is stored backend. 
router.put('/shoppingCart', middleware.checkAuthentification, async (req, res) => {

    let start = new Date()

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

                    let end = new Date() - start
                    histogramShoppingCartAdditem.observe(end / 1000)
                    counterShoppingCartAddItem.inc()

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

    let start = new Date()

    if (!req.user) {
        return res.status(400).json(null)
    }

    const movieCount = req.body.count
    const movieID = req.body.movieID
    const userID = req.user.userId

    let user = await User.findById(userID);

    let movie = await Movie.findById(movieID);
    movie = movie.toJSON();

    //Iterate over all objects in users shoppingcart, decrease count if there are more then 1. Remove if only 1 left
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

                    let end = new Date() - start
                    histogramShoppingCartDecreaseCount.observe(end / 1000)
                    counterShoppingCartDecreaseCount.inc()

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
router.put('/shoppingCart/delete', (req, res) => {

    let start = new Date()

    if (!req.user) {
        return res.status(400).json(null)
    }

    User.findById(req.user.userId)
        .then((data) => {
            data.shoppingCart = []
            data.save()

            let end = new Date() - start
            histogramEmptyShoppingCart.observe(end / 1000)
            counterEmptyShoppingCart.inc()

            res.status(200).json(data)
        })       
            
        .catch(err => { 
            res.status(400).json({
            'Status' : 400,
            'Message' : "Error while deleting shoppingcart"
        })
    })
})



module.exports = router;