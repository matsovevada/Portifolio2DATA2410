const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: String,
    email: String,
    firstname: String,
    lastname: String,
    address: String,
    zipcode: String,
    city: String,
    orderHistory: {type : [Object], default : [] },
    shoppingCart: {type : [Object], default : [] },
    isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema)


