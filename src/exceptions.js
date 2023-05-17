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

class UnprocessableContentError extends StatusError {
    constructor (message) {
        super(message, 422);
    }
}

module.exports = { UnauthorizedError, NotFoundError, UnprocessableContentError };
