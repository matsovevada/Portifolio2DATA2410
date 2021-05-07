const { oAuth2Client, OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com')

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com'
  });
  
  const payload = ticket.getPayload();

  console.log(`User ${payload.name} verified`);

  const { sub, email, name, picture } = payload;
  const userId = sub;
  return { userId, email, fullname: name, photoUrl: picture}
}

module.exports = googleAuth;