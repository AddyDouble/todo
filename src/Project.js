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

    const addTask = (name, date) => {
        if(findTask(name)) return;
        tasks.push(taskFactory(name, date));
    }

    return {name, tasks, addTask, removeTask};
};

export {projectFactory};