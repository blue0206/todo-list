import { listMethods } from "./methods";

const projectList = [];

const Task = function(name, description, dueDate, priority, id, project, status=false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = id;
    this.project = project;
    // Status = false corresponds to "Task Incomplete" and vice-versa.
    this.status = status;
};

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

export { 
    Task, 
    taskList,
    Project,
    projectList, 
};