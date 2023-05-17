const tasks = require("./tasks.json");
const {NotFoundError, UnprocessableContentError} = require("./exceptions");

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

function addTask(task) {
    if(task.isValid()) {
        tasks.push(task);
    }
    else {
        throw new UnprocessableContentError("The request body misses at least one argument.")
    }
}

module.exports = {getAllTasks, getTask, addTask};