const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Movie', MovieSchema)