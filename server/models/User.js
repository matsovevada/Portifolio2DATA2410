const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    address: String,
    zipcode: String,
    city: String,
    orderHistory: {type : [Object], default : [] },
    shoppingCart: {type : [Object], default : [] }

});

module.exports = mongoose.model('User', UserSchema)


