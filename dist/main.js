(()=>{"use strict";const e=(()=>{let e=[];const t=t=>e.some((e=>e.name===t)),r=r=>{t(r)||e.push((e=>{let t=[];const r=e=>t.some((t=>t.title===e)),l=e=>{for(let r=0;r<t.length;r++)if(t[r].title===e)return r;return-1};return{name:e,tasks:t,addTask:(e,l,n)=>{r(e)||t.push(((e,t,r)=>({title:e,date:t,checked:r}))(e,l,n))},removeTask:e=>{r(e)&&t.splice(l(e),1)},editTask:(e,n,s,c)=>{if(!r(e))return;let o=l(e);null!=n&&(t[o].title=n),null!=s&&(t[o].date=s),null!=c&&(t[o].checked=c)}}})(r))};return{init:()=>{r("Default")},addProject:r,deleteProject:r=>{t(r)&&(e=e.filter((e=>e.name!==r)))},getProjects:()=>e,getProject:t=>{for(let r=0;r<e.length;r++)if(e[r].name===t)return e[r];return null}}})();(()=>{const t=document.querySelector(".js-project-tasks"),r=document.querySelector(".js-project-list"),l=document.querySelector(".js-project-title");let n;const s=e=>{let t=document.createElement("li"),r=document.createElement("span");if(r.classList.add("js-project-item-title"),r.innerText=e,t.appendChild(r),"Default"!==e){let e=document.createElement("button");e.classList.add("js-project-delete-button"),e.addEventListener("click",(e=>{o(e)})),e.style.display="none",t.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector(".js-project-delete-button").style.display="block"})),t.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector(".js-project-delete-button").style.display="none"})),t.appendChild(e)}return t.addEventListener("click",(e=>{c(e)})),e===n&&t.classList.add("project-selected"),t},c=e=>{if("BUTTON"===e.target.nodeName)return;let t=e.currentTarget.querySelector(".js-project-item-title").innerText;t!==n&&(n=t,l.innerText=t,document.querySelector("#js-init-task").style.display="block",i(),p())},o=t=>{let r=t.target.parentElement.querySelector(".js-project-item-title").innerText;e.deleteProject(r),r===n&&(l.innerText="",n="",document.querySelector("#js-init-task").style.display="none",p()),i()},a=()=>{document.querySelector("#js-project-form-title").value=""},d=()=>{const t=document.querySelector("#js-project-form-title");null===e.getProject(t.value)&&e.addProject(t.value),a(),i()},i=()=>{r.innerHTML="";let t=e.getProjects();for(let e=0;e<t.length;e++)r.appendChild(s(t[e].name))},u=(e,t,r)=>{let l=document.createElement("li"),n=document.createElement("div");n.classList.add("js-task-info");let s=document.createElement("span"),c=document.createElement("span");s.classList.add("js-task-title"),c.classList.add("js-task-date"),s.innerText=e,c.innerText="Date: ",""!==t.trim()?c.innerText+=t:c.innerText+="None",n.appendChild(s),n.appendChild(c),l.appendChild(n);let o=document.createElement("button");return o.classList.add("js-task-delete-button"),o.addEventListener("click",(e=>{y(e)})),o.style.display="none",l.appendChild(o),l.addEventListener("click",(e=>{m(e)})),l.addEventListener("mouseenter",(e=>{e.currentTarget.querySelector(".js-task-delete-button").style.display="block"})),l.addEventListener("mouseleave",(e=>{e.currentTarget.querySelector(".js-task-delete-button").style.display="none"})),r&&l.classList.add("task-checked"),l},m=t=>{if("BUTTON"===t.target.nodeName)return;let r=t.currentTarget.classList.toggle("task-checked"),l=t.currentTarget.querySelector(".js-task-title").innerText;e.getProject(n).editTask(l,null,null,r)},y=t=>{let r=t.target.parentElement.querySelector(".js-task-title").innerText;e.getProject(n).removeTask(r),p()},j=()=>{const e=document.querySelector("#js-task-form-title"),t=document.querySelector("#js-task-form-date");e.value="",t.value=""},p=()=>{if(t.innerHTML="",""===n)return;let r=e.getProject(n).tasks;for(let e=0;e<r.length;e++)t.appendChild(u(r[e].title,r[e].date,r[e].checked))};return{init:()=>{n="Default",e.init(),(()=>{const t=document.querySelector("#js-init-task"),r=document.querySelector(".modal");t.addEventListener("click",(()=>{r.style.display="block"})),window.onclick=e=>{e.target==r&&(j(),r.style.display="none")},document.querySelector(".js-task-form").addEventListener("submit",(t=>{t.preventDefault(),(""!==document.querySelector("#js-task-form-title").value.trim()||(alert("Task title is required"),0))&&((()=>{let t=document.querySelector("#js-task-form-title").value,r=document.querySelector("#js-task-form-date").value;e.getProject(n).addTask(t,r,!1),p()})(),j(),r.style.display="none")}))})(),i(),p(),(()=>{const e=document.querySelector("#js-init-project"),t=document.querySelector(".js-project-form");e.style.display="block",t.style.display="none",e.addEventListener("click",(()=>{e.style.display="none",t.style.display="flex"})),document.querySelector("#js-project-form-cancel").addEventListener("click",(()=>{a(),e.style.display="block",t.style.display="none"})),document.querySelector("#js-project-form-confirm").addEventListener("click",(()=>{""!==document.querySelector("#js-project-form-title").value.trim()&&(d(),e.style.display="block",t.style.display="none")}))})()}}})().init()})();