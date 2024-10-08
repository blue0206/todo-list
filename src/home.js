import { TaskList } from "./object-constructors";
import { ProjectListDOM } from "./dom-object-constructors";
import { refreshDisplay, TaskDisplayControl } from "./display";
import { TaskControl } from "./constructor";
import { sidebarProjectsClickDispatch } from "./methods";
import { format } from "date-fns";
import MarkCompleteIcon from "./assets/icons/check-circle-fill0.svg";
import EditIcon from "./assets/icons/edit-fill0.svg";
import DeleteIcon from "./assets/icons/delete-fill0.svg";
import OpenIcon from "./assets/icons/open-fill0.svg";
import { populateStorage } from "./local-storage";


export default function content()
{
    const main = document.querySelector('main');
    if (main.lastChild)
    {
        main.removeChild(main.lastChild);
    }

    const home = document.createElement('div');
    home.classList.add('home');

    // Append header section content.
    home.appendChild(headerContent());

    // Append main section content.
    home.appendChild(mainContent());

    main.appendChild(home);
}

function headerContent()
{
    // Header container
    const header = document.createElement('div');
    header.classList.add('home-header');

    const heading = document.createElement('h1');
    heading.textContent = "TO-DO LIST";
    header.appendChild(heading);

    return header;
}

function mainContent()
{
    // Main Content Container
    const mainSection = document.createElement('div');
    mainSection.classList.add('home-main');

    // Append tasks section content.
    mainSection.appendChild(tasks());

    // Append projects section content.
    mainSection.appendChild(projects());

    // Append high priority tasks section content.
    mainSection.appendChild(highPriorityTasks());

    return mainSection;
}

function tasks()
{
    const taskSection = document.createElement('div');
    taskSection.classList.add('home-task');

    // Task section heading.
    const heading = document.createElement('h2');
    heading.classList.add('section-heading');
    heading.textContent = "Your Tasks";
    taskSection.appendChild(heading);

    // Task cards container.
    const taskCardsContainer = document.createElement('div');
    taskCardsContainer.classList.add('task-cards');

    // Create task card.
    let noPendingTasks = true;
    TaskList.list.forEach((task) => {
        // Only display pending tasks.
        if (!task.status)
        {
            taskCardsContainer.appendChild(taskCard(task));
            noPendingTasks = false;
        }
    });
    // Show prompt if no tasks are pending.
    if (noPendingTasks)
    {
        const prompt = document.createElement('div');
        prompt.classList.add('home-prompt');
        prompt.textContent = "No tasks pending!";
        taskCardsContainer.appendChild(prompt);
    }

    taskSection.appendChild(taskCardsContainer);
    return taskSection;
}

function taskCard(task)
{
    // Task card container.
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Task card sideline.
    const sideline = document.createElement('div');
    sideline.classList.add(`${task.priority.toLowerCase()}`, 'sideline');
    taskCard.appendChild(sideline);

    // Task card content.
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    // Task Name
    const taskName = document.createElement('div');
    taskName.classList.add('task-name');
    taskName.textContent = task.name;
    cardContent.appendChild(taskName);

    // Task Description
    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = task.description;
    cardContent.appendChild(taskDescription);

    // Task Due Date
    const taskDueDate = document.createElement('div');
    taskDueDate.classList.add('task-due-date');
    taskDueDate.textContent = `Due Date: ${format(task.dueDate, "do MMMM yyyy")}`;
    cardContent.appendChild(taskDueDate);

    // Task card buttons container.
    const btns = document.createElement('div');
    btns.classList.add('card-btns');

    // Tooltip Element
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');

    // Mark Complete button.
    const markCompleteBtn = document.createElement('button');
    markCompleteBtn.classList.add('card-mark-btn');
    markCompleteBtn.addEventListener('click', () => {
        task.status = true;
        populateStorage();
        refreshDisplay();
    });
    const markCompleteIcon = new Image();
    markCompleteIcon.src = MarkCompleteIcon;
    markCompleteIcon.alt = "Mark Complete";
    markCompleteBtn.appendChild(markCompleteIcon);
    const markCompleteTooltip = tooltip.cloneNode(true);
    markCompleteBtn.appendChild(markCompleteTooltip);

    // Edit button.
    const editBtn = document.createElement('button');
    editBtn.classList.add('card-edit-btn');
    editBtn.addEventListener('click', () => {
        document.querySelector(".edit-task-modal").showModal();
        TaskControl.setupTaskEditFields(task);
    });
    const editIcon = new Image();
    editIcon.src = EditIcon;
    editIcon.alt = "Edit Task";
    editBtn.appendChild(editIcon);
    const editTooltip = tooltip.cloneNode(true);
    editBtn.appendChild(editTooltip);

    // Delete button.
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('card-delete-btn');
    deleteBtn.addEventListener('click', () => {
        TaskControl.deleteTask(task);
    });
    const deleteIcon = new Image();
    deleteIcon.src = DeleteIcon;
    deleteIcon.alt = "Delete Task";
    deleteBtn.appendChild(deleteIcon);
    const deleteTooltip = tooltip.cloneNode(true);
    deleteBtn.appendChild(deleteTooltip);

    // Open button.
    const openBtn = document.createElement('button');
    openBtn.classList.add('card-open-btn');
    openBtn.addEventListener('click', () => {
        TaskDisplayControl.taskDisplay(task);
    });
    const openIcon = new Image();
    openIcon.src = OpenIcon;
    openIcon.alt = "Open Task";
    openBtn.appendChild(openIcon);
    const openTooltip = tooltip.cloneNode(true);
    openBtn.appendChild(openTooltip);

    // Append buttons to container.
    btns.appendChild(markCompleteBtn);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);
    btns.appendChild(openBtn);

    cardContent.appendChild(btns);
    taskCard.appendChild(cardContent);

    return taskCard;
}

function projects()
{
    const projectSection = document.createElement('div');
    projectSection.classList.add('home-project');

    // Project section heading.
    const heading = document.createElement('h2');
    heading.classList.add('section-heading');
    heading.textContent = "Projects";
    projectSection.appendChild(heading);

    // Project list container.
    const projectListContainer = document.createElement('div');
    let activeProjects = false;
    projectListContainer.classList.add('home-project-list');
    ProjectListDOM.list.forEach((project) => {
        if (project.id != 0)  // ID == 0 refers to inbox, which is not a project.
        {
            // Append project item DOM content.
            projectListContainer.appendChild(generateProjectContent(project));
            // Generate outline container for styling purposes and append.
            const outline = document.createElement('div');
            outline.classList.add('outline');
            projectListContainer.appendChild(outline);

            activeProjects = true;
        }
    });
    // Show prompt in case there are no projects.
    if (!activeProjects)
    {
        const prompt = document.createElement('div');
        prompt.classList.add('home-prompt');
        prompt.textContent = "No active projects!";
        projectListContainer.appendChild(prompt);
    }
    projectSection.appendChild(projectListContainer);

    return projectSection;
}

function generateProjectContent(project)
{
    const projectContainer = document.createElement('button');
    projectContainer.classList.add('home-project-item');
    projectContainer.addEventListener('click', () => {
        sidebarProjectsClickDispatch(project.id);
    });

    // Project Heading
    const heading = document.createElement('h3');
    heading.textContent = project.name;
    projectContainer.appendChild(heading);

    // Project Text
    const projectText = document.createElement('div');
    if (project.tasks.length == 0)
    {
        projectText.textContent = `Empty`;
    }
    else if (project.tasks.length == 1)
    {
        projectText.textContent = `1 task`;
    }
    else
    {
        projectText.textContent = `${project.tasks.length} tasks`;
    }
    projectContainer.appendChild(projectText)

    return projectContainer;
}

function highPriorityTasks()
{
    const prioritySection = document.createElement('div');
    prioritySection.classList.add('home-priority-tasks');

    // High priority tasks section heading.
    const heading = document.createElement('h2');
    heading.classList.add('section-heading');
    heading.textContent = "High Priority Tasks";
    prioritySection.appendChild(heading);

    // High priority task list container.
    const highPriorityListContainer = document.createElement('div');
    highPriorityListContainer.classList.add('priority-task-list');
    let noPendingTasks = true;
    // First display MAXIMUM priority tasks.
    TaskList.list.forEach((task) => {
        if (task.priority == "Maximum")
        {
            highPriorityListContainer.appendChild(priorityTaskContent(task));
            // Generate outline container for styling purposes and append.
            const outline = document.createElement('div');
            outline.classList.add('outline');
            highPriorityListContainer.appendChild(outline);

            noPendingTasks = false;
        }
    });
    // Second display HIGH priority tasks.
    TaskList.list.forEach((task) => {
        if (task.priority == "High")
        {
            highPriorityListContainer.appendChild(priorityTaskContent(task));
            // Generate outline container for styling purposes and append.
            const outline = document.createElement('div');
            outline.classList.add('outline');
            highPriorityListContainer.appendChild(outline);

            noPendingTasks = false;
        }
    });
    // Show prompt in case no high-priority tasks are pending.
    if (noPendingTasks)
    {
        const prompt = document.createElement('div');
        prompt.classList.add('home-prompt');
        prompt.textContent = "No high-priority tasks pending!";
        highPriorityListContainer.appendChild(prompt);
    }
    prioritySection.appendChild(highPriorityListContainer);

    return prioritySection;
}

function priorityTaskContent(task)
{
    const container = document.createElement('button');
    container.classList.add('priority-task');
    container.addEventListener('click', () => {
        TaskDisplayControl.taskDisplay(task);
    });

    // Task Heading
    const heading = document.createElement('h3');
    heading.classList.add('priority-task-name');
    heading.textContent = task.name;
    container.appendChild(heading);

    // Task Content
    const taskContent = document.createElement('div');
    taskContent.classList.add('priority-task-content');
    
    const taskPriority = document.createElement('div');
    taskPriority.textContent = `Priority: ${task.priority}`;
    taskContent.appendChild(taskPriority);

    const taskDescription = document.createElement('div');
    taskDescription.textContent = task.description;
    taskContent.appendChild(taskDescription);

    container.appendChild(taskContent);

    return container;
}