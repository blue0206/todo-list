import { ProjectListDOM } from "./dom-object-constructors";
import { sidebarProjectsClickDispatch } from "./methods";
import AddIcon from "./assets/icons/add-circle.svg";
import { ProjectControl } from "./constructor";

export default function content() {
    const main = document.querySelector('main');
    // Remove any child elements of main.
    if (main.lastChild)
    {
        main.removeChild(main.lastChild);
    }
    
    const container = document.createElement('div');
    container.classList.add('my-projects');

    const headingContainer = document.createElement('div');
    headingContainer.classList.add('my-projects-header');

    const heading = document.createElement('h1');
    heading.textContent = "My Projects";
    headingContainer.appendChild(heading);
    
    container.appendChild(headingContainer);

    const projectList = document.createElement('div');
    projectList.classList.add('project-list');

    // Generate DOM for all projects created this far
    ProjectListDOM.list.forEach((project) => {
        // Project ID 0 belongs to Inbox which is
        // not considered a project.
        if (project.id != 0)
        {
            projectList.appendChild(projectListItemDOM(project));
        }
    });

    // Create "Add Project" button.
    const addProjectBtn = document.createElement('button');
    addProjectBtn.classList.add('add-project');
    // Attach event listener to "Add Project" button in order to
    // display the modal.
    addProjectBtn.addEventListener('click', () => {
        // Dispatch the event to the "Add Project" button on sidebar.
        document
          .querySelector("nav .add-project")
          .dispatchEvent(new MouseEvent("click"));
    });

    // Add Project Icon
    const addIcon = new Image();
    addIcon.src = AddIcon;
    addIcon.alt = "Add Project";
    addProjectBtn.appendChild(addIcon);

    const btnText = document.createElement('div');
    btnText.textContent = "Add Project";
    addProjectBtn.appendChild(btnText);

    projectList.appendChild(addProjectBtn);

    container.appendChild(projectList);

    main.appendChild(container);
};

function projectListItemDOM(project)
{
    // Project Button to open Project tab.
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");

    // Project Name
    const projectName = document.createElement("div");
    projectName.textContent = project.name;
    projectName.addEventListener('click', () => {
        sidebarProjectsClickDispatch(project.id);
    });
    projectContainer.appendChild(projectName);

    const btnContainer = document.createElement('div');

    // tooltip Element
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-project');
    editBtn.addEventListener('click', () => {
        ProjectControl.setupProjectEditModal(project.id, project.name);
    });
    const editTooltip = tooltip.cloneNode(true);
    editBtn.appendChild(editTooltip);
    btnContainer.appendChild(editBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-project');
    deleteBtn.addEventListener('click', () => {
        ProjectControl.confirmDelete(project.id);
    });
    const deleteTooltip = tooltip.cloneNode(true);
    deleteBtn.appendChild(deleteTooltip);
    btnContainer.appendChild(deleteBtn);

    projectContainer.appendChild(btnContainer);
    return projectContainer;
}