const { oAuth2Client, OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)

function middlewareTest(req, res, next) {
    console.log('TEST')
    next()
}

function checkAuthentification(req, res, next) {

    let token = req.cookies['session-token']

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    
        const { sub, email, name, picture } = payload;
        const userId = sub;
        let user = {};
        user.userId = userid 
        user.email = email; 
        user.name = name;
        return user;
        }
        verify()
            .then((user) => {
                req.user = user;
                next();
            })
            .catch(err => {
                req.user = null;
                next();
            })

}

module.exports = {
    middlewareTest,
    checkAuthentification
};