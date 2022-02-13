const jwt = require('jsonwebtoken');
const User = require("../models/user");

function newToken(user) {
    return jwt.sign({id: user.id}, 'zoho', {
        expiresIn: '10d'
    });
}

function verifyToken(token) {
    try {
        let response = jwt.verify(token, 'zoho');
        return response;
    } catch(err) {
        //console.log(err);
        return [];
    }
}

module.exports = {newToken, verifyToken};