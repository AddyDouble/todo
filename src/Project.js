import { taskFactory } from "./Task";

const projectFactory = (name) =>{
    let tasks = [];
    const findTask = (taskName) =>{
        return tasks.some((el) => el.title === taskName);
    };
    
    const getTaskIndex = (taskName) =>{
        for(let i = 0; i < tasks.length; i++)
            if(tasks[i].title === taskName)
                return i;
        return -1;
    };

    const removeTask = (taskName) => {
        if(!findTask(taskName)) return;
        tasks.splice(getTaskIndex(taskName), 1);
    }

    const addTask = (name, date, checked) => {
        if(findTask(name)) return;
        tasks.push(taskFactory(name, date, checked));
    }

    const editTask = (oldName, name, date, checked) =>{
        if(!findTask(oldName)) return;
        let i = getTaskIndex(oldName);
        if(name != null)
            tasks[i].title = name;
        if(date != null)
            tasks[i].date = date;
        if(checked != null)
            tasks[i].checked = checked;
    }

    return {name, tasks, addTask, removeTask, editTask};
};

export {projectFactory};