let tasks = require("./tasks.json");
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

function deleteTask(id) {
    const task = getTask(id);
    tasks = getAllTasks().filter(task => task.id !== id);
    return task;     
}

function replaceTask(task) {
    deleteTask(task.id);
    addTask(task);
}

module.exports = {getAllTasks, getTask, addTask, deleteTask, replaceTask};