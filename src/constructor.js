import { Task, TaskList, Project, ProjectList } from "./object-constructors.js";
import { ProjectDOM, ProjectListDOM } from "./dom-object-constructors.js";
import { dropDownListMethods, displayControl, listMethods } from "./methods.js";
import { TaskDisplayControl } from "./display.js";
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

    function taskEditor()
    {
        const taskWindow = document.querySelector(".task-modal");           // Task Display Modal
        const taskEditModal = document.querySelector(".edit-task-modal");   // Task Edit Modal
        const editModalBtn = taskWindow.querySelector(".edit-task");        // Modal button
        const editSubmitBtn = taskEditModal.querySelector(".modify-btn");
        const editCancelBtn = taskEditModal.querySelector(".cancel-btn");
        // Create parent-project drop-down handler.
        const taskDropDown = dropDownListMethods(
            taskEditModal.querySelector('#parent-project')
        );
        let task = null;    // Will store the task to be edited.

        // Task edit modal button event listener to display modal on click.
        editModalBtn.addEventListener('click', () => {
            taskWindow.close();         // Close task display modal.
            taskEditModal.showModal();  // Show task edit modal
            task = TaskList.search(editModalBtn.id);    // Store the task to be edited.
            // Setup the task edit fields with existing data.
            setupTaskEditFields(task);
        });

        // Submit button event listener.
        editSubmitBtn.addEventListener('click', () => {
            // Get rid of generated project list.
            taskDropDown.remove();

            // Update the task with new data input by user using update method.
            task.update(
                taskEditModal.querySelector('#task-name').value,
                taskEditModal.querySelector('#description').value,
                taskEditModal.querySelector('#due-date').value,
                taskEditModal.querySelector('#priority').value,
                task.id,
                task.project,
                task.status
            );
            
            taskEditModal.close();      // Close task edit modal upon submit.

            TaskDisplayControl.taskDisplay(task);   // Display the task window after update.

            if (task.project == 0)  // If task is present in inbox.
            {
                document.querySelector('button.inbox').dispatchEvent(new MouseEvent('click'));
            }
            else    // If task is not present in inbox but another project.
            {
                const projects = Array.from(document.querySelectorAll('.project-tabs > .project-item'));
                listMethods(projects).search(task.project).dispatchEvent(new MouseEvent(
                    'click', 
                    // Set to true as the event listener has been set up for parent element of node.
                    { bubbles: true }
                ));
            }
        });

        // Cancel button event listener.
        editCancelBtn.addEventListener('click', () => {
            // Get rid of generated project list.
            taskDropDown.remove();

            taskEditModal.close();  // Close task edit modal upon cancelling.
            taskModal.showModal();  // Display the task.
        });

        function setupTaskEditFields(task)
        {
            taskEditModal.querySelector('#task-name').value = task.name;
            taskEditModal.querySelector('#description').value = task.description;
            taskEditModal.querySelector('#due-date').value = task.dueDate;
            taskEditModal.querySelector('#priority').value = task.priority;
            
            // Generate project list.
            taskDropDown.generate(ProjectList.list);
            // Set current parent project as selected in the drop-down.
            const parentProjectSelection = taskEditModal.querySelector('#parent-project');
            parentProjectSelection.querySelector(`option[value="${task.project}"]`).toggleAttribute('selected');
        }
    }

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
        TaskDisplayControl.taskDisplay(task);
    }

    return { taskConstructor, taskEditor };
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