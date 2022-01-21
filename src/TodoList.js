import { projectFactory } from "./project";

const TodoList = (() => {
    let projects = [];

    const init = () => {
        addProject("Default");
        projects[0].addTask("Task1");
    };

    const findProject = (projectName) =>{
        projects.some((el) => el.name === projectName);
    };

    const addProject = (projectName) =>{
        if(findProject(projectName)) return;
        projects.push(projectFactory(projectName));
    };

    const deleteProject = (projectName) => {
        if(!findProject(projectName)) return;

        projects = projects.filter((el) => el.name !== projectName);
    };

    const getProjects = () => {return projects};

    const getProject = (projectName) => {
        let i = 0;
        for(; i < projects.length; i++)
            if(projects[i].name === projectName)
                return projects[i];
    };

    return {
        init, 
        addProject, 
        deleteProject, 
        getProjects,
        getProject,
    };
})();

export {TodoList};