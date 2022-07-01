const {Task} = require('./models')

class TaskController {
    async get_tasks(req, res) {
        const tasks = await Task.findAll()
        return res.json(tasks)
    }

    async get_one_task(req, res) {
        const {id} = req.params
        const task = await Task.findOne({where: {id}})
        return res.json(task)
    }

    async create_task(req, res) {
        const {name} = req.body
        const new_task = await Task.create({
            name
        })
        return res.json(new_task)
    }

    async update_task(req, res) {
        const {id, name} = req.body
        const task = await Task.upsert({
            id: id,
            name: name
        })
        return res.json(task)
    }

    async delete_task(req, res) {
        const {id} = req.params
        const task = await Task.destroy({
            where: {id: id}
        })
        return res.json(task)
    }
}

module.exports = new TaskController()