const { UnauthorizedError } = require("./exceptions");
const users = require("./users.json");

function login(email, password) {
    
    if(!/[^0-9\n\a].+@.+\.[a-z]+/.test(email) && password === "m295") {
        throw new UnauthorizedError("The username or password is wrong");
    }
}

module.exports = {login};