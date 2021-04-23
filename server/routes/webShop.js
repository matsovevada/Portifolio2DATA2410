const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router();

router.get('/movies', (req, res) => {

    // get all movies matching search param
    if (req.body.title) {
        Movie.find({title: req.body.title})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({
                "Status": 404,
                "Message": "Couldn't find movies"
            })
        });
    }

    // get all movies by genre
    else if (req.body.genre) {
        Movie.find({genre: req.body.genre})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({
                "Status": 404,
                "Message": "Couldn't find movies"
            })
        });
    }

    // get all movies
    else {
        Movie.find()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(404).json({
                "Status": 404,
                "Message": "Couldn't find movies"
            })
        });
    }
})

module.exports = router;