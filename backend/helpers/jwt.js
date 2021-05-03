//secure the API's in our server using express-jwt 
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    return expressJwt({
        secret,
        algorithms: ['HS256'] // select algorithms used to generating this token . there is many algorithms in the website jwt.io
    })
}

module.exports = authJwt; // export authJwt to be used in our app

/*
The secret is based on some string where we can create our token.

So when someone pass any token to our, for example, back end, we need to compare it with the secret.

So if the token is generated based on that secret, then he will have access to the API.

But when he's talking based on different secret, then the API will not work.
*/