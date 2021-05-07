const googleAuth = require('./googleOAuth');

function middlewareTest(req, res, next) {
    console.log('TEST')
    next()
}

function checkAuthentification() {
    googleAuth()
}

module.exports = {
    middlewareTest,
    checkAuthentification
};