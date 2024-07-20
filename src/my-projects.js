import { ProjectListDOM } from "./dom-object-constructors";

export default function content() {
    const main = document.querySelector('main');
    // Remove any child elements of main.
    if (main.lastChild)
    {
        main.removeChild(main.lastChild);
    }
    
    const container = document.createElement('div');
    container.classList.add('my-projects');

    const heading = document.createElement('h1');
    heading.textContent = "My Projects";
    container.appendChild(heading);

    const projectList = document.createElement('div');
    projectList.classList.add('project-list');

    // Generate DOM for all projects created this far
    ProjectListDOM.list.forEach((project) => {
        // Project ID 0 belongs to Inbox which is
        // not considered a project.
        if (project.id != 0)
        {
            const projectBtn = document.createElement('button');
            projectBtn.classList.add('project');
            
            const projectName = document.createElement('div');
            projectName.textContent = project.name;
            projectBtn.appendChild(projectName);

            projectList.appendChild(projectBtn);
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
    addIcon.src = "";
    addIcon.alt = "Add Project";
    addProjectBtn.appendChild(addIcon);

    const btnText = document.createElement('div');
    btnText.textContent = "Add Project";
    addProjectBtn.appendChild(btnText);

    projectList.appendChild(addProjectBtn);

    container.appendChild(projectList);

    main.appendChild(container);
};