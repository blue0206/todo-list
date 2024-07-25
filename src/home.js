import { TaskList } from "./object-constructors";

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
    TaskList.list.forEach((task) => {
        taskCardsContainer.appendChild(taskCard(task));
    });

    taskSection.appendChild(taskCardsContainer);
    return taskSection;
}

function taskCard(task)
{
    // Task card container.
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.id = task.id;

    // Task card sideline.
    const sideline = document.createElement('div');
    sideline.classList.add(`${task.priority.toLowerCase()}`, 'sideline');
    taskCard.appendChild(sideline);

    // Task card content.
    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    // Task Name
    const taskName = document.createElement('h3');
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
    taskDueDate.textContent = `Due Date: ${task.dueDate}`;
    cardContent.appendChild(taskDueDate);

    // Task card buttons container.
    const btns = document.createElement('div');
    btns.classList.add('card-btns');

    // Mark Complete button.
    const markCompleteBtn = document.createElement('button');
    markCompleteBtn.classList.add('card-mark-btn');
    const markCompleteIcon = new Image();
    markCompleteIcon.src = "";
    markCompleteIcon.alt = "Mark Complete";
    markCompleteBtn.appendChild(markCompleteIcon);

    // Edit button.
    const editBtn = document.createElement('button');
    editBtn.classList.add('card-edit-btn');
    const editIcon = new Image();
    editIcon.src = "";
    editIcon.alt = "Edit Task";
    editBtn.appendChild(editIcon);

    // Delete button.
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('card-delete-btn');
    const deleteIcon = new Image();
    deleteIcon.src = "";
    deleteIcon.alt = "Delete Task";
    deleteBtn.appendChild(deleteIcon);

    // Append buttons to container.
    btns.appendChild(markCompleteBtn);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);

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
    projectListContainer.classList.add('home-project-list');
    ProjectListDOM.list.forEach((project) => {
        // Append project item DOM content.
        projectListContainer.appendChild(generateProjectContent(project));
        // Generate outline container for styling purposes and append.
        const outline = document.createElement('div');
        outline.classList.add('outline');
        projectListContainer.appendChild(outline);
    });
    projectSection.appendChild(projectListContainer);

    return projectSection;
}

function generateProjectContent(project)
{
    const projectContainer = document.createElement('button');
    projectContainer.classList.add('home-project-item');
    projectContainer.id = project.id;

    // Project Heading
    const heading = document.createElement('h3');
    heading.textContent = project.name;
    projectContainer.appendChild(heading);

    // Project tasks (set word limit as well.)
    const projectTasks = document.createElement('div');
    // Set word limit to text content.
    for (let i=0; i<project.tasks.length && projectTasks.textContent.length <= 85; i++)
    {
        projectTasks.textContent += project.tasks[i].name + ", ";
    }
    projectTasks.textContent += "...";
    projectContainer.appendChild(projectTasks)

    return projectContainer;
}