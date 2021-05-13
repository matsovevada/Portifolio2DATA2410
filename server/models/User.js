const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    address: {type: String, required: true},
    zipcode: {type: String, required: true},
    city: {type: String, required: true},
    orderHistory: { type : [Object], default : [] },
    shoppingCart: { type : [Object], default : [] },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema)


