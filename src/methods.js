const listMethods = (list) => {
    const add = (item) => list.push(item);

    const remove = (itemID) => {
        binarySearch(itemID, false);
    };

	const search = (itemID) => {
		return binarySearch(itemID);
	};

    const binarySearch = (target, search=true) => {
        let start = 0;
        let end = list.length - 1;
        let mid = Math.floor(start + (end-start)/2);

        while (start <= end)
        {
            if (list[mid].id == target)
            {
                if (search)
                {
                    return list[mid];
                }
                list.splice(mid, 1);
                break;
            }
            else if (list[mid].id < target)
            {
                start = mid + 1;
            }
            else
            {
                end = mid - 1;
            }
            mid = Math.floor(start + (end-start)/2);
        }
    };

    return { add, remove, search };
};

const dropDownListMethods = (selectElement) => {
	const generate = (list) => {
		list.forEach((item) => {
		const option = document.createElement("option");
		option.value = item.id;
		option.textContent = item.name;
		selectElement.appendChild(option);
		});
	};

	const remove = () => {
		const options = selectElement.querySelectorAll('option');
		options.forEach((option) => {
			selectElement.removeChild(option);
		});
	};
    
	return { generate, remove };
};

const displayControl = function() {
    const updateParentProjectDisplay = (parentProject, task) => {
        const main = document.querySelector('main');
        // Check if the project is being displayed.
        if (main.lastChild.id == parentProject.id)
        {
            const taskList = main.lastChild.querySelector('.project-task-list');
            const insertBeforeNode = taskList.lastChild;
            updateProjectTaskList(taskList, task, insertBeforeNode);
        }
    };

    const updateProjectTaskList = (taskList, task, insertBeforeNode=null) => {
        const taskContainer = document.createElement("li");
        taskContainer.classList.add("project-task");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        taskContainer.appendChild(checkBox);

        const taskBody = document.createElement("div");
        taskBody.classList.add('task');
        taskBody.id = task.id;
        const taskName = document.createElement("div");
        taskName.textContent = task.name;
        taskBody.appendChild(taskName);

        const taskDescription = document.createElement("div");
        taskDescription.textContent = task.description;
        taskBody.appendChild(taskDescription);

        taskContainer.appendChild(taskBody);
        // If project already exists, then task needs to be inserted before the "Add Task" button
        if (insertBeforeNode)   
        {
            taskList.insertBefore(taskContainer, insertBeforeNode)
        }
        else    // This case is used when the project DOM object method to show display is called
        {
            taskList.appendChild(taskContainer);
        }
    }

    return { updateParentProjectDisplay, updateProjectTaskList };
}();

export { listMethods, dropDownListMethods, displayControl };