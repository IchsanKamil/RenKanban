const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt.js');

const authentication = (req, res, next) => {
    const { token } = req.headers;
    console.log('masuk auth');
    if (!token) next({
        name: `TOKEN_NOT_FOUND`
    })
    // console.log(token,'<<<<');
    // console.log(verifyToken(token),'<<token');
    try {
        const decode = verifyToken(token);
        req.user = decode;
        const { id } = decode;
    
        User.findByPk(id)
            .then((data) => {
                if (data) {
                    next()
                }
                else next({
                    name: `INVALID_USER`
                })
            }).catch((err) => {
                throw(err);
            });
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;