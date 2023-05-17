let tasks = require('./tasks.json');
const { NotFoundError, NotAcceptableError } = require('./exceptions');

function getAllTasks () {
    return tasks;
}

function getTask (id) {
    const task = tasks.find(task => task.id === Number(id));
    if (!task) {
        if(isNaN(id)) {
            throw new NotAcceptableError("ID is invalid. It must be a number");
        }
        throw new NotFoundError(`The task with ID ${id} cannot be found`);
    }
    return task;
}

function addTask (task) {
    if (task.isValid()) {
        tasks.push(task);
    } else {
        throw new NotAcceptableError('The request body is unvalid. Check the documentation for more informations.');
    }
}

function deleteTask (id) {
    const task = getTask(id);
    tasks = getAllTasks().filter(task => task.id !== id);
    return task;
}

function replaceTask (task) {
    getTask(task.id)
    deleteTask(task.id);
    addTask(task);
    return task;
}

module.exports = { getAllTasks, getTask, addTask, deleteTask, replaceTask };
