(()=>{"use strict";const e=(()=>{let e=[];const t=t=>{e.some((e=>e.name===t))},n=n=>{t(n)||e.push((e=>{let t=[];const n=e=>t.some((t=>t.title===e));return{name:e,tasks:t,addTask:(e,r)=>{n(e)||t.push(((e,t)=>({title:e,date:t}))(e,r))},removeTask:e=>{n(e)&&t.splice((e=>{for(let n=0;n<t.length;n++)if(t[n].title===e)return n;return-1})(e),1)}}})(n))};return{init:()=>{n("Default")},addProject:n,deleteProject:n=>{t(n)&&(e=e.filter((e=>e.name!==n)))},getProjects:()=>e,getProject:t=>{for(let n=0;n<e.length;n++)if(e[n].name===t)return e[n]}}})();(()=>{const t=document.querySelector(".project-tasks"),n=document.querySelector(".project-list"),r=document.querySelector(".project-title"),l=e=>{let t=document.createElement("li");return t.innerText=e,t},o=(e,t)=>{let n=document.createElement("li"),r=document.createElement("div");r.classList.add("task-info");let l=document.createElement("span"),o=document.createElement("span");l.classList.add("task-title"),l.innerText=e,""!==t.trim()?o.innerText=t:o.innerText="None",r.appendChild(l),r.appendChild(o),n.appendChild(r);let c=document.createElement("button");return c.classList.add("task-delete-btn"),c.addEventListener("click",(e=>{a(e)})),n.appendChild(c),n},a=t=>{let n=t.target.parentElement.querySelector(".task-title").innerText;e.getProject(r.innerText).removeTask(n),i()},c=()=>{const e=document.querySelector("#taskFormTitle"),t=document.querySelector("#taskFormDate");e.value="",t.value=""},i=()=>{t.innerHTML="";let n=e.getProject(r.innerText).tasks;for(let e=0;e<n.length;e++)t.appendChild(o(n[e].title,n[e].date))};return{init:()=>{e.init(),(()=>{const t=document.querySelector("#initTask"),n=document.querySelector(".modal");t.addEventListener("click",(()=>{n.style.display="block"})),window.onclick=e=>{e.target==n&&(c(),n.style.display="none")},document.querySelector(".task-form").addEventListener("submit",(t=>{t.preventDefault(),(()=>{const e=document.querySelector("#taskFormTitle");return document.querySelector("#taskFormDate").value,""!==e.value.trim()||(alert("Task title is required"),!1)})()&&((()=>{let t=document.querySelector("#taskFormTitle").value,n=document.querySelector("#taskFormDate").value;e.getProject(r.innerText).addTask(t,n),i()})(),c(),n.style.display="none")}))})(),(()=>{n.innerHTML="";let t=e.getProjects();for(let e=0;e<t.length;e++)n.appendChild(l(t[e].name))})(),i()}}})().init()})();