const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    shortDescription: String,
    longDescription: Object,
    price: Number,
    genre: String,
    creationDate: Date.now,
    pictureLinks: [String]
});

module.exports = mongoose.model('Movie', MovieSchema)