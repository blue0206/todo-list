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
        
    });

    taskSection.appendChild(taskCardsContainer);
    return taskSection;
}