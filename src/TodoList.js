import { projectFactory } from "./project";

const TodoList = (() => {
    let projects = [];

    const init = () => {
        addProject("Default");
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

    return {
        init, 
        addProject, 
        deleteProject, 
        getProjects,
    };
})();

export {TodoList};