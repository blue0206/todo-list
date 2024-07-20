import { ProjectListDOM } from "./dom-object-constructors";

export default function content() {
    const main = document.querySelector('main');
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
    projectList.classList.add('projet-list');

    ProjectListDOM.list.forEach((project) => {
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

    const addProjectBtn = document.createElement('button');
    addProjectBtn.classList.add('add-project');
    addProjectBtn.addEventListener('click', () => {
        document
          .querySelector("nav .add-project")
          .dispatchEvent(new MouseEvent("click"));
    });

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