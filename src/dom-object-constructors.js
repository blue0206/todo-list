import { listMethods } from "./methods.js";

const ProjectDOM = function(name, id, projectTaskList = []) {
    const displayObj = {
        mainDisplay: () => {
            // Container
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');
            projectContainer.id = id;
        
            
            // Project Heading
            const projectHeading = document.createElement('div');
            projectHeading.classList.add('project-heading');
        
            // Project Name
            const projectName = document.createElement('h1');
            projectName.textContent = name;
            projectName.classList.add('project-name');
            projectHeading.appendChild(projectName);
            
            projectContainer.appendChild(projectHeading);
        
        
            // Project Task List (shown in form of checkboxes)
            const taskList = document.createElement('ul');
            taskList.classList.add('project-task-list');

            projectTaskList.forEach((task) => {
                updateProjectTaskList(taskList, task);
            });
            // Task Add Button shown at bottom of task list
            const addTaskBtn = document.createElement('button');
            addTaskBtn.classList.add('add-task');
            const addTaskIcon = new Image();
            addTaskIcon.src = "";
            addTaskIcon.alt = "Add Task";
            addTaskBtn.appendChild(addTaskIcon);
            const addTaskDiv = document.createElement('div');
            addTaskDiv.textContent = "Add Task";
            addTaskBtn.appendChild(addTaskDiv);
            taskList.appendChild(addTaskBtn);

            // Dispatch "Add Task" event to the Add Task button
            addTaskBtn.addEventListener('click', (e) => {
                document.querySelector('.tabs > .add-task').dispatchEvent(
                    new MouseEvent('click')
                );
            });

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

    const updateProjectTaskList = (taskList, task) => {
        const taskContainer = document.createElement("li");
        taskContainer.classList.add("project-task");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        taskContainer.appendChild(checkBox);

        const taskBody = document.createElement("button");
        taskBody.classList.add('task');
        taskBody.id = task.id;
        // Attach event listener to display full task window.
        taskBody.addEventListener('click', () => {
            taskDisplay(task);
        });

        const taskName = document.createElement("div");
        taskName.textContent = task.name;
        taskBody.appendChild(taskName);

        const taskDescription = document.createElement("div");
        taskDescription.textContent = task.description;
        taskBody.appendChild(taskDescription);

        taskContainer.appendChild(taskBody);
        taskList.appendChild(taskContainer);
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