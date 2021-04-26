const express = require('express')
const Movie = require('../models/Movie')

// Image up/down-loading
const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Multer (image-uploading)
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../imageUploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// Add a new movie
router.post('/movie', upload.single('image'), (req, res) => {
    
    const movie = new Movie({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        price: req.body.price,
        img: {
            data: fs.readFileSync(path.join(__dirname + "../imageUploads/" + req.file.filename)),
            contentType: 'image/png'
        },
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

// Update a movie
router.put('/movie', upload.single('image'), (req, res) => {

    Movie.findById(req.body._id)
        .then(data => {
      
            data.title = req.body.title;
            data.shortDescription = req.body.shortDescription;
            data.longDescription = req.body.longDescription;
            data.price = req.body.price;
            data.img = {
                data: fs.readFileSync(path.join(__dirname + "../imageUploads/" + req.file.filename)),
                contentType: 'image/png'
            },
            data.genre = req.body.genre;
    
            data.save()
                .then(data => {
                    res.status(200).json(data)
                })
                .catch((err) => {
                    res.status(400).json({
                        "Status": 400,
                        "Message": "Couldn't update movie"
                    })
                })
        })
})



module.exports = router; 