const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router();

// Get all movies
router.get('/', (req, res) => {
    Movie.find()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                "Status": 400,
                "Message": "Couldn't find movies"
            })
        });
})

// Get all movies containing given search param
router.get('/:title', (req, res) => {
    Movie.find({title: req.params.title})
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

// Get all movies by genre
router.get('/', (req, res) => {

    Movie.find()
        .then((data) => {
            res.json(data)
        });
})

module.exports = router;