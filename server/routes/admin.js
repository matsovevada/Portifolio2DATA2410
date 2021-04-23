const express = require('express')
const Movie = require('../models/Movie')

const router = express.Router();

// Add a new movie
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
        .catch(() => {
            res.status(400).json({
                "Status": 400,
                "Message": "Couldn't add movie"
            })
        })
})

// Delete a movie
router.delete('/movie/:id', (req, res) => {
    Movie.deleteOne({_id: req.params.id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({
                "Status": 400,
                "Message": "Couldn't delete movie"
            })
        })
})

// Edit a movie

module.exports = router; 