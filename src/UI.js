import { TodoList } from "./TodoList";
import { Storage } from "./Storage";

const UI = (() => {
    const projectTasks = document.querySelector(".js-project-tasks");
    const projectList = document.querySelector(".js-project-list");
    const projectTitle = document.querySelector(".js-project-title");
    let selectedProject;

    const init = () => {
        selectedProject = "Default";
        initializeTodo();
        setListButton();
        setTaskForm();
        listProjects();
        listTasks();
        setProjectForm();
    };

    const initializeTodo = () =>{
        TodoList.init();
        let data = Storage.loadData();
        if(data === null)
            return;
            
        for(let project of data){
            TodoList.addProject(project.name);
            let tasks = project.tasks;
            let p = TodoList.getProject(project.name);
            for(let task of tasks){
                p.addTask(task.title, task.date, task.checked);
            }
        }
    };

    const setListButton = () => {
        const listBtn = document.querySelector("#js-project-list-button");
        const sidebar = document.querySelector('.sidebar');
        const projectBody = document.querySelector('.project-body');
        listBtn.addEventListener('click', () => {
            if(sidebar.style.display === "none"){
                sidebar.style.display = "block";
                projectBody.style.display = "none";
            }
            else{
                sidebar.style.display = "none";
                projectBody.style.display = "flex";
            }
        });
    };
    const setProjectForm = () => {
        const initProject = document.querySelector("#js-init-project");
        const projectForm = document.querySelector(".js-project-form");
        initProject.style.display = "block";
        projectForm.style.display = "none";

        initProject.addEventListener('click', () => {
            initProject.style.display = "none";
            projectForm.style.display = "flex";
        });

        const cancelBtn = document.querySelector("#js-project-form-cancel");
        cancelBtn.addEventListener('click', () => {
            clearProjectForm();
            initProject.style.display = "block";
            projectForm.style.display = "none";
        });

        const confirmBtn = document.querySelector("#js-project-form-confirm");
        confirmBtn.addEventListener('click', () => {
            const pTitle = document.querySelector("#js-project-form-title");
            if(pTitle.value.trim() !== ""){
                onProjectSubmit();
                initProject.style.display = "block";
                projectForm.style.display = "none";
            }
        });
    };
    const createProjectItem = (name) => {
        let li = document.createElement("li");
        let title = document.createElement("span");
        title.classList.add("js-project-item-title");
        title.innerText = name;
        li.appendChild(title);

        if(name !== "Default"){
            let del = document.createElement("button");
            del.classList.add('js-project-delete-button');
            del.addEventListener('click', (e) => {removeProjectItem(e)});
            del.style.display = "none";
            li.addEventListener('mouseenter', (e) => {
                e.currentTarget.querySelector(".js-project-delete-button").style.display = "block";
            });
            li.addEventListener('mouseleave', (e) => {
                e.currentTarget.querySelector(".js-project-delete-button").style.display = "none";
            });
            li.appendChild(del);
        }
        li.addEventListener('click', (e) =>{
            changeProjectSelection(e);
        });
        if(name === selectedProject)
            li.classList.add("project-selected");
        return li;
    };

    const changeProjectSelection = (e) =>{
        if(e.target.nodeName === "BUTTON")
                return;
        let pTitle = e.currentTarget.querySelector(".js-project-item-title").innerText;
        if(pTitle === selectedProject)
            return;
        
        selectedProject = pTitle;
        projectTitle.innerText = pTitle;
        document.querySelector("#js-init-task").style.display = "block";
        listProjects();
        listTasks();
    };

    const removeProjectItem = (e) =>{
        let pTitle = e.target.parentElement.querySelector(".js-project-item-title").innerText;
        TodoList.deleteProject(pTitle);
        Storage.saveData(TodoList.getProjects());
        if(pTitle === selectedProject){
            projectTitle.innerText = "";
            selectedProject = "";
            document.querySelector("#js-init-task").style.display = "none";
            listTasks();
        }
        listProjects();
    };

    const clearProjectForm = () =>{
        const pTitle = document.querySelector("#js-project-form-title");
        pTitle.value = "";
    };

    const onProjectSubmit = () =>{
        const pTitle = document.querySelector("#js-project-form-title");
        if(TodoList.getProject(pTitle.value) === null){
            TodoList.addProject(pTitle.value);
            Storage.saveData(TodoList.getProjects());
        }
        clearProjectForm();
        listProjects();
    };

    const listProjects = () => {
        projectList.innerHTML = '';
        let projects = TodoList.getProjects();
        for(let i = 0; i < projects.length; i++){
            projectList.appendChild(createProjectItem(projects[i].name));
        }
    };

    const createTaskItem = (name, dt, checked) => {
        let li = document.createElement("li");
        let info = document.createElement("div");
        info.classList.add("js-task-info");
        let title = document.createElement("span");
        let date = document.createElement("span");
        
        title.classList.add("js-task-title");
        date.classList.add("js-task-date");
        title.innerText = name;
        date.innerText = "Date: ";
        if(dt.trim() !== "")
            date.innerText += dt;
        else
            date.innerText += "None";

        info.appendChild(title);
        info.appendChild(date);
        li.appendChild(info);

        let del = document.createElement("button");
        del.classList.add("js-task-delete-button");
        del.addEventListener('click', (e) => {removeTaskItem(e)});
        del.style.display = "none";
        li.appendChild(del);

        li.addEventListener('click', (e) => {
            changeTaskCheck(e);
        });
        li.addEventListener('mouseenter', (e) => {
            e.currentTarget.querySelector(".js-task-delete-button").style.display = "block";
        });
        li.addEventListener('mouseleave', (e) => {
            e.currentTarget.querySelector(".js-task-delete-button").style.display = "none";
        });

        if(checked)
            li.classList.add("task-checked");
        return li;
    };

    const changeTaskCheck = (e) =>{
        if(e.target.nodeName === "BUTTON")
                return;
        let check = e.currentTarget.classList.toggle("task-checked");
        let currTitle = e.currentTarget.querySelector(".js-task-title").innerText;
        TodoList.getProject(selectedProject).editTask(currTitle, null, null, check);
        Storage.saveData(TodoList.getProjects());
    };

    const removeTaskItem = (e) => {
        let taskTitle = e.target.parentElement.querySelector(".js-task-title").innerText;
        const project = TodoList.getProject(selectedProject);
        project.removeTask(taskTitle);
        Storage.saveData(TodoList.getProjects());
        listTasks();
    };
    
    const validateTaskForm = () => {
        const taskTitle = document.querySelector("#js-task-form-title");

        if(taskTitle.value.trim() === ""){
            alert("Task title is required");
            return false;
        }
        return true;
    };

    const onTaskSubmit = () =>{
        let taskFormTitle = document.querySelector('#js-task-form-title').value;
        let taskFormDate = document.querySelector("#js-task-form-date").value;
        const project = TodoList.getProject(selectedProject);
        project.addTask(taskFormTitle, taskFormDate, false);
        Storage.saveData(TodoList.getProjects());
        listTasks();
    };

    const setTaskForm = () =>{
        const initTask = document.querySelector("#js-init-task");
        const modal = document.querySelector(".modal");
        initTask.addEventListener('click', () =>{
            modal.style.display = "block";
        });

        window.onclick = (e) =>{
            if(e.target == modal){
                clearTaskForm();
                modal.style.display = "none";
            }
        };

        const submitTask = document.querySelector(".js-task-form");
        submitTask.addEventListener('submit', (e) => {
            e.preventDefault();
            if(validateTaskForm()){
                onTaskSubmit();
                clearTaskForm();
                modal.style.display = "none";
            }
        });
    };

    const clearTaskForm = () =>{
        const taskFormTitle = document.querySelector('#js-task-form-title');
        const taskFormDate = document.querySelector("#js-task-form-date");
        taskFormTitle.value = "";
        taskFormDate.value = "";
    };

    const listTasks = () => {
        projectTasks.innerHTML = "";
        if(selectedProject === "")
            return;
        let tasks = TodoList.getProject(selectedProject).tasks;
        for(let i = 0; i < tasks.length; i++){
            projectTasks.appendChild(createTaskItem(tasks[i].title, tasks[i].date, tasks[i].checked));
        }
    };

    return{
        init,
    };
})();

export {UI};