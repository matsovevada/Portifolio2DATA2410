const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    address: String,
    zipcode: String,
    city: String,
    orderHistory: {type : [Object], default : [] }

});

module.exports = mongoose.model('User', UserSchema)


