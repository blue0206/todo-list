import "./style.css";
import { Validation } from "./validation.js";
import { TaskControl, ProjectControl, inboxSetup } from "./constructor.js";
import { myProjectsTab, homeTab } from "./display.js";
import home from "./home.js";
import sidebar from "./sidebar.js";
import { storageAvailable, getData, storageSetup } from "./local-storage.js";


// Generate Sidebar DOM.
sidebar();

// TASK SECTION
// Setup event listener for validating task being added.
Validation.addTaskValidation();
// Setup event listener to construct task upon input by user.
TaskControl.taskConstructor();
// Setup event listener for validating task being edited.
Validation.editTaskValidation();
// Setup event listener to handle task edit upon user input.
TaskControl.taskEditor();
// Setup event listener to delete tasks.
TaskControl.taskDestructor();

// PROJECT SECTION
// Setup event listener for validating project being added.
Validation.addProjectValidation();
// Setup event listener to create new project upon user input.
ProjectControl.projectConstructor();
// Setup event listener for validating project being edited.
Validation.editProjectValidation();
// Setup event listener to edit an existing project upon user input.
ProjectControl.projectEditor();

// TABS
// Generate DOM content for the Inbox tab.
inboxSetup();
// Generate DOM content for the "My Projects" tabs.
myProjectsTab();
// Setup event listener for the home tab button on sidebar.
homeTab();
// Generate DOM content for the Home tab.
home();

// STORAGE
if (storageAvailable("localStorage"))
{
    if (!localStorage.getItem("taskList") && !localStorage.getItem("projectList"))
    {
        storageSetup();
    }
    else
    {
        // localStorage.clear();
        getData();
    }
}