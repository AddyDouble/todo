import { taskFactory } from "./Task";

const projectFactory = (name = 'none') =>{
    let tasks = [];
    const findTask = (taskName) =>{
        tasks.some((el) => el.name === taskName);
    };

    const removeTask = (taskName) => {
        if(!findTask(taskName)) return;
        
        tasks = tasks.filter(el => el.name === !taskName);
    }

    const addTask = (name) => {
        if(!findTask(name)) return;
        tasks.push(taskFactory(name));
    }

    return {name, tasks, addTask, removeTask};
};

export {projectFactory};