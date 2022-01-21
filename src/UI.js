import { TodoList } from "./TodoList";

const UI = (() => {
    const projectTasks = document.querySelector(".project-tasks");
    const projectList = document.querySelector(".project-list");
    const projectTitle = document.querySelector(".project-title");
    const init = () => {
        TodoList.init();
        listProjects();
        listTasks();
    }
    
    const createProjectItem = (name) => {
        let li = document.createElement("li");
        li.innerText = name;
        return li;
    };

    const createTaskItem = (name) => {
        let li = document.createElement("li");
        li.innerText = name;
        return li;
    };
    const listProjects = () => {
        projectList.innerHTML = '';
        let projects = TodoList.getProjects();
        for(let i = 0; i < projects.length; i++){
            projectList.appendChild(createProjectItem(projects[i].name));
        }
    }

    const listTasks = () => {
        projectTasks.innerHTML = "";
        let tasks = TodoList.getProject(projectTitle.innerText).tasks;
        
        for(let i = 0; i < tasks.length; i++){
            projectTasks.appendChild(createTaskItem(tasks[i].name));
        }
        
    };
    return{
        init,
    };
})();

export {UI};