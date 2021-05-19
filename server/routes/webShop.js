const express = require('express')
const Movie = require('../models/Movie')
const client = require('prom-client');

const router = express.Router();

// Prometheus monitoring
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 }) // collect every 5th second

// Get all movies
const counterGetMovies = new client.Counter({
    name: 'get_movies_operations_total',
    help: 'Total number of processed requests for getting movies'
})

const histogramGetMovies = new client.Histogram({
    name: 'get_movies_duration_seconds',
    help: 'Histogram for the duration in seconds for getting movies',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// Get all movies matching search param
const counterSearchMovies = new client.Counter({
    name: 'search_movies_operations_total',
    help: 'Total number of processed requests for searching movies'
})

const histogramSearchMovies = new client.Histogram({
    name: 'search_movies_duration_seconds',
    help: 'Histogram for the duration in seconds for searching movies',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// get all movies by genre
const counterSearchMovies = new client.Counter({
    name: 'search_movies_operations_total',
    help: 'Total number of processed requests for searching movies'
})

const histogramSearchMovies = new client.Histogram({
    name: 'search_movies_duration_seconds',
    help: 'Histogram for the duration in seconds for searching movies',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// get all movies sorted by price ascending
const counterSortMoviesAscending = new client.Counter({
    name: 'sort_movies_ascending_operations_total',
    help: 'Total number of processed requests for searching movies'
})

const histogramSortMoviesAscending = new client.Histogram({
    name: 'search_movies_duration_seconds',
    help: 'Histogram for the duration in seconds for searching movies',
    buckets: [1, 2, 5, 6, 10] // Prometheus will observe the time an operation takes and put it in one of these buckets
})

// get all movies sorted by price descending

// get all movies sorted by title alphabetical ascending

// get all movies sorted by title alphabetical ascending


// Metrics endpoint
router.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType)
    res.end(client.register.metrics())
})

// get all movies
router.get('/movies/', (req, res) => {

    let start = new Date()

    Movie.find()
    .then((data) => {

        let end = new Date() - start
        histogramGetMovies.observe(end / 1000)
        counterGetMovies.inc()

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

    let start = new Date()

    Movie.find({title: {$regex : new RegExp(req.params.title, "i")}})
    .then((data) => {

        let end = new Date() - start
        histogramSearchMovies.observe(end / 1000)
        counterSearchMovies.inc()

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

// get all movies sorted by price ascending
router.get('/movies/sort/price_asc', (req, res) => {
    Movie.find()
    .then((data) => {
        data_sorted = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        res.status(200).json(data_sorted)
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });    
})

// get all movies sorted by price descending
router.get('/movies/sort/price_desc', (req, res) => {
    Movie.find()
    .then((data) => {
        data_sorted = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        res.status(200).json(data_sorted)
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });    
})

// get all movies sorted by title alphabetical ascending
router.get('/movies/sort/title_asc', (req, res) => {
    Movie.find()
    .then((data) => {
        data_sorted = data.sort((a, b) => a.title.normalize().localeCompare(b.title.normalize()))
        res.status(200).json(data_sorted)
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });    
})


// get all movies sorted by title alphabetical ascending
router.get('/movies/sort/title_desc', (req, res) => {
    Movie.find()
    .then((data) => {
        data_sorted = data.sort((a, b) => b.title.normalize().localeCompare(a.title.normalize()))
        res.status(200).json(data_sorted)
    })
    .catch((err) => {
        res.status(404).json({
            "Status": 404,
            "Message": "Couldn't find movies"
        })
    });    
})

module.exports = router;