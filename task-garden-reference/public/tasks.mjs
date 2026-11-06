export function addTask(tasks, title, highPriority = false) {
  const text = String(title).trim();
  if (!text) throw Error('Enter a task title.');
  if (text.length > 80) throw Error('Use 80 characters or fewer.');
  return [...tasks, { id: crypto.randomUUID(), title: text, done: false, highPriority: Boolean(highPriority) }];
}
export function toggleTask(tasks, id) {
  return tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
}
export function removeTask(tasks, id) {
  return tasks.filter(t => t.id !== id);
}
export function visibleTasks(tasks, filter = 'all') {
  let result = tasks;
  if (filter === 'active') result = result.filter(t => !t.done);
  else if (filter === 'completed') result = result.filter(t => t.done);
  else if (filter === 'high') result = result.filter(t => t.highPriority);
  return result;
}