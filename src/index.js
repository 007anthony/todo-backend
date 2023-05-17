const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

// endpoints


app.use((err, req, res, _) => {
    console.log(err);
    res.status(err.status).send(err.message);
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
})