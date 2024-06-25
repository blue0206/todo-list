const taskList = [];
const projectList = [];

const Task = function(name, description, dueDate, priority, id, status=false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    // Status = false corresponds to "Task Incomplete" and vice-versa.
    this.status = status;
};

const Project = function(name, id, tasks=[]) {
    this.name = name;
    this.id = id;
    this.tasks = tasks;
};

export { 
    Task, 
    taskList,
    Project,
    projectList, 
};