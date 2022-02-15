(()=>{"use strict";const e=(()=>{const e=e=>{let t;try{t=window[e];let r="__storage_test__";return t.setItem(r,r),t.removeItem(r),!0}catch(e){return e instanceof DOMException&&(22===e.code||1014===e.code||"QuotaExceededError"===e.name||"NS_ERROR_DOM_QUOTA_REACHED"===e.name)&&t&&0!==t.length}};return{saveData:t=>{e("localStorage")&&localStorage.setItem("todoList",JSON.stringify(t))},loadData:()=>{if(e("localStorage")&&localStorage.getItem("todoList"))return JSON.parse(localStorage.getItem("todoList"))}}})(),t=(()=>{let e=[];const t=t=>e.some((e=>e.name===t)),r=r=>{t(r)||e.push((e=>{let t=[];const r=e=>t.some((t=>t.title===e)),l=e=>{for(let r=0;r<t.length;r++)if(t[r].title===e)return r;return-1};return{name:e,tasks:t,addTask:(e,l,n)=>{r(e)||t.push(((e,t,r)=>({title:e,date:t,checked:r}))(e,l,n))},removeTask:e=>{r(e)&&t.splice(l(e),1)},editTask:(e,n,s,o)=>{if(!r(e))return;let a=l(e);null!=n&&(t[a].title=n),null!=s&&(t[a].date=s),null!=o&&(t[a].checked=o)}}})(r))};return{init:()=>{r("Default")},addProject:r,deleteProject:r=>{t(r)&&(e=e.filter((e=>e.name!==r)))},getProjects:()=>e,getProject:t=>{for(let r=0;r<e.length;r++)if(e[r].name===t)return e[r];return null}}})();(()=>{const r=document.querySelector(".js-project-tasks"),l=document.querySelector(".js-project-list"),n=document.querySelector(".js-project-title");let s;const o=e=>{let t=document.createElement("li"),r=document.createElement("span");if(r.classList.add("js-project-item-title"),r.innerText=e,t.appendChild(r),"Default"!==e){let e=document.createElement("button");e.classList.add("js-project-delete-button"),e.addEventListener("click",(e=>{c(e)})),e.style.display="none",t.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector(".js-project-delete-button").style.display="block"})),t.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector(".js-project-delete-button").style.display="none"})),t.appendChild(e)}return t.addEventListener("click",(e=>{a(e)})),e===s&&t.classList.add("project-selected"),t},a=e=>{if("BUTTON"===e.target.nodeName)return;let t=e.currentTarget.querySelector(".js-project-item-title").innerText;t!==s&&(s=t,n.innerText=t,document.querySelector("#js-init-task").style.display="block",u(),k())},c=r=>{let l=r.target.parentElement.querySelector(".js-project-item-title").innerText;t.deleteProject(l),e.saveData(t.getProjects()),l===s&&(n.innerText="",s="",document.querySelector("#js-init-task").style.display="none",k()),u()},d=()=>{document.querySelector("#js-project-form-title").value=""},i=()=>{const r=document.querySelector("#js-project-form-title");null===t.getProject(r.value)&&(t.addProject(r.value),e.saveData(t.getProjects())),d(),u()},u=()=>{l.innerHTML="";let e=t.getProjects();for(let t=0;t<e.length;t++)l.appendChild(o(e[t].name))},m=(e,t,r)=>{let l=document.createElement("li"),n=document.createElement("div");n.classList.add("js-task-info");let s=document.createElement("span"),o=document.createElement("span");s.classList.add("js-task-title"),o.classList.add("js-task-date"),s.innerText=e,o.innerText="Date: ",""!==t.trim()?o.innerText+=t:o.innerText+="None",n.appendChild(s),n.appendChild(o),l.appendChild(n);let a=document.createElement("button");return a.classList.add("js-task-delete-button"),a.addEventListener("click",(e=>{j(e)})),a.style.display="none",l.appendChild(a),l.addEventListener("click",(e=>{y(e)})),l.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector(".js-task-delete-button").style.display="block"})),l.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector(".js-task-delete-button").style.display="none"})),r&&l.classList.add("task-checked"),l},y=r=>{if("BUTTON"===r.target.nodeName)return;let l=r.currentTarget.classList.toggle("task-checked"),n=r.currentTarget.querySelector(".js-task-title").innerText;t.getProject(s).editTask(n,null,null,l),e.saveData(t.getProjects())},j=r=>{let l=r.target.parentElement.querySelector(".js-task-title").innerText;t.getProject(s).removeTask(l),e.saveData(t.getProjects()),k()},p=()=>{const e=document.querySelector("#js-task-form-title"),t=document.querySelector("#js-task-form-date");e.value="",t.value=""},k=()=>{if(r.innerHTML="",""===s)return;let e=t.getProject(s).tasks;for(let t=0;t<e.length;t++)r.appendChild(m(e[t].title,e[t].date,e[t].checked))};return{init:()=>{s="Default",(()=>{t.init();let r=e.loadData();for(let e of r){t.addProject(e.name);let r=e.tasks,l=t.getProject(e.name);for(let e of r)l.addTask(e.title,e.date,e.checked)}})(),(()=>{const e=document.querySelector("#js-project-list-button"),t=document.querySelector(".sidebar"),r=document.querySelector(".project-body");e.addEventListener("click",(()=>{"none"===t.style.display?(t.style.display="block",r.style.display="none"):(t.style.display="none",r.style.display="flex")}))})(),(()=>{const r=document.querySelector("#js-init-task"),l=document.querySelector(".modal");r.addEventListener("click",(()=>{l.style.display="block"})),window.onclick=e=>{e.target==l&&(p(),l.style.display="none")},document.querySelector(".js-task-form").addEventListener("submit",(r=>{r.preventDefault(),(""!==document.querySelector("#js-task-form-title").value.trim()||(alert("Task title is required"),0))&&((()=>{let r=document.querySelector("#js-task-form-title").value,l=document.querySelector("#js-task-form-date").value;t.getProject(s).addTask(r,l,!1),e.saveData(t.getProjects()),k()})(),p(),l.style.display="none")}))})(),u(),k(),(()=>{const e=document.querySelector("#js-init-project"),t=document.querySelector(".js-project-form");e.style.display="block",t.style.display="none",e.addEventListener("click",(()=>{e.style.display="none",t.style.display="flex"})),document.querySelector("#js-project-form-cancel").addEventListener("click",(()=>{d(),e.style.display="block",t.style.display="none"})),document.querySelector("#js-project-form-confirm").addEventListener("click",(()=>{""!==document.querySelector("#js-project-form-title").value.trim()&&(i(),e.style.display="block",t.style.display="none")}))})()}}})().init()})();