const taskList = [];

const Task = function(name, description, dueDate, priority, idGen) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = idGen;
};

export { Task, taskList };