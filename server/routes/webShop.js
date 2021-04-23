const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router();

router.get('/movies', (req, res) => {

    console.log(req.body.title)
    console.log(req.body.genre)

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

// Get all movies by genre
router.get('/', (req, res) => {

    Movie.find()
        .then((data) => {
            res.json(data)
        });
})

router.post('/movie', (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        price: req.body.price,
        genre: req.body.genre,
    }) 

    movie.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                "Status": 400,
                "Message": "Couldn't add movie"
            })
        })
})

module.exports = router;