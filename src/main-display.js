import { InboxInstance } from "./constructor.js";
import { ProjectListDOM } from "./dom-object-constructors.js";

// Generate task display
function taskWindowClose()
{
    const taskDisplayModal = document.querySelector(".task-modal");
    const closeBtn = taskDisplayModal.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        taskDisplayModal.close();
    });
}


// Generate Inbox main display.
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

export { taskWindowClose, inboxDisplay, projectDisplay };