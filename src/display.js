import { ProjectListDOM } from "./dom-object-constructors.js";
import { sidebarProjectsClickDispatch } from "./methods.js";
import myProjects from "./my-projects.js";

// Task Display Control Unit
const TaskDisplayControl = function() {
    const taskDisplayModal = document.querySelector(".task-modal");
    const closeBtn = taskDisplayModal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        taskDisplayModal.close();
    });

    function taskDisplay(task)
    {
        const taskDisplayModal = document.querySelector(".task-modal");
        taskDisplayModal.querySelector('.task-name').textContent = task.name;
        taskDisplayModal.querySelector('.task-description').textContent = task.description;
        taskDisplayModal.querySelector('.date').textContent = task.dueDate;
        taskDisplayModal.querySelector('.priority').textContent = task.priority;
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

function refreshDisplay(projectID=null, sidebarDisplay=false)
{
    const mainChild = document.querySelector('main').lastChild;

    if (mainChild && mainChild.className == "my-projects")   // Refresh "My Projects" tab if on display.
    {
        document.querySelector('.project-tabs .my-projects').dispatchEvent(new MouseEvent('click'));
    }
    else if (mainChild && mainChild.id == projectID && projectID !== null)  // Refresh project tab if on display & id provided.
    {
        if (!ProjectListDOM.search(projectID))  // If ID provided but project is deleted.
        {
            document.querySelector('main').removeChild(mainChild);         // Remove deleted project from display.
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

export { TaskDisplayControl, projectDisplay, myProjectsTab, refreshDisplay };