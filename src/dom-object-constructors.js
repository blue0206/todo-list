import { listMethods } from "./methods.js";

const ProjectDOM = function(name, id, projectTaskList = []) {
    const displayObj = {
        mainDisplay: () => {
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

            const taskContainer = document.createElement('li');
            projectTaskList.forEach((task) => {
                    taskContainer.classList.add('project-task');
            
                    const checkBox = document.createElement('input');
                    checkBox.type = 'checkbox';
                    taskContainer.appendChild(checkBox);
            
                    
                    const taskBody = document.createElement('div');
                    const taskName = document.createElement('div');
                    taskName.textContent = task.name;
                    taskBody.appendChild(taskName);
            
                    const taskDescription = document.createElement('div');
                    taskDescription.textContent = task.description;
                    taskBody.appendChild(taskDescription);
                    
                    taskContainer.appendChild(taskBody);
                });
            taskList.appendChild(taskContainer);
            
            projectContainer.appendChild(taskList);
            return projectContainer;
        },
        sidebarDisplay: () => {
            const projectTab = document.querySelector('.project-tabs');
            const insertBeforeNode = projectTab.querySelector('.add-project');

            
            const projectBtn = document.createElement('button');
            projectBtn.classList.add('project-item');
            projectBtn.id = id;

            const img = new Image();
            img.src = "";
            img.alt = "Open Project";
            projectBtn.appendChild(img);

            const div = document.createElement('div');
            div.textContent = name;
            projectBtn.appendChild(div);


            projectTab.insertBefore(projectBtn, insertBeforeNode);
        },
        name,
        id
    };

    return Object.assign(
        {},
        displayObj,
        listMethods(projectTaskList)
    );
};

const ProjectListDOM = function(list=[]){
    const obj = {
        list
    };

    return Object.assign(
        {},
        obj,
        listMethods(list)
    );
}();

export { ProjectDOM, ProjectListDOM };