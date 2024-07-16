import { listMethods } from "./methods";

const Task = function(name, description, dueDate, priority, id, project, status=false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    // Stores project id of the parent project of task.
    this.project = project;
    // Status = false corresponds to "Task Incomplete" and vice-versa.
    this.status = status;
};

// Method to update task details.
Task.prototype.update = function(name, description, dueDate, priority, id, project, status) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.project = project;
    this.status = status;
}

const TaskList = function(list=[]) {
    const obj = {
        list
    };

    return Object.assign(
        {},
        obj,
        listMethods(list)
    );
}();

const Project = function(name, id, tasks=[]) {
    const obj = {
        name,
        id,
        tasks
    }
    
    return Object.assign(
        {},
        obj,
        listMethods(tasks)
    );
};

const ProjectList = function(list=[]){
    const obj = {
        list
    };

    return Object.assign(
        {},
        obj,
        listMethods(list)
    );
}();

export { 
    Task,
    TaskList, 
    Project,
    ProjectList
};