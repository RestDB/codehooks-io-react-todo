(this["webpackJsonpreact-todo-list"]=this["webpackJsonpreact-todo-list"]||[]).push([[0],{53:function(e,t,a){e.exports=a(65)},58:function(e,t,a){},59:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),c=a(9),r=a.n(c),l=(a(58),a(27)),i=a(48),d=a(33),s=a(100),m=(a(59),a(101)),u=a(97),f=a(103);var p=function(e){var t=e.addTodo,a=Object(o.useState)({id:"",task:"",completed:!1}),c=Object(d.a)(a,2),r=c[0],i=c[1];return n.a.createElement("form",{className:"todo-form",onSubmit:function(e){e.preventDefault(),r.task.trim()&&(t(Object(l.a)({},r,{id:Object(f.a)()})),i(Object(l.a)({},r,{task:""})))}},n.a.createElement(m.a,{label:"Task",type:"text",name:"task",value:r.task,onChange:function(e){i(Object(l.a)({},r,{task:e.target.value}))}}),n.a.createElement(u.a,{type:"submit"},"Submit"))},v=a(96),g=a(98),b=a(102),E=a(99),k=a(47),h=a.n(k);var O=function(e){var t=e.todo,a=e.toggleComplete,o=e.removeTodo;return n.a.createElement(g.a,{style:{display:"flex"}},n.a.createElement(b.a,{checked:t.completed,onClick:function(){a(t.id)}}),n.a.createElement(s.a,{variant:"body1",style:{textDecoration:t.completed?"line-through":null}},t.task),n.a.createElement(E.a,{onClick:function(){o(t.id)}},n.a.createElement(h.a,null)))};var j=function(e){var t=e.todos,a=e.removeTodo,o=e.toggleComplete;return n.a.createElement(v.a,null,t.map((function(e){return n.a.createElement(O,{key:e.id,todo:e,removeTodo:a,toggleComplete:o})})))};var y=function(){var e=Object(o.useState)([]),t=Object(d.a)(e,2),a=t[0],c=t[1];return Object(o.useEffect)((function(){var e=JSON.parse(localStorage.getItem("react-todo-list-todos"));e&&c(e)}),[]),Object(o.useEffect)((function(){localStorage.setItem("react-todo-list-todos",JSON.stringify(a))}),[a]),n.a.createElement("div",{className:"App"},n.a.createElement(s.a,{style:{padding:10},variant:"h1"},"React Todo"),n.a.createElement(s.a,{style:{padding:10},variant:"h4"},"Codehooks.io NoSql API Backend"),n.a.createElement(p,{addTodo:function(e){c([e].concat(Object(i.a)(a)))}}),n.a.createElement(j,{todos:a,removeTodo:function(e){c(a.filter((function(t){return t.id!==e})))},toggleComplete:function(e){c(a.map((function(t){return t.id===e?Object(l.a)({},t,{completed:!t.completed}):t})))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[53,1,2]]]);
//# sourceMappingURL=main.e3826e9f.chunk.js.map