export default function content()
{
    const main = document.querySelector('main');
    if (main.lastChild)
    {
        main.removeChild(main.lastChild);
    }

    const home = document.createElement('div');
    home.classList.add('home');    
}