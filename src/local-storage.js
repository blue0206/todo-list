import { TaskList, ProjectList, Project, Task } from "./object-constructors";
import { ProjectDOM, ProjectListDOM } from "./dom-object-constructors";
import { listMethods } from "./methods";
import { incrementIdGen } from "./constructor";
import { refreshDisplay } from "./display";


// Task backup list to be stored.
const TaskBackup = function(list=[]) {
    const obj = {
        list
    };

    return Object.assign(
        {},
        obj,
        listMethods(list)
    );
}();

// Project backup list to be stored.
const ProjectBackup = function(list=[]) {
    const obj = {
        list
    };

    return Object.assign(
        {},
        obj,
        listMethods(list)
    );
}();

// Task backup object storable in JSON.
const TaskBackupObject = function(task) {
    this.name = task.name;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.priority = task.priority;
    this.id = task.id;
    this.project = task.project;
    this.status = task.status;
};

// Project backup object storable in JSON.
const ProjectBackupObject = function(project) {
    this.name = project.name;
    this.id = project.id;
};

// Change back storable JSON objects to normal objects for use.
// The methods of this IIFE reconstruct task/project object from the
// data provided by Backup object.
const Reconstruct = function() {
    const taskObject = (task) => {
        const taskObj = new Task(
          task.name,
          task.description,
          task.dueDate,
          task.priority,
          task.id,
          task.project,
          task.status
        );
        TaskList.add(taskObj);
        ProjectList.search(taskObj.project).add(taskObj);
        ProjectListDOM.search(taskObj.project).add(taskObj);
        refreshDisplay(taskObj.project);
    };

    const projectObject = (project) => {
        ProjectList.add(Project(project.name, project.id));
        ProjectListDOM.add(ProjectDOM(project.name, project.id));
        ProjectDOM(project.name, project.id).sidebarDisplay();
        refreshDisplay();
    };

    return { taskObject, projectObject };
}();

// Setup the storage in case of first use.
function storageSetup()
{
    localStorage.setItem("projectList", JSON.stringify(ProjectBackup.list));
    localStorage.setItem("taskList", JSON.stringify(TaskBackup.list));
}

// Update storage with new data.
function populateStorage()
{    
    // Reset backup
    ProjectBackup.list.splice(0, ProjectBackup.list.length);
    TaskBackup.list.splice(0, TaskBackup.list.length);

    // Update backup
    ProjectList.list.forEach((project) => {
        // Inbox (id == 0) is excluded
        if (project.id != 0)
        {
            ProjectBackup.add(new ProjectBackupObject(project));
        }
    });
    TaskList.list.forEach((task) => TaskBackup.add(new TaskBackupObject(task)));
    
    // Update storage
    localStorage.setItem("projectList", JSON.stringify(ProjectBackup.list));
    localStorage.setItem("taskList", JSON.stringify(TaskBackup.list));
}

// Fetch existing data
function getData()
{
    // Fetch stored data from local storage
    const storedProjectList = JSON.parse(localStorage.getItem("projectList"));
    const storedTaskList = JSON.parse(localStorage.getItem("taskList"));

    // Reconstruct existing project objects.
    storedProjectList.forEach((project) => Reconstruct.projectObject(project));
    // Reconstruct existing task objects.
    storedTaskList.forEach((task) => Reconstruct.taskObject(task));
    // Update id generator.
    let size = TaskList.list.length + ProjectList.list.length;
    incrementIdGen(size);
}

// Check if localStorage is supported and available
function storageAvailable(type)
{
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

export { getData, populateStorage, storageSetup, storageAvailable };