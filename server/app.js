const express = require("express");
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
mongoose.connect('mongodb://localhost:27017/WebShop', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const webShop = require('./routes/webShop')
const user = require('./routes/user')

db.once('open', () => {
  console.log('DB connected')
})

const PORT = process.env.PORT || 8080;

const app = express();

app.use('/webShop', webShop)
app.use('/user', user)

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });