import { Task, Project, projectList } from "./object-constructors.js";
import { ProjectDOM, projectListDOM } from "./dom-object-constructors.js";
import { format } from "date-fns";

let idGen = 1;
// Task Constructor
function taskConstructor()
{
    const taskModal = document.querySelector('.add-task-modal');
    const taskModalBtns = Array.from(document.querySelectorAll('.add-task'));

    taskModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            taskModal.showModal();
            taskModal.querySelector("#due-date").value = format(new Date(), "yyyy-MM-dd");
        });
    });
    
    const taskAddBtn = document.querySelector('.submit-task');
    taskAddBtn.addEventListener('click', () => {
        const name = taskModal.querySelector('#task-name');
        const description = taskModal.querySelector('#description');
        const dueDate = taskModal.querySelector('#due-date');
        const priority = taskModal.querySelector('#priority');
        const parentProject = taskModal.querySelector("#parent-project");

        // Create task object instance and push into parent project array
        const task = new Task(
            name.value, 
            description.value, 
            dueDate.value, 
            priority.value,
            idGen,
            parentProject.value 
        );
        projectList.forEach((project) => {
            if (project.name == task.project)
            {
                project.tasks.push(task);
                console.log(project);
            }
        });
        // taskList.push(task);
        console.log(task);

        // Display the task after updating it
        const taskDisplayModal = document.querySelector(".task-modal");
        taskDisplayModal.querySelector('.task-name').textContent = name.value;
        taskDisplayModal.querySelector('.task-description').textContent = description.value;
        taskDisplayModal.querySelector('.date').textContent = dueDate.value;
        taskDisplayModal.querySelector('.priority').textContent = priority.value;
        taskDisplayModal.showModal();
        
        // Increment the unique ID generator variable
        idGen++;

        // Clear modal form element input fields
        name.value = "";
        description.value = "";
        dueDate.value = "";
        priority.value = "Medium";

        taskModal.close();
    });
};

// Project Constructor
function projectConstructor()
{
    const projectModal = document.querySelector('.add-project-modal');
    const projectModalBtns = Array.from(document.querySelectorAll('.add-project'));
    
    projectModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            projectModal.showModal();
        });
    });
    
    const projectAddBtn = document.querySelector('.submit-project');
    projectAddBtn.addEventListener('click', () => {
        const name = projectModal.querySelector('#project-name');
    
        // Create Project object instance and push into array (application-side)
        const project = new Project(name.value, idGen);
        projectList.push(project);
        console.log(project);
    
        // Create DOM content for project, 
        // update sidebar display, store main DOM content in array
        const projectDOM = new ProjectDOM(name.value, [], idGen);
        projectListDOM.push(projectDOM);
        projectDOM.sidebarDisplay();
    
        // Increment the unique ID generator variable
        idGen++;
    
        // Clear form input fields
        name.value = "";
    
        projectModal.close();
    });
}

// Create instance of Inbox
const InboxInstance = function(){
    const inbox = new Project("Inbox", 0);
    const inboxDOM = new ProjectDOM("Inbox", [], 0);
    projectList.push(inbox);
}();

export { taskConstructor, projectConstructor };