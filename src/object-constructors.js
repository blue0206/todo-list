const taskList = [];

const Task = function(name, description, idGen) {
    this.name = name;
    this.description = description;
    this.id = idGen;
};

export { Task, taskList };