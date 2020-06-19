const router= require('express').Router();
const UserController = require('../controllers/UserController.js');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.delete('/delete/:id', UserController.destroy);
router.post('/googleSign', UserController.googleSign)

module.exports = router;