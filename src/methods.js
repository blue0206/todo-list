const listMethods = (list) => {
    const add = (item) => list.push(item);

    const remove = (item) => {
        let start = 0;
        let end = list.length - 1;
        let mid = Math.floor(start + (end-start)/2);

        while (start <= end)
        {
            if (list[mid].id == item.id)
            {
                list.splice(mid, 1);
                break;
            }
            else if (list[mid].id < item.id)
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

    return { add, remove };
};

export { listMethods };