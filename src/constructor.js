import { Task, TaskList, Project, ProjectList } from "./object-constructors.js";
import { ProjectDOM, ProjectListDOM } from "./dom-object-constructors.js";
import { dropDownListMethods, displayControl } from "./methods.js";
import { format } from "date-fns";

let idGen = 1;

// Task Control Unit
const TaskControl = function() {
    const taskModal = document.querySelector('.add-task-modal');
    
    function taskConstructor() 
    {
        // Task-add modal button event listener to display the modal on click.
        const taskModalBtn = document.querySelector('.tabs > .add-task');
        const taskDropDown = dropDownListMethods(taskModal.querySelector('#parent-project'));
        
        taskModalBtn.addEventListener('click', () => {
            taskModal.showModal();
            taskModal.querySelector("#due-date").value = format(new Date(), "yyyy-MM-dd");
            // Generate parent project selection content
            taskDropDown.generate(ProjectList.list);
        });


        // Submit button event listener.
        const taskAddBtn = document.querySelector('.submit-task');
        taskAddBtn.addEventListener('click', () => {
            // Fetch input field values.
            const name = taskModal.querySelector('#task-name');
            const description = taskModal.querySelector('#description');
            const dueDate = taskModal.querySelector('#due-date');
            const priority = taskModal.querySelector('#priority');
            const parentProject = taskModal.querySelector("#parent-project");

            // Setup task: construct task and add to the concerned lists.
            taskSetup(name, description, dueDate, priority, parentProject);
    
            // Clear modal form element input fields
            name.value = "";
            description.value = "";
            dueDate.value = "";
            priority.value = "Medium";
    
            // Remove parent project selection content
            taskDropDown.remove();
    
            taskModal.close();
        });


        // Cancel button event listener.
        const taskCancelBtn = taskModal.querySelector('.cancel-btn');
        taskCancelBtn.addEventListener('click', () => {
            taskModal.close();
        });
    };

    function taskSetup(name, description, dueDate, priority, parentProject)
    {
        // APPLICATION-SIDE

        // Create task object instance
        const task = new Task(
            name.value, 
            description.value, 
            dueDate.value, 
            priority.value, 
            idGen++,            // Increment ID generator.
            parentProject.value
        );
        
        // Push created task into global and parent project task list.
        TaskList.add(task);
        ProjectList.search(task.project).add(task);

        // DOM-SIDE

        // Push created task into DOM parent project object task list.
        const projectDOM = ProjectListDOM.search(task.project);
        projectDOM.add(task);

        // If the parent project tab is open, update its display.
        displayControl.updateParentProjectDisplay(projectDOM, task);

        // Display task upon creation.
        displayControl.taskDisplay(task);
    }

    return { taskConstructor };
}();

// Project Constructor
function projectConstructor()
{
    const projectModal = document.querySelector('.add-project-modal');
    const projectModalBtn = document.querySelector('.project-tabs > .add-project');
    
    projectModalBtn.addEventListener('click', () => {
        projectModal.showModal();
    });
    
    const projectAddBtn = document.querySelector('.submit-project');
    projectAddBtn.addEventListener('click', () => {
        const name = projectModal.querySelector('#project-name');
    
        // Create Project object instance and push into array (application-side)
        const project = Project(name.value, idGen);
        ProjectList.add(project);
        console.log(project);
    
        // Create DOM content for project, 
        // update sidebar display, store main DOM content in array
        const projectDOM = ProjectDOM(name.value, idGen);
        ProjectListDOM.add(projectDOM);
        projectDOM.sidebarDisplay();
    
        // Increment the unique ID generator variable
        idGen++;
    
        // Clear form input fields
        name.value = "";
    
        projectModal.close();
    });

    const projectCancelBtn = projectModal.querySelector('.cancel-btn');
    projectCancelBtn.addEventListener('click', () => {
        projectModal.close();
    });
}

// Create instance of Inbox
const InboxInstance = function(){
    const obj = new Project("Inbox", 0);
    const objDOM = ProjectDOM("Inbox", 0);
    ProjectList.add(obj);
    ProjectListDOM.add(objDOM);

    return { obj, objDOM };
}();

export { TaskControl, projectConstructor, InboxInstance };