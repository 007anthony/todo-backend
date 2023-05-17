module.exports = class Task {
    constructor (rawTask) {
        this.id = rawTask.id;
        this.title = rawTask.title;
        this.note = rawTask.note;
        this.createdOn = rawTask.createdOn;
        this.dueTo = rawTask.dueTo;
        this.finishedOn = rawTask.finishedOn;
    }

    isValid () {
        return this.id && this.title && this.createdOn;
    }
};
