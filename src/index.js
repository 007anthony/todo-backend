const express = require('express');
const taskService = require('./taskService');
const app = express();
const port = 3000;

app.use(express.json());

// endpoints

app.get('/tasks', (req, res) => {
    res.send(taskService.getAllTasks());
});

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    res.send(taskService.getTask(id));
})

app.use((err, req, res, _) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})