const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router();

// get all movies
router.get('/movies/', (req, res) => {
    Movie.find()
    .then((data) => {
        res.status(200).json(data.reverse())
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });    
})


// get all movies matching search param
router.get('/movies/:title', (req, res) => {
    Movie.find({title: {$regex : new RegExp(req.params.title, "i")}})
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });
})

// get all movies by genre
router.get('/movies/filterBy/:genre', (req, res) => {
    Movie.find({genre: req.params.genre})
    .then((data) => {
        res.status(200).json(data.reverse())
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });
})

module.exports = router;