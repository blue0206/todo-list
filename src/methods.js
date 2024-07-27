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

        return false;
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

function sidebarProjectsClickDispatch(projectID)
{
    const projectNodes = Array.from(document.querySelectorAll('.project-tabs .project-li'));
    listMethods(projectNodes).search(projectID).dispatchEvent(new MouseEvent('click'));
}

export { listMethods, dropDownListMethods, sidebarProjectsClickDispatch };