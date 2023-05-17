const express = require('express');
const {getAllTasks} = require('./taskService');
const app = express();
const port = 3000;

app.use(express.json());

// endpoints

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === Number(id));
    if(task) {
        res.send(task);
    }
    else {
        throw new 
    }
})

app.use((err, req, res, _) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})