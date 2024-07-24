export default function content()
{
    const main = document.querySelector('main');
    if (main.lastChild)
    {
        main.removeChild(main.lastChild);
    }

    const home = document.createElement('div');
    home.classList.add('home');

    // Append header content.
    home.appendChild(headerContent());

    
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