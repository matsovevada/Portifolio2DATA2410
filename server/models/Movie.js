const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    longDescription: {type: String, required: true},
    price: {type: Number, required: true},
    genre: {type: String, required: true},
    img: {
        data: Buffer,
        contentType: String
    },
    creationDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Movie', MovieSchema)