const express = require('express');
const session = require('express-session')
const taskService = require('./taskService');
const loginService = require('./userService');
const Task = require('./task');
const { NotFoundError, UnprocessableContentError } = require('./exceptions');
const app = express();
const port = 3000;

let taskId = taskService.getAllTasks().length;

app.use(express.json());
app.use(session({
    secret: "m295",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

/* --------------------------------------------
*   LOGIN
*  ---------------------------------------------
*/
app.post('/login', (req, res) => {
    loginService.login(req.body.email, req.body.password);
    req.session.isAuthenticated = true;
    res.sendStatus(200);
});

//tasks
app.get('/tasks', (req, res) => {
    res.send(taskService.getAllTasks());
});

app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    res.send(taskService.getTask(id));
});

app.post("/tasks", (req, res) => {
    req.body.id = taskId++;
    const task = new Task(req.body);
    taskService.addTask(task);
    res.status(201).send(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = taskService.deleteTask(id);
    res.status(200).send(task);
});

app.put("/tasks", (req, res) => {
    const newTask = new Task(req.body);
    const task = taskService.replaceTask(newTask);  
    res.send(task);
});

app.use((err, req, res, _) => {
    console.log(err);
    res.status(err.status).send({status: err.status, msg: err.message});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})