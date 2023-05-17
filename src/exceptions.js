class StatusError extends Error {
    constructor (message, status) {
        super(message);
        this.status = status;
    }
}

class UnauthorizedError extends StatusError {
    constructor (message) {
        super(message, 401);
    }
}

class NotFoundError extends StatusError {
    constructor (message) {
        super(message, 404);
    }
}

class NotAcceptableError extends StatusError {
    constructor(message) {
        super(message, 406);
    }
}

module.exports = { UnauthorizedError, NotFoundError, NotAcceptableError };
