import { Task, taskList } from "./object-constructors.js";
import { format } from "date-fns";

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
            taskModal.querySelector("#due-date").value = format(new Date(), "yyyy-MM-dd");
        });
    });
    
    const taskAddBtn = document.querySelector('.submit-task');
    taskAddBtn.addEventListener('click', () => {
        const name = taskModal.querySelector('#task-name');
        const description = taskModal.querySelector('#description');
        const dueDate = taskModal.querySelector('#due-date');

        const task = new Task(name.value, description.value, dueDate.value, idGen);
        taskList.push(task);
        console.log(task);

        taskDisplayModal.querySelector('.task-name').textContent = name.value;
        taskDisplayModal.querySelector('.task-description').textContent = description.value;
        taskDisplayModal.querySelector('.date').textContent = dueDate.value;
        taskDisplayModal.showModal();
        
        idGen++;
        name.value = "";
        description.value = "";
        dueDate.value = "";
        taskModal.close();
    });
};

export { taskConstructor };