//secure the API's in our server using express-jwt 
const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'] // select algorithms used to generating this token . there is many algorithms in the website jwt.io
    }).unless({ // this is to execlude some 'API's from being authenticated
        path: [ // add all url to be execluded from authentication
            //{url:`${api}/products` , method:['GET' , 'OPTIONS']}, // make all GET requests excluded from being authenticated, so now all GET products Api's will not need token to be returned
            { url: /\/api\/v1\/products(.*)/, method: ['GET', 'OPTIONS'] }, // regular expression to specify every thing after the products instead of writing each url individually 
            { url: /\/api\/v1\/categories(.*)/, method: ['GET', 'OPTIONS'] },
            `${api}/users/login`, // /api/v1/users/login
            `${api}/users/register`
        ]
    })
}

module.exports = authJwt; // export authJwt to be used in our app

/*
The secret is based on some string where we can create our token.

So when someone pass any token to our, for example, back end, we need to compare it with the secret.

So if the token is generated based on that secret, then he will have access to the API.

But when he's talking based on different secret, then the API will not work.
*/