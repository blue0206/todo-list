import DashboardIcon from "./assets/icons/dashboard.svg";
import AddIconCircle from "./assets/icons/add_circle_25dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
import HomeIcon from "./assets/icons/home.svg";
import InboxIcon from "./assets/icons/inbox_25dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

export default function content() {
    const sidebar = document.querySelector('aside');

    // HEADING SECTION

    // Dashboard container
    const headingContainer = document.createElement('div');
    headingContainer.classList.add('heading');

    // Dashboard icon
    const dashboardImg = new Image();
    dashboardImg.src = DashboardIcon;
    dashboardImg.alt = "Dashboard";
    headingContainer.appendChild(dashboardImg);
    
    // Dashboard heading
    const heading = document.createElement('h1');
    heading.textContent = "Dashboard";
    headingContainer.appendChild(heading);

    sidebar.appendChild(headingContainer);

    // TABS SECTION

    const tabsNav = document.createElement('nav');
    tabsNav.classList.add('tabs');

    // Add task button
    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('add-task');

    // Add task icon
    const addTaskIcon = new Image();
    addTaskIcon.src = AddIconCircle;
    addTaskIcon.alt = "Add Task";
    addTaskBtn.appendChild(addTaskIcon);

    // Add task button text
    const addTask = document.createElement('div');
    addTask.textContent = "Add Task";
    addTaskBtn.appendChild(addTask);

    tabsNav.appendChild(addTaskBtn);

    // Home button
    const homeBtn = document.createElement('button');
    homeBtn.classList.add('home');

    // Home icon
    const homeIcon = new Image();
    homeIcon.src = HomeIcon;
    homeIcon.alt = "Home";
    homeBtn.appendChild(homeIcon);

    // Home button text
    const home = document.createElement('div');
    home.textContent = "Home";
    homeBtn.appendChild(home);

    tabsNav.appendChild(homeBtn);

    // Inbox button
    const inboxBtn = document.createElement('button');
    inboxBtn.classList.add('inbox');

    // Inbox icon
    const inboxIcon = new Image();
    inboxIcon.src = InboxIcon;
    inboxIcon.alt = "Inbox";
    inboxBtn.appendChild(inboxIcon);

    // Inbox button text
    const inbox = document.createElement('div');
    inbox.textContent = "Inbox";
    inboxBtn.appendChild(inbox);

    tabsNav.appendChild(inboxBtn);
    sidebar.appendChild(tabsNav);

    // PROJECT TABS SECTION

    const projectsTabsNav = document.createElement('nav');
    projectsTabsNav.classList.add('project-tabs');

    // My Projects button
    const myProjects = document.createElement('button');
    myProjects.classList.add('my-projects');
    myProjects.textContent = "My Projects";
    projectsTabsNav.appendChild(myProjects);

    // Add Project button
    const addProjectBtn = document.createElement('button');
    addProjectBtn.classList.add('add-project');

    // Add Project icon
    const addProjectIcon = new Image();
    addProjectIcon.src = AddIconCircle;
    addProjectIcon.alt = "Add Project";
    addProjectBtn.appendChild(addProjectIcon);

    // Add Project button text
    const addProject = document.createElement('div');
    addProject.textContent = "Add Project";
    addProjectBtn.appendChild(addProject);

    projectsTabsNav.appendChild(addProjectBtn);
    sidebar.appendChild(projectsTabsNav);
}