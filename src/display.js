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

    if (mainChild.className == "my-projects")
    {
        document.querySelector('.project-tabs .my-projects').dispatchEvent(new MouseEvent('click'));
    }
    else if (mainChild.id == projectID && projectID !== null)
    {
        if (projectID == 0)
        {
            document.querySelector('button.inbox').dispatchEvent(new MouseEvent('click'));
        }
        else
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