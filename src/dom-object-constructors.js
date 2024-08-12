import { listMethods } from "./methods.js";
import { projectDisplay } from "./display.js";
import { TaskControl, ProjectControl } from "./constructor.js";
import { format } from "date-fns";
import EditIcon from "./assets/icons/edit-fill0.svg";
import DeleteIcon from "./assets/icons/delete-fill0.svg";
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
                    ProjectControl.setupProjectEditModal(id, name);
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
            
            const projectContainer = document.createElement('button');
            projectContainer.classList.add('project-li');
            projectContainer.id = id;
            projectContainer.addEventListener('click', (e) => {
                // Prevent trigger for edit & delete buttons.
                if (e.target.className == "project-li" || e.target.className == 'project-item')
                {
                    projectDisplay(ProjectListDOM.search(id));
                }
            });

            const projectName = document.createElement('div');
            projectName.classList.add('project-item');
            projectName.textContent = name;
            projectContainer.appendChild(projectName);

            const btnContainer = document.createElement('div');
            btnContainer.classList.add('project-btns');

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-project');
            editBtn.addEventListener('click', () => {
                ProjectControl.setupProjectEditModal(id, name);
            });
            btnContainer.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-project');
            deleteBtn.addEventListener('click', () => {
                ProjectControl.projectDestructor(id);
            });
            btnContainer.appendChild(deleteBtn);

            projectContainer.appendChild(btnContainer);
            projectTab.appendChild(projectContainer);
        },
        name,
        id,
        update(newName) { this.name = newName },
        tasks
    };

    const updateProjectTaskList = (taskList, task) => {
        const taskContainer = document.createElement("li");
        taskContainer.classList.add("project-task");

        // Checkbox
        const checkBox = document.createElement("input");
        checkBox.classList.add('task-complete');
        checkBox.type = "checkbox";
        if (task.status)
        {
            checkBox.setAttribute('checked', true);
        }
        // Checkbox Event Listener
        checkBox.addEventListener('click', () => {
            task.status = task.status ? false : true;
        });
        taskContainer.appendChild(checkBox);

        // Task
        const taskBodyContainer = document.createElement('div');
        taskBodyContainer.classList.add('project-task-container');

        // Sideline to indicate priority via bg-color.
        const sideline = document.createElement('div');
        sideline.classList.add(`${task.priority.toLowerCase()}`, 'sideline');
        taskBodyContainer.appendChild(sideline);

        // Task body composed of name and description.
        const taskBody = document.createElement("div");
        taskBody.classList.add('task');

        // Task Name
        const taskName = document.createElement("div");
        taskName.textContent = task.name;
        taskBody.appendChild(taskName);

        // Task Description
        const taskDescription = document.createElement("div");
        taskDescription.textContent = task.description;
        taskBody.appendChild(taskDescription);
        
        taskBodyContainer.appendChild(taskBody);

        // Container for options and additional task info.
        const utilityContainer = document.createElement('div');
        utilityContainer.classList.add('task-utility');

        // Container for edit & delete buttons.
        const btnContainer = document.createElement('div');

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-task');
        editBtn.addEventListener('click', () => {
            document.querySelector('.edit-task-modal').showModal();
            TaskControl.setupTaskEditFields(task);
        });

        const editIcon = new Image();
        editIcon.src = EditIcon;
        editIcon.alt = "Edit Task";
        editBtn.appendChild(editIcon);

        btnContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-task');
        deleteBtn.addEventListener('click', () => {
            TaskControl.deleteTask(task);
        });

        const deleteIcon = new Image();
        deleteIcon.src = DeleteIcon;
        deleteIcon.alt = "Delete Task";
        deleteBtn.appendChild(deleteIcon);
        btnContainer.appendChild(deleteBtn);
        
        utilityContainer.appendChild(btnContainer);

        // Container for task due-date.
        const taskDueDateContainer = document.createElement('div');

        const taskDueDateHeading = document.createElement('div');
        taskDueDateHeading.classList.add('task-utility-heading');
        taskDueDateHeading.textContent = "Due Date";
        taskDueDateContainer.appendChild(taskDueDateHeading);

        const taskDueDate = document.createElement('div');
        taskDueDate.textContent = `${format(task.dueDate, "do MMMM yyyy")}`;
        taskDueDateContainer.appendChild(taskDueDate);

        utilityContainer.appendChild(taskDueDateContainer);

        // Container for task status indication.
        const taskStatusContainer = document.createElement('div');
        
        const taskStatusHeading = document.createElement('div');
        taskStatusHeading.classList.add('task-utility-heading');
        taskStatusHeading.textContent = "Status";
        taskStatusContainer.appendChild(taskStatusHeading);

        const taskStatus = document.createElement('div');
        taskStatus.classList.add('task-status');

        const taskStatusIcon = document.createElement('div');
        taskStatus.appendChild(taskStatusIcon);
        const statusText = document.createElement('div');
        taskStatus.appendChild(statusText);

        taskStatusContainer.appendChild(taskStatus);
        utilityContainer.appendChild(taskStatusContainer);

        // Container to display task parent project.
        const parentProjectContainer = document.createElement('div');

        const parentProjectHeading = document.createElement('div');
        parentProjectHeading.classList.add('task-utility-heading');
        parentProjectHeading.textContent = "Project";
        parentProjectContainer.appendChild(parentProjectHeading);

        const parentProject = document.createElement('div');
        parentProject.textContent = ProjectListDOM.search(task.project).name;
        parentProjectContainer.appendChild(parentProject);
        
        utilityContainer.appendChild(parentProjectContainer);

        taskBodyContainer.appendChild(utilityContainer);
        
        // Expand-Collapse button (setup via CSS).
        const expandCollapse = document.createElement('input');
        expandCollapse.type = "checkbox";
        expandCollapse.classList.add('expand-collapse');
        
        taskBodyContainer.appendChild(expandCollapse);
        taskContainer.appendChild(taskBodyContainer);
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