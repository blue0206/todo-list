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
        const name = taskModal.querySelector('#task-name');
        const description = taskModal.querySelector('#description');

        const task = new Task(name, description, idGen);
        taskList.push(task);
        console.log(task);

        taskDisplayModal.querySelector('.task-name').textContent = name.value;
        taskDisplayModal.querySelector('.task-description').textContent = description.value;
        taskDisplayModal.showModal();
        
        idGen++;
        name.value = "";
        description.value = "";
        taskModal.close();
    });
};

export { taskConstructor };