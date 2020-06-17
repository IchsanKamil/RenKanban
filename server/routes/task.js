const router = require('express').Router();
const TaskController = require('../controllers/TaskController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.use(authentication);
router.post('/', TaskController.create);
router.get('/', TaskController.findAll);
router.get('/:id', authorization, TaskController.findOne)
router.put('/:id', authorization, TaskController.update);
router.delete('/:id', authorization, TaskController.destroy);

module.exports = router;