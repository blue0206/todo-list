const taskList = [];

const Task = function(name, description, dueDate, idGen) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.id = idGen;
};

export { Task, taskList };