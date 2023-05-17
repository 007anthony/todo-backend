const tasks = require("./tasks.json");
const {NotFoundError} = require("./exceptions");

function getAllTasks() {
    return tasks;
}

function getTask(id) {
    const task = tasks.find(task => task.id === Number(id));
    if(!task) {
        throw new NotFoundError(`The task with ID ${id} cannot be found`)
    }
    return task;
}

module.exports = {getAllTasks, getTask};