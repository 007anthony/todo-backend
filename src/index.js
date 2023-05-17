const express = require('express');
const taskService = require('./taskService');
const Task = require('./task');
const app = express();
const port = 3000;

const taskId = taskService.getAllTasks().length;

app.use(express.json());

// endpoints

app.get('/tasks', (req, res) => {
    res.send(taskService.getAllTasks());
});

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    res.send(taskService.getTask(id));
});

app.post("/tasks", (req, res) => {
    req.body.id = taskId;
    const task = new Task(req.body);
    taskService.addTask(task);
    res.status(201).send(task);
});

app.use((err, req, res, _) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})