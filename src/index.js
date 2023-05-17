const express = require('express');
const session = require('express-session');
const taskService = require('./taskService');
const loginService = require('./userService');
const Task = require('./task');
const { UnauthorizedError } = require('./exceptions');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const app = express();
const port = 3000;

let taskId = taskService.getAllTasks().length;

app.use(express.json());
app.use(session({
    secret: 'm295',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

/* --------------------------------------------
*   LOGIN
*  ---------------------------------------------
*/
app.post('/login', (req, res) => {
    /* #swagger.parameters['login'] = {
        in: 'body',
        description: 'Log in a user.',
        schema: {
            $email: 'test@test.com',
            $password: 'm295'
        }
        #swagger.responses[200] = {
            description: 'shows if the user is authenticated',
            schema: {
                $email: 'test@test.com'
            }
        }
        #swagger.responses[401] = {
            description: 'The email address or the password are wrong',
            schema: {
                $status: 401,
                $error: 'The username or password is wrong'
            }
        }
    } */
    loginService.login(req.body.email, req.body.password);
    req.session.email = req.body.email;
    res.send({email: req.session.email});
});

app.get('/verify', (req, res) => {
    /* #swagger.description = "This is an endpoint to verify the cookie."
       #swagger.responses[200] = {
        description: 'The cookie is valid'
       }
     */
    if (req.session.email) {
        res.send({ email: req.session.email });
    } else {
        throw new UnauthorizedError("You aren't authenticated");
    }
});

app.delete('/logout', (req, res) => {
    /* #swagger.description = "Logs the user out"
    */
    req.session.destroy();
    res.sendStatus(204);
});

/*  ---------------------------------------------------------------
*   TASKS
*   ---------------------------------------------------------------
*/

app.use('/tasks(/*)?', (req, res, next) => {
    if(req.session.email) {
        next();
    }
    else {
        throw new UnauthorizedError("You are not authorized!")
    }
})

app.get('/tasks', (req, res) => {
    res.send(taskService.getAllTasks());
});

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    res.send(taskService.getTask(id));
});

app.post('/tasks', (req, res) => {
    req.body.id = taskId++;
    req.body.user = req.session.email;
    const task = new Task(req.body);
    taskService.addTask(task);
    res.status(201).send(task);
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = taskService.deleteTask(id);
    res.status(200).send(task);
});

app.put('/tasks', (req, res) => {
    const newTask = new Task(req.body);
    newTask.id = Number(newTask.id);
    const task = taskService.replaceTask(newTask);
    res.send(task);
});

/*  ---------------------------------------------
*   ERROR-HANDLING
*   ---------------------------------------------
*/
app.use((req, res) => {
    res.sendStatus(404);
});

app.use((err, req, res, _) => {
    console.log(err);
    res.status(err.status || 500).send({ status: err.status, msg: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
