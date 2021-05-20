const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const https = require('https')
const client = require('prom-client');

// database
const path = require('path')
mongoose.connect('mongodb://mongo:27017/WebShop', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

mongoose.set('useFindAndModify', false);

db.once('open', () => {
  console.log('DB connected')
})

const PORT = process.env.PORT || 8080;

const app = express();

// middleware
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:true, credentials: true}));

// routes
const webShop = require('./routes/webShop')
const user = require('./routes/user')
const admin = require('./routes/admin');

app.use('/webShop', webShop)
app.use('/user', user)
app.use('/admin', admin)

const httpsOptions = {
  key: fs.readFileSync('./TLS/cert.key'),
  cert: fs.readFileSync('./TLS/cert.pem')
}
  

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log('Server running at ' + PORT)
})

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ timeout: 5000 }) // collect every 5th second