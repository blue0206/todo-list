import { listMethods } from "./methods.js";
import { TaskDisplayControl, projectDisplay } from "./display.js";
import { TaskControl, ProjectControl } from "./constructor.js";
import { TaskList } from "./object-constructors.js";
import EditIcon from "./assets/icons/edit.svg";
import DeleteIcon from "./assets/icons/delete.svg";
import AddIcon from "./assets/icons/add-circle.svg";

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

            // Add edit & delete feature (not for Inbox)
            if (id != 0)    // Inbox has id == 0.
            {
                // Project Edit
                const projectEditBtn = document.createElement('button');
                projectEditBtn.classList.add('edit-project');
                projectEditBtn.addEventListener('click', () => {
                    editProject(name);
                });
    
                // Project Edit Icon
                const projectEditIcon = new Image();
                projectEditIcon.src = EditIcon;
                projectEditIcon.alt = "Edit Project";
                projectEditBtn.appendChild(projectEditIcon);
                
                projectHeading.appendChild(projectEditBtn);

                // Project Delete
                const projectDeleteBtn = document.createElement('button');
                projectDeleteBtn.classList.add('delete-project');
                projectDeleteBtn.addEventListener('click', () => {
                    ProjectControl.projectDestructor(id);
                });

                // Project Delete Icon
                const projectDeleteIcon = new Image();
                projectDeleteIcon.src = DeleteIcon;
                projectDeleteIcon.alt = "Delete Project";
                projectDeleteBtn.appendChild(projectDeleteIcon);

                projectHeading.appendChild(projectDeleteBtn);
            }

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
            addTaskIcon.src = AddIcon;
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
                editProject(name);
            });

            const editIcon = new Image();
            editIcon.src = EditIcon;
            editIcon.alt = "Edit Project";
            editBtn.appendChild(editIcon);

            projectContainer.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-project');
            deleteBtn.addEventListener('click', () => {
                ProjectControl.projectDestructor(id);
            });

            const deleteIcon = new Image();
            deleteIcon.src = DeleteIcon;
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
        if (task.status)
        {
            checkBox.setAttribute('checked', true);
            taskContainer.style.textDecoration = "line-through";
        }
        checkBox.addEventListener('click', () => {
            if (checkBox.checked)
            {
                taskContainer.style.textDecoration = "line-through";
                task.status = true;
            }
            else
            {
                taskContainer.style.textDecoration = "none";
                task.status = false;
            }
        });
        taskContainer.appendChild(checkBox);

        const taskBody = document.createElement("button");
        taskBody.classList.add('task');
        taskBody.id = task.id;
        taskBody.style.textDecoration = "inherit";
        // Attach event listener to display full task window.
        taskBody.addEventListener('click', () => {
            TaskDisplayControl.taskDisplay(task);
        });

        const taskName = document.createElement("div");
        taskName.textContent = task.name;
        taskName.textDecoration = "inherit";
        taskBody.appendChild(taskName);

        const taskDescription = document.createElement("div");
        taskDescription.textContent = task.description;
        taskDescription.textDecoration = "inherit";
        taskBody.appendChild(taskDescription);

        taskContainer.appendChild(taskBody);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-task');
        editBtn.addEventListener('click', () => {
            document.querySelector('.edit-task-modal').showModal();
            TaskControl.setupTaskEditFields(TaskList.search(task.id));
        });

        const editIcon = new Image();
        editIcon.src = EditIcon;
        editIcon.alt = "Edit Task";
        editBtn.appendChild(editIcon);

        taskContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-task');
        deleteBtn.addEventListener('click', () => {
            TaskControl.deleteTask(task);
        });

        const deleteIcon = new Image();
        deleteIcon.src = DeleteIcon;
        deleteIcon.alt = "Delete Task";
        deleteBtn.appendChild(deleteIcon);
        
        taskContainer.appendChild(deleteBtn);
        taskList.appendChild(taskContainer);
    };

    const editProject = (name) => {
        const projectEditModal = document.querySelector(".edit-project-modal");
        // Id will be utilised in editor function to identify project.
        projectEditModal.id = id;
        // Setup edit modal input field with initial value.
        projectEditModal.querySelector("#project-name").value = name;
        // Display project edit modal.
        projectEditModal.showModal();
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