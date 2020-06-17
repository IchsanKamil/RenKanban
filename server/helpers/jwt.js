const jwt = require('jsonwebtoken');

const generateToken = payload => {
    return jwt.sign(payload, process.env.SECRET);
}

const verifyToken = token => {
    return jwt.verifyToken(token, process.env.SECRET);
}

module.exports = { generateToken, verifyToken };