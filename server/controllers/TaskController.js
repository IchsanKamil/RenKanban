const { Task } = require('../models');

class TaskController {
    static create(req, res, next) {
        console.log('masuk taskcontrol');
        const { title, description, category, due_date } = req.body;
        const UserId = req.user.id
        const newTask = { title, description, category, due_date, UserId };

        Task.create(newTask)
            .then((data) => {
                res.status(201).json(data);
            }).catch((err) => {
                next(err);
            });
    }

    static findAll(req, res, next) {
        console.log('masuk findAll');
        Task.findAll({
            where: { UserId: req.user.id },
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

        Task.update(updateTodo, {
            where: { id }
        })
            .then(() => {
                res.status(200).json(updateTodo);
            })
            .catch((err) => {
                next(err);
            });
    }

    static destroy(req, res, next) {
        const { id } = req.params;
        let deleteTodo;

        Task.destroy({
            where: { id },
        })
            .then(() => {
                res.status(200).json({
                    message: `Task successfully deleted`,
                    deleteTodo
                })
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = TaskController;