const { Task, User } = require('../models');

class TaskController {
    static create(req, res, next) {
        console.log('masuk taskcontrol');
        const { title, description, category, due_date } = req.body;
        const UserId = req.user.id
        const newTask = { title, description, category, due_date, UserId };
        console.log(newTask, '<< new task');
        Task.create(newTask)
            .then((data) => {
                console.log('crete task');
                res.status(201).json(data);
            }).catch((err) => {
                console.log('failed create');
                next(err);
            });
    }

    static findAll(req, res, next) {
        console.log('masuk findAll');
        Task.findAll({
            // where: { UserId: req.user.id },
            order: [['due_date', 'ASC']]
        })
            .then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                next(err);
            });
    }

    static findOne(req, res, next) {
        const { id } = req.params;

        Task.findByPk(id)
            .then((data) => {
                res.status(200).json(data)
            }).catch((err) => {
                next(err)
            });
    }

    static update(req, res, next) {
        const { id } = req.params;
        const { title, description, category, due_date } = req.body;
        const updateTodo = { title, description, category, due_date };
        console.log(updateTodo, id, 'masuk update');
        Task.update(updateTodo, {
            where: { id }
        })
            .then(() => {
                console.log('then update con');
                res.status(200).json(updateTodo);
            })
            .catch((err) => {
                console.log('catch update con');
                next(err);
            });
    }

    static destroy(req, res, next) {
        const { id } = req.params;
        let deleteTodo;
        console.log('masuk delete controller');
        Task.destroy({
            where: { id },
        })
            .then(() => {
                console.log('delete then con');
                res.status(200).json({
                    message: `Task successfully deleted`,
                    deleteTodo
                })
            })
            .catch((err) => {
                console.log('err delete con');
                next(err);
            });
    }
}

module.exports = TaskController;