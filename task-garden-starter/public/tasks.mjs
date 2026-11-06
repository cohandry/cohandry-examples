export function addTask(tasks,title){const text=String(title).trim();if(!text)throw Error('Enter a task title.');if(text.length>80)throw Error('Use 80 characters or fewer.');return [...tasks,{id:crypto.randomUUID(),title:text,done:false}]}
export function toggleTask(tasks,id){return tasks.map(t=>t.id===id?{...t,done:!t.done}:t)}
export function removeTask(tasks,id){return tasks.filter(t=>t.id!==id)}
export function visibleTasks(tasks,filter='all'){if(filter==='active')return tasks.filter(t=>!t.done);if(filter==='completed')return tasks.filter(t=>t.done);return tasks}
