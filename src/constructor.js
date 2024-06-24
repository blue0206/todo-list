import { Task, taskList } from "./object-constructors.js";
import { TaskDOM, taskListDOM } from "./dom-object-constructors.js";

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
        const taskDOM = new TaskDOM(name, description, idGen);
        taskListDOM.push(taskDOM);
        console.log(task, taskDOM);
        
        idGen++;
        taskModal.close();
    });
};

export { taskConstructor };