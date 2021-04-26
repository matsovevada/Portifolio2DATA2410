const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    shortDescription: String,
    longDescription: Object,
    price: Number,
    genre: String,
    img: {
        data: Buffer,
        contentType: String
    },
    creationDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Movie', MovieSchema)