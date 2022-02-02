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
        setProjectForm();
    };
    const setProjectForm = () => {
        const initProject = document.querySelector("#initProject");
        const projectForm = document.querySelector(".projectForm");
        initProject.style.display = "block";
        projectForm.style.display = "none";

        initProject.addEventListener('click', () => {
            initProject.style.display = "none";
            projectForm.style.display = "flex";
        });

        const cancelBtn = document.querySelector("#projectFormCancel");
        cancelBtn.addEventListener('click', () => {
            initProject.style.display = "block";
            projectForm.style.display = "none";
        });

        const confirmBtn = document.querySelector("#projectFormConfirm");
        confirmBtn.addEventListener('click', () => {
            const pTitle = document.querySelector("#projectFormTitle");
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
        title.classList.add("projectItemTitle");
        title.innerText = name;
        li.appendChild(title);

        if(name !== "Default"){
            let del = document.createElement("button");
            del.classList.add('projectDeleteBtn');
            del.addEventListener('click', (e) => {removeProjectItem(e)});
            del.innerText = "Del";
            li.appendChild(del);
        }
        return li;
    };

    const removeProjectItem = (e) =>{
        let projectTitle = e.target.parentElement.querySelector(".projectItemTitle").innerText;
        TodoList.deleteProject(projectTitle);
        listProjects();
    };

    const clearProjectForm = () =>{
        const pTitle = document.querySelector("#projectFormTitle");
        pTitle.value = "";
    };

    const onProjectSubmit = () =>{
        const pTitle = document.querySelector("#projectFormTitle");
        if(TodoList.getProject(pTitle.value) === null)
            TodoList.addProject(pTitle.value);
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

    const createTaskItem = (name, dt) => {
        let li = document.createElement("li");
        
        let info = document.createElement("div");
        info.classList.add("task-info");
        let title = document.createElement("span");
        let date = document.createElement("span");

        title.classList.add("task-title");

        title.innerText = name;
        if(dt.trim() !== "")
            date.innerText = dt;
        else
            date.innerText = "None";

        info.appendChild(title);
        info.appendChild(date);
        li.appendChild(info);

        let del = document.createElement("button");
        del.classList.add("taskDeleteBtn");
        del.addEventListener('click', (e) => {removeTaskItem(e)});
        li.appendChild(del);
        return li;
    };

    const removeTaskItem = (e) => {
        let taskTitle = e.target.parentElement.querySelector(".task-title").innerText;
        const project = TodoList.getProject(projectTitle.innerText);
        project.removeTask(taskTitle);
        listTasks();
    };
    
    const validateTaskForm = () => {
        const taskTitle = document.querySelector("#taskFormTitle");

        if(taskTitle.value.trim() === ""){
            alert("Task title is required");
            return false;
        }
        return true;
    };

    const onTaskSubmit = () =>{
        let taskFormTitle = document.querySelector('#taskFormTitle').value;
        let taskFormDate = document.querySelector("#taskFormDate").value;
        const project = TodoList.getProject(projectTitle.innerText);
        project.addTask(taskFormTitle, taskFormDate);
        listTasks();
    };

    const setTaskForm = () =>{
        const initTask = document.querySelector("#initTask");
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

        const submitTask = document.querySelector(".task-form");
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
        const taskFormTitle = document.querySelector('#taskFormTitle');
        const taskFormDate = document.querySelector("#taskFormDate");
        taskFormTitle.value = "";
        taskFormDate.value = "";
    };

    const listTasks = () => {
        projectTasks.innerHTML = "";
        let tasks = TodoList.getProject(projectTitle.innerText).tasks;
        for(let i = 0; i < tasks.length; i++){
            projectTasks.appendChild(createTaskItem(tasks[i].title, tasks[i].date));
        }
    };

    return{
        init,
    };
})();

export {UI};