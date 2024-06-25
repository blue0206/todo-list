const projectListDOM = [];

const ProjectDOM = function(name, projectTaskList, id) {
    const mainDisplay = () => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
        projectContainer.id = id;
    
        
        const projectHeading = document.createElement('div');
        projectHeading.classList.add('project-heading');
    
        const projectName = document.createElement('h1');
        projectName.textContent = name;
        projectName.classList.add('project-name');
        projectHeading.appendChild(projectName);
    
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit');
        projectHeading.appendChild(editBtn);
    
        projectContainer.appendChild(projectHeading);
    
    
        const taskList = document.createElement('ul');
        taskList.classList.add('project-task-list');

        const taskContainer = taskListDOM();
        taskList.appendChild(taskContainer);
        
        projectContainer.appendChild(taskList);
        return projectContainer;
    };
    
    const taskListDOM = () => {
        projectTaskList.forEach((task) => {
            const taskContainer = document.createElement('li');
            taskContainer.classList.add('project-task');
    
            checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            taskContainer.appendChild(checkBox);
    
            
            taskBody = document.createElement('div');
            taskName = document.createElement('div');
            taskName.textContent = task.name;
            taskBody.appendChild(taskName);
    
            taskDescription = document.createElement('div');
            taskDescription.textContent = task.description;
            taskBody.appendChild(taskBody);
            
            taskContainer.appendChild(taskBody);
            return taskContainer;
        });
    };
    
    return { mainDisplay };
};

export { ProjectDOM, projectListDOM }; 