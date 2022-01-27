import { TodoList } from "./TodoList";

const UI = (() => {
    const projectTasks = document.querySelector(".project-tasks");
    const projectList = document.querySelector(".project-list");
    const projectTitle = document.querySelector(".project-title");
    const init = () => {
        TodoList.init();
        setTaskForm();
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

    const onTaskSubmit = () =>{
        const taskTitle = document.querySelector('#taskTitle').value;
        const project = TodoList.getProject(projectTitle.innerText);
        project.addTask(taskTitle);
        listTasks();
    }

    const setTaskForm = () =>{
        const initTask = document.querySelector("#initTask");
        const modal = document.querySelector(".modal");
        initTask.addEventListener('click', () =>{
            modal.style.display = "block";
        });

        window.onclick = (e) =>{
            if(e.target == modal){
                modal.style.display = "none";
            }
        };

        const submitTask = document.querySelector(".task-form");
        submitTask.addEventListener('submit', (e) => {
            e.preventDefault();
            //insert function to check form
            onTaskSubmit();
            modal.style.display = "none";
        });
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