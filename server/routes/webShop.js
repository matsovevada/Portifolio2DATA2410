const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router();

router.post('/', (req, res) => {
    let title = 'Split'
    const movie = new Movie({title: title})
    movie.save()
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {

    Movie.find()
        .then((data) => {
            res.json(data)
        });
})

module.exports = router;