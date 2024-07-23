import { listMethods } from "./methods.js";
import { TaskDisplayControl, projectDisplay } from "./display.js";
import { TaskControl } from "./constructor.js";
import { TaskList } from "./object-constructors.js";

const ProjectDOM = function(name, id, tasks = []) {
    const obj = {
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

            tasks.forEach((task) => {
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
            
            const projectContainer = document.createElement('li');
            projectContainer.classList.add('project-li');

            const projectBtn = document.createElement('button');
            projectBtn.classList.add('project-item');
            projectBtn.id = id;
            projectBtn.textContent = name;
            projectBtn.addEventListener('click', () => {
                projectDisplay(ProjectListDOM.search(id));
            });
            projectContainer.appendChild(projectBtn);

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-project');
            editBtn.addEventListener('click', () => {
                const projectEditModal = document.querySelector('.edit-project-modal');
                // Id will be utilised in editor function to identify project.
                projectEditModal.id = id;
                // Setup edit modal input field with initial value.
                projectEditModal.querySelector('#project-name').value = name;
                // Display project edit modal.
                projectEditModal.showModal();
            });

            const editIcon = new Image();
            editIcon.src = "";
            editIcon.alt = "Edit Project";
            editBtn.appendChild(editIcon);

            projectContainer.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-project');
            deleteBtn.addEventListener('click', () => {

            });

            const deleteIcon = new Image();
            deleteIcon.src = "";
            deleteIcon.alt = "Delete Project";
            deleteBtn.appendChild(deleteIcon);

            projectContainer.appendChild(deleteBtn);
            projectTab.appendChild(projectContainer);
        },
        name,
        id,
        update: function(newName) { name = newName },
        tasks
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
            TaskDisplayControl.taskDisplay(task);
        });

        const taskName = document.createElement("div");
        taskName.textContent = task.name;
        taskBody.appendChild(taskName);

        const taskDescription = document.createElement("div");
        taskDescription.textContent = task.description;
        taskBody.appendChild(taskDescription);

        taskContainer.appendChild(taskBody);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-task');
        editBtn.addEventListener('click', () => {
            document.querySelector('.edit-task-modal').showModal();
            TaskControl.setupTaskEditFields(TaskList.search(task.id));
        });

        const editIcon = new Image();
        editIcon.src = "";
        editIcon.alt = "Edit Task";
        editBtn.appendChild(editIcon);

        taskContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-task');
        deleteBtn.addEventListener('click', () => {
            TaskControl.deleteTask(task);
        });

        const deleteIcon = new Image();
        deleteIcon.src = "";
        deleteIcon.alt = "Delete Task";
        deleteBtn.appendChild(deleteIcon);
        
        taskContainer.appendChild(deleteBtn);
        taskList.appendChild(taskContainer);
    };

    return Object.assign(
        {},
        obj,
        listMethods(tasks)
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