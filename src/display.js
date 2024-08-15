import { ProjectListDOM } from "./dom-object-constructors.js";
import { sidebarProjectsClickDispatch } from "./methods.js";
import myProjects from "./my-projects.js";
import home from "./home.js";
import { TaskList, ProjectList } from "./object-constructors.js";
import { populateStorage } from "./local-storage.js";

// Task Display Control Unit
const TaskDisplayControl = function() {
    const taskDisplayModal = document.querySelector(".task-modal");

    // Close button event listener.
    const closeBtn = taskDisplayModal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        taskDisplayModal.close();
    });

    // Attach event listener to task checkbox.
    const taskCompleteCheckbox = document.querySelector('.task-display > .task-complete');
    taskCompleteCheckbox.addEventListener('click', () => {
        let task = TaskList.search(taskCompleteCheckbox.id);
        // Set task status.
        if (taskCompleteCheckbox.checked)
        {
            task.status = true;
        }
        else
        {
            task.status = false;
        }
        // Update storage
        populateStorage();
        // Refresh display
        refreshDisplay(task.project);
    });

    function taskDisplay(task)
    {
        const taskDisplayModal = document.querySelector(".task-modal");
        // Set task id on checkbox for status toggling.
        taskDisplayModal.querySelector('.task-complete').id = task.id;
        // Check/Uncheck checkbox depending on task status.
        if (task.status)
        {
            taskDisplayModal.querySelector('.task-complete').checked = true;
        }
        else
        {
            taskDisplayModal.querySelector('.task-complete').checked = false;
        }
        // Show task name.
        taskDisplayModal.querySelector('.task-name').textContent = task.name;
        // Show task description.
        taskDisplayModal.querySelector('.task-description').textContent = task.description;
        // Show task due date.
        taskDisplayModal.querySelector('.date').textContent = task.dueDate;
        // Show task priority level.
        taskDisplayModal.querySelector('.priority').textContent = task.priority;
        // Set id to set priority flag icon color.
        taskDisplayModal.querySelector('.priority-flag').id = task.priority.toLowerCase();
        // Show task parent project.
        taskDisplayModal.querySelector(".parent-project").textContent = ProjectList.search(task.project).name;
        // Attach id to edit & delete buttons for task identification and appropriate action.
        taskDisplayModal.querySelector('.edit-task').id = `${task.id}`;
        taskDisplayModal.querySelector(".delete-task").id = `${task.id}`;
        taskDisplayModal.showModal();
    }

    return { taskDisplay };
}();

// Generate project display.
function projectDisplay(project)
{
    const main = document.querySelector('main');
    if (main.lastChild)
    {
        main.removeChild(main.lastChild);
    }
    main.appendChild(project.mainDisplay());
}

function myProjectsTab()
{
    const myProjectsBtn = document.querySelector("nav > .my-projects");
    myProjectsBtn.addEventListener("click", () => {
        myProjects();
    });
}

function homeTab()
{
    const homeBtn = document.querySelector("nav > .home");
    homeBtn.addEventListener('click', () => {
        home();
    });
}

function refreshDisplay(projectID=null, sidebarDisplay=false)
{
    const mainChild = document.querySelector('main').lastChild;

    if (mainChild && mainChild.className == "my-projects")   // Refresh "My Projects" tab if on display.
    {
        document.querySelector('.project-tabs .my-projects').dispatchEvent(new MouseEvent('click'));
    }
    else if (mainChild && mainChild.className == "home")
    {
        home();
    }
    else if (mainChild && mainChild.id == projectID && projectID !== null)  // Refresh project tab if on display & id provided.
    {
        if (!ProjectListDOM.search(projectID))  // If ID provided but project is deleted.
        {
            document.querySelector('main').removeChild(mainChild);         // Remove deleted project from display.
            home();
        }
        else if (projectID == 0)     // ID == 0 refers to Inbox.
        {
            document.querySelector('button.inbox').dispatchEvent(new MouseEvent('click'));
        }
        else    // For all projects.
        {
            sidebarProjectsClickDispatch(projectID);
        }
    }

    if (sidebarDisplay)
    {
        const projectTabs = document.querySelector('.project-tabs');
        while (projectTabs.lastChild.className == "project-li")
        {
            projectTabs.removeChild(projectTabs.lastChild);
        }

        ProjectListDOM.list.forEach((project) => {
            if (project.id != 0)
            {
                project.sidebarDisplay();
            }
        });
    }
}

export { TaskDisplayControl, projectDisplay, myProjectsTab, homeTab, refreshDisplay };