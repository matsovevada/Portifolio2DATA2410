const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    address: String,
    orderHistory: {type : String, "default" : [] }

});

module.exports = mongoose.model('User', UserSchema)


