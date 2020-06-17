const router = require('express').Router();
const taskRouter = require('./task.js');
const userRouter = require('./user.js');

router.use('/', userRouter);
router.use('/tasks', taskRouter);

module.exports = router;