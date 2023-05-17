class StatusError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class NotFoundError extends StatusError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = {NotFoundError};