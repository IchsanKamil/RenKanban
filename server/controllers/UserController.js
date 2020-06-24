const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');
const { generateToken } = require('../helpers/jwt.js');
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static googleSign(req, res, next) {
        console.log('masuk google controller');
        let { id_token } = req.body;
        let name;
        let email;
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                console.log(ticket, '<<< data google');

                email = ticket.getPayload().email;
                name = ticket.getPayload().name;

                return User.findOne({
                    where: { email }
                })
            })
            .then(data => {
                if (data) {
                    return {
                        id: data.id,
                        email: data.email
                    }
                } else {
                    return User.create({ email, password: 'admin123' })
                }
            })
            .then(data => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                // console.log(generateToken(payload), '<< payload');
                return res.status(201).json({
                    id: data.id,
                    name,
                    email: data.email,
                    token: generateToken(payload)
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static register(req, res, next) {
        const { email, password } = req.body;
        const newUser = { email, password };
        User.create(newUser)
            .then((result) => {
                const { id, email, organization } = result;
                const data = { id, email, organization };

                res.status(201).json(data);
            }).catch((err) => {
                next(err)
            });
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: { email }
        })
            .then((data) => {
                if (data) {
                    if (compare(password, data.password)) {
                        let payload = {
                            id: data.id,
                            email
                        }
                        const token = generateToken(payload);

                        res.status(201).json({
                            id: data.id,
                            email,
                            token
                        });
                    } else throw({ name: `EMAIL/PASSWORD_NOT_MATCH` })
                } else throw({ name: `EMAIL_NOT_FOUND` })
            }).catch((err) => {
                next(err);
            });
    }

    static destroy(req, res, next) {
        const { id } = req.params;

        User.destroy({
            where: { id },
        })
            .then(() => {
                res.status(200).json({
                    message: `Todo successfully deleted`,
                })
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = UserController;