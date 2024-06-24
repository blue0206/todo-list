import { Task, taskList } from "./object-constructors.js";

const taskDisplayModal = document.querySelector('.task-modal');
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    taskDisplayModal.close();
});

// Task Constructor
let idGen = 0;
function taskConstructor()
{
    const taskModal = document.querySelector('.add-task-modal');
    const taskModalBtns = Array.from(document.querySelectorAll('.add-task'));
    taskModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            taskModal.showModal();
        });
    });
    
    const taskAddBtn = document.querySelector('.submit-task');
    taskAddBtn.addEventListener('click', () => {
        const name = taskModal.querySelector('#task-name').value;
        const description = taskModal.querySelector('#description').value;

        const task = new Task(name, description, idGen);
        taskList.push(task);
        console.log(task);

        taskDisplayModal.querySelector('.task-name').textContent = name;
        taskDisplayModal.querySelector('.task-description').textContent = description;
        taskDisplayModal.showModal();
        
        idGen++;
        taskModal.close();
    });
};

export { taskConstructor };