const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const Movie = require('./models/Movie');
const User = require('./models/User')
mongoose.connect('mongodb://localhost:27017/WebShop', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const webShop = require('./routes/webShop')
const user = require('./routes/user')

mongoose.set('useFindAndModify', false);

db.once('open', () => {
  console.log('DB connected')
})

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware for cors policy
app.use(cors())


app.use('/webShop', webShop)
app.use('/user', user)

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });