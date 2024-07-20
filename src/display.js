import { InboxInstance } from "./constructor.js";
import { ProjectListDOM } from "./dom-object-constructors.js";
import { listMethods } from "./methods.js";
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
        taskDisplayModal.showModal();
    }

    return { taskDisplay };
}();

// Project Display Control Unit
const ProjectDisplayControl = function() {
    // Generate Inbox display.
    function inboxDisplay()
    {
        const main = document.querySelector('main');
        const inboxTab = document.querySelector('button.inbox');
        inboxTab.addEventListener('click', () => {
            main.removeChild(main.lastChild);   // Remove existing content
            main.appendChild(InboxInstance.objDOM.mainDisplay()); // Add new content
        });
    }

    // Generate main display of projects.
    function projectDisplay()
    {
        const main = document.querySelector("main");
        const projectTabs = document.querySelector('.project-tabs');
        projectTabs.addEventListener('click', (e) => {
            let projectID = e.target.id;    // If button is clicked
            if (e.target.parentNode.id)     // If a child element of button is clicked
            {
                projectID = e.target.parentNode.id;
            }
            if (projectID)
            {
                main.removeChild(main.lastChild);
                main.appendChild(ProjectListDOM.search(projectID).mainDisplay());
            }
        });
    }

    return { inboxDisplay, projectDisplay };
}();

function myProjectsTab()
{
    const myProjectsBtn = document.querySelector("nav > .my-projects");
    myProjectsBtn.addEventListener("click", () => {
      myProjects();
    });
}

function refreshProjectDisplay(projectID)
{
    if (projectID == 0)     // ID == 0 refers to inbox.
    {
        document.querySelector('button.inbox').dispatchEvent(new MouseEvent('click'));
    }
    else    // ID != 0 refers to any project other than inbox.
    {
        const projectNodes = Array.from(document.querySelectorAll('.project-tabs > .project-item'));
        listMethods(projectNodes).search(projectID).dispatchEvent(new MouseEvent(
            'click', 
            // Set to true as the event listener has been set up for parent element of node.
            { bubbles: true }
        ));
    }
}

export { TaskDisplayControl, ProjectDisplayControl, myProjectsTab, refreshProjectDisplay };