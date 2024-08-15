import { Task, TaskList, Project, ProjectList } from "./object-constructors.js";
import { ProjectDOM, ProjectListDOM } from "./dom-object-constructors.js";
import { dropDownListMethods } from "./methods.js";
import { projectDisplay, refreshDisplay, TaskDisplayControl } from "./display.js";
import { format } from "date-fns";
import { populateStorage } from "./local-storage.js";

let idGen = 1;

function incrementIdGen(incrementValue)
{
    idGen += incrementValue;
}

// Task Control Unit
const TaskControl = function() {
    
    const taskWindow = document.querySelector(".task-modal");  // Task Display Modal
    
    function taskConstructor() 
    {
        const taskModal = document.querySelector('.add-task-modal');
        const taskModalBtn = document.querySelector('.tabs > .add-task');
        const taskDropDown = dropDownListMethods(taskModal.querySelector('#parent-project'));
        
        // Task-add modal button event listener to display the modal on click.
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
            taskDropDown.remove();
        });
    };

    function taskEditor()
    {
        const taskEditModal = document.querySelector(".edit-task-modal");   // Task Edit Modal
        const editModalBtn = taskWindow.querySelector(".edit-task");        // Modal button
        const editSubmitBtn = taskEditModal.querySelector(".modify-btn");
        const editCancelBtn = taskEditModal.querySelector(".cancel-btn");
        // Create parent-project drop-down handler.
        const taskDropDown = dropDownListMethods(
            taskEditModal.querySelector('#parent-project')
        );
        
        // Task edit modal button event listener to display modal on click.
        editModalBtn.addEventListener('click', () => {
            taskWindow.close();         // Close task display modal.
            taskEditModal.showModal();  // Show task edit modal
            // Setup the task edit fields with existing data.
            setupTaskEditFields(TaskList.search(editModalBtn.id)); // Pass the task as argument.
        });
        
        // Submit button event listener.
        editSubmitBtn.addEventListener('click', () => {
            const task = TaskList.search(editSubmitBtn.id);    // Store the task to be edited.

            // Update the task with new data input by user using update method.
            task.update(
                taskEditModal.querySelector('#task-name').value,
                taskEditModal.querySelector('#description').value,
                taskEditModal.querySelector('#due-date').value,
                taskEditModal.querySelector('#priority').value,
                taskEditModal.querySelector('#parent-project').value
            );

            // Update storage.
            populateStorage();
            
            taskEditModal.close();      // Close task edit modal upon submit.

            TaskDisplayControl.taskDisplay(task);   // Display the task window after update.

            // Refresh the project display to show the updated task.
            refreshDisplay(task.project);

            // Get rid of generated project list.
            taskDropDown.remove();
        });

        // Cancel button event listener.
        editCancelBtn.addEventListener('click', () => {
            // Get rid of generated project list.
            taskDropDown.remove();

            taskEditModal.close();  // Close task edit modal upon cancelling.
            taskWindow.showModal();  // Display the task.
        });
    }
    
    function taskDestructor()
    {
        // Attach event listener to task delete button to delete task.
        const deleteBtn = taskWindow.querySelector(".delete-task");
        deleteBtn.addEventListener('click', () => {
            deleteTask(TaskList.search(deleteBtn.id));
        });
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
            idGen,            // Increment ID generator.
            parentProject.value
        );

        // Push created task into global and parent project task list.
        TaskList.add(task);
        ProjectList.search(task.project).add(task);
        
        // DOM-SIDE
        
        // Push created task into DOM parent project object task list.
        const projectDOM = ProjectListDOM.search(task.project);
        projectDOM.add(task);

        // Update storage.
        populateStorage();
        
        // If the parent project tab is open, update its display.
        refreshDisplay(task.project);
        
        // Display task upon creation.
        TaskDisplayControl.taskDisplay(task);

        // Increment id generator variable.
        incrementIdGen(1);
    }

    function setupTaskEditFields(task)
    {
        const taskEditModal = document.querySelector(".edit-task-modal");   // Task Edit Modal
        taskEditModal.querySelector('#task-name').value = task.name;
        taskEditModal.querySelector('#description').value = task.description;
        taskEditModal.querySelector('#due-date').value = task.dueDate;
        taskEditModal.querySelector('#priority').value = task.priority;
        taskEditModal.querySelector('.modify-btn').id = task.id;
        
        // Create parent-project drop-down handler.
        const taskDropDown = dropDownListMethods(
            taskEditModal.querySelector('#parent-project')
        );
        // Generate project list.
        taskDropDown.generate(ProjectList.list);
        // Set current parent project as selected in the drop-down.
        const parentProjectSelection = taskEditModal.querySelector('#parent-project');
        parentProjectSelection.querySelector(`option[value="${task.project}"]`).selected = true;
    }

    function deleteTask(task)
    {
        // Remove task from global task list.
        TaskList.remove(task.id);
        // Remove task from parent project's task list (application-side)
        ProjectList.search(task.project).remove(task.id);
        // Remove task from parent project's task list (DOM-side)
        ProjectListDOM.search(task.project).remove(task.id);
        // Update storage.
        populateStorage();
        // Refresh display.
        refreshDisplay(task.project);
        // Close the task display modal.
        taskWindow.close();
    }

    return { 
        taskConstructor, 
        taskEditor, 
        taskDestructor, 
        setupTaskEditFields, 
        deleteTask
    };
}();

// Project Control Unit
const ProjectControl = function() {
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

            // Construct project object and setup DOM content for the same.
            projectSetup(name);
        
            // Clear form input fields
            name.value = "";
        
            projectModal.close();
        });
    
        const projectCancelBtn = projectModal.querySelector('.cancel-btn');
        projectCancelBtn.addEventListener('click', () => {
            projectModal.close();
        });
    }

    function projectEditor()
    {
        const projectEditModal = document.querySelector('.edit-project-modal');
        const submitBtn = projectEditModal.querySelector('.modify-btn');
        const cancelBtn = projectEditModal.querySelector('.cancel-btn');

        submitBtn.addEventListener('click', () => {
            const projectID = projectEditModal.id;
            const newName = projectEditModal.querySelector('#project-name').value;

            ProjectList.search(projectID).update(newName);
            ProjectListDOM.search(projectID).update(newName);

            // Update storage.
            populateStorage();

            refreshDisplay(projectID, true);
            projectEditModal.close();
        });

        cancelBtn.addEventListener('click', () => {
            projectEditModal.close();
        });
    }

    function projectDestructor(projectID)
    {
        // Remove project from application-side list.
        ProjectList.remove(projectID);
        // Remove project from DOM-side list.
        ProjectListDOM.remove(projectID);
        // Update storage.
        populateStorage();
        // Refresh main & sidebar display.
        refreshDisplay(projectID, true);
    }

    function projectSetup(name)
    {
        // APPLICATION-SIDE

        // Create Project object instance and push into array (application-side)
        ProjectList.add(Project(name.value, idGen));
        
        // DOM-SIDE

        // Create DOM content for project, 
        // update sidebar display, store main DOM content in array
        const projectDOM = ProjectDOM(name.value, idGen);
        ProjectListDOM.add(projectDOM);
        projectDOM.sidebarDisplay();

        // Update storage.
        populateStorage();

        // Increment ID generator.
        incrementIdGen(1);

        // Update 'My Projects' display if open.
        refreshDisplay();
    }

    function setupProjectEditModal(id, name)
    {
        const projectEditModal = document.querySelector(".edit-project-modal");
        // Id will be utilised in editor function to identify project.
        projectEditModal.id = id;
        // Setup edit modal input field with initial value.
        projectEditModal.querySelector("#project-name").value = name;
        // Display project edit modal.
        projectEditModal.showModal();
    }

    return { 
        projectConstructor, 
        projectEditor, 
        projectDestructor,
        setupProjectEditModal 
    };
}();

// Initialize and attach event listener to Inbox.
function inboxSetup()
{
    // Application-side
    const inbox = Project("Inbox", 0);
    ProjectList.add(inbox);

    // DOM-side
    const inboxDOM = ProjectDOM("Inbox", 0);
    ProjectListDOM.add(inboxDOM);

    // Attach event listener to Inbox tab in sidebar.
    const inboxTab = document.querySelector('.tabs .inbox');
    inboxTab.addEventListener('click', () => {
        projectDisplay(inboxDOM);
    });
}

export { TaskControl, ProjectControl, inboxSetup, incrementIdGen };