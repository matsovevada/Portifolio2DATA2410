const express = require('express')
const Movie = require('../models/Movie')
const User = require('../models/User')
const middleware = require('../middleware');

// Image up/down-loading
const fs = require('fs')
const path = require('path')
const multer = require('multer')

//Multer (image-uploading)
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,".","imageUploads"));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname)
    }
});
const upload = multer({ storage: storage });

const router = express.Router();

// backend-validation of inforamtion sent from frontend
function isInformationValid(title, shortDescription, longDescription, price, genre) {

    if ( title.length < 1
        || shortDescription.length < 1
        || longDescription.length < 1
        || isNaN(price) || price.length < 1 || price < 1
        || genre.length < 1 ) {
            return false;
        }
    else return true;
}

// Add a new movie
router.post('/movie', [upload.single('image'), middleware.checkAuthentification ], (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    if (!isInformationValid(req.body.title, req.body.shortDescription, req.body.longDescription, req.body.price, req.body.genre)) {
        return  res.status(400).json({
            "Status": 400,
            "Message": "Couldn't add movie"
        })
    }
                  
    User.findById(req.user.userId)
        .then(data => {

            if (!data.isAdmin) return res.status(401).json({"illegalRequest": true})

            else {

                let input_image = {}
    
                if(!req.file) input_image = null
                else {
                    input_image = {data: fs.readFileSync(path.join(__dirname + "/imageUploads/" + req.file.filename)), contentType: 'image/png'}
                }
                
                const movie = new Movie({
                    title: req.body.title,
                    shortDescription: req.body.shortDescription,
                    longDescription: req.body.longDescription,
                    price: req.body.price,
                    img: input_image,
                    genre: req.body.genre,
                }) 

                movie.save()
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch((err) => {
                        res.status(400).json({
                            "Status": 400,
                            "Message": "Couldn't add movie"
                        })
                    })
            }
        })
        .catch(err => console.log(err))
})

// Delete a movie
router.delete('/movie/:id', middleware.checkAuthentification, (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    User.findById(req.user.userId)
        .then(data => {
            if (!data.isAdmin) return res.status(401).json({"illegalRequest": true})

            else {
                Movie.deleteOne({_id: req.params.id})
                .then(data => {
                    res.status(200).json(data)
                })
                .catch((err)  =>  {
                    res.status(400).json({
                        "Status": 400,
                        "Message": "Couldn't delete movie"
                    })
                })
            }
        })
        .catch(err => console.log(err))
})

// Update a movie
router.put('/movie/:id', [upload.single('image'), middleware.checkAuthentification], (req, res) => {

    if (!req.user) {
        return res.status(400).json(null)
    }

    if (!isInformationValid(req.body.title, req.body.shortDescription, req.body.longDescription, req.body.price, req.body.genre)) {
        return  res.status(400).json({
            "Status": 400,
            "Message": "Couldn't add movie"
        })
    }

    User.findById(req.user.userId)
    .then(data => {
        if (!data.isAdmin) return res.status(401).json({"illegalRequest": true})

        else {
            Movie.findById({_id: req.params.id})
                .then(data => {
                    
                    data.title = req.body.title;
                    data.shortDescription = req.body.shortDescription;
                    data.longDescription = req.body.longDescription;
                    data.price = req.body.price;
                    //Only update image if a new image is provided 
                    if(req.file) {
                        data.img = {
                            data: fs.readFileSync(path.join(__dirname + "/imageUploads/" + req.file.filename)),
                            contentType: 'image/png'
                        };
                    }
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
        }

    })
    .catch(err => console.log(err))

    
})

module.exports = router; 