const Validation = function() {
    function validateTask(validateEdit=false)
    {
        let taskModal = null;
        if (validateEdit)
        {
            taskModal = document.querySelector('.edit-task-modal');
        }
        else
        {
            taskModal = document.querySelector('.add-task-modal');
        }
    
        // Validate task name.
        let taskNameValidity = false;
        const taskName = taskModal.querySelector('#task-name');
        taskNameValidity =
          taskName.value.length > 0 ? true : false;
        
        // Validate task description.
        let taskDescriptionValidity = false;
        const taskDescription = taskModal.querySelector('#description');
        taskDescriptionValidity = taskDescription.value.length > 0 ? true : false;
    
        return (taskNameValidity && taskDescriptionValidity);
    }
    
    function validateProject(validateEdit=false)
    {
        let projectModal = null;
        if (validateEdit)
        {
            projectModal = document.querySelector('.edit-project-modal');
        }
        else
        {
            projectModal = document.querySelector('.add-project-modal');
        }
    
        // Validate Project Name
        const projectName = projectModal.querySelector('#project-name');
        return (projectName.value.length > 0);
    }
    
    function addTaskValidation()
    {
        const submitBtn = document.querySelector('.add-task-modal .submit-task');
        submitBtn.addEventListener('mousemove', () => {
            if (validateTask())
            {
                submitBtn.removeAttribute('disabled');
            }
            else
            {
                submitBtn.setAttribute('disabled', true);
            }
        });
    }
    
    function editTaskValidation()
    {
        const submitBtn = document.querySelector('.edit-task-modal .modify-btn');
        submitBtn.addEventListener('mousemove', () => {
            if (validateTask(true))
            {
                submitBtn.removeAttribute('disabled');
            }
            else
            {
                submitBtn.setAttribute('disabled', true);
            }
        });
    }
    
    function addProjectValidation()
    {
        const submitBtn = document.querySelector('.add-project-modal .submit-project');
        submitBtn.addEventListener('mousemove', () => {
            if (validateProject())
            {
                submitBtn.removeAttribute('disabled');
            }
            else
            {
                submitBtn.setAttribute('disabled', true);
            }
        });
    }
    
    function editProjectValidation()
    {
        const submitBtn = document.querySelector('.edit-project-modal .modify-btn');
        submitBtn.addEventListener('mousemove', () => {
            if (validateProject(true))
            {
                submitBtn.removeAttribute('disabled');
            }
            else
            {
                submitBtn.setAttribute('disabled', true);
            }
        });
    }

    return {
        addTaskValidation,
        editTaskValidation,
        addProjectValidation,
        editProjectValidation
    };
}();


export { Validation };