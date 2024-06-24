const taskListDOM = [];

const TaskDOM = function(name, description, idGen) {
    this.taskContainer = document.createElement('div');
    this.taskContainer.classList.add('task-container');
    this.taskContainer.id = idGen;
    
    this.name = document.createElement('h2');
    this.name.textContent = name;
    this.taskContainer.appendChild(this.name);
    
    this.description = document.createElement('div');
    this.description.textContent = description;
    this.taskContainer.appendChild(this.description);

    return this.taskContainer;
};

export { TaskDOM, taskListDOM };