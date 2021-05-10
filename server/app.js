const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')

const https = require('https')
const fs = require('fs')

//const options = {
//  key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
//  cert: fs.readFileSync("/srv/www/keys/chain.pem")
// };

const path = require('path')
const Movie = require('./models/Movie');
const User = require('./models/User')
mongoose.connect('mongodb://localhost:27017/WebShop', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

const webShop = require('./routes/webShop')
const user = require('./routes/user')
const admin = require('./routes/admin')

mongoose.set('useFindAndModify', false);

db.once('open', () => {
  console.log('DB connected')
})

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware
// app.use(cors())
app.use(cors({origin:true, credentials: true}));


app.use('/webShop', webShop)
app.use('/user', user)
app.use('/admin', admin)

app.use('/user', function(res, req, next) {
  console.log('user')
  next()
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'))
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

//https.createServer(options, app).listen(8000);

