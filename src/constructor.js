import { Task, taskList } from "./object-constructors.js";
import { format } from "date-fns";

const taskDisplayModal = document.querySelector('.task-modal');
const closeBtn = document.querySelector('.close-btn');
closeBtn.addEventListener('click', () => {
    taskDisplayModal.close();
});

// Task Constructor
let taskIDGen = 0;
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
        const priority = taskModal.querySelector('#priority');

        // Create task object instance and push into array
        const task = new Task(
            name.value, 
            description.value, 
            dueDate.value, 
            priority.value, 
            taskIDGen
        );
        taskList.push(task);
        console.log(task);

        // Display the task after updating it
        taskDisplayModal.querySelector('.task-name').textContent = name.value;
        taskDisplayModal.querySelector('.task-description').textContent = description.value;
        taskDisplayModal.querySelector('.date').textContent = dueDate.value;
        taskDisplayModal.querySelector('.priority').textContent = priority.value;
        taskDisplayModal.showModal();
        
        // Increment the unique ID generator variable
        taskIDGen++;

        // Clear modal form element input fields
        name.value = "";
        description.value = "";
        dueDate.value = "";
        priority.value = "Medium";
        taskModal.close();
    });
};

export { taskConstructor };