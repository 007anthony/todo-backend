module.exports = class Task {
    constructor (rawTask) {
        this.id = rawTask.id;
        this.title = rawTask.title;
        this.note = rawTask.note;
        this.user = rawTask.user;
        this.createdOn = rawTask.createdOn;
        this.dueTo = rawTask.dueTo;
        this.finishedOn = rawTask.finishedOn;
    }

    isValid () {
        const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
        const dueToIsValid = dateRegex.test(this.dueTo) || undefined;
        const finishedOnIsValid = dateRegex.test(this.finishedOn) || undefined;
        return this.id && this.title && this.createdOn &&
        !isNaN(this.id) && dateRegex.test(this.createdOn) && dueToIsValid && finishedOnIsValid;
    }
};
