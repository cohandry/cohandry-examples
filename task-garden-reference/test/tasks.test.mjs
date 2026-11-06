import test from 'node:test';
import assert from 'node:assert/strict';
import {addTask,toggleTask,removeTask,visibleTasks} from '../public/tasks.mjs';

test('adds a trimmed active task without changing input',()=>{
  const original=[];
  const next=addTask(original,'  Write guide  ');
  assert.equal(next[0].title,'Write guide');
  assert.equal(next[0].done,false);
  assert.equal(next[0].highPriority,false);
  assert.equal(original.length,0)
});

test('adds a high-priority task when requested',()=>{
  const next=addTask([],'Urgent task',true);
  assert.equal(next[0].title,'Urgent task');
  assert.equal(next[0].highPriority,true);
});

test('rejects whitespace-only titles',()=>assert.throws(()=>addTask([],'   '),/title/));

test('rejects titles longer than 80 characters',()=>assert.throws(()=>addTask([],'x'.repeat(81)),/80/));

test('accepts an 80-character title',()=>assert.equal(addTask([],'x'.repeat(80))[0].title.length,80));

test('toggle preserves original',()=>{
  const original=[{id:'1',title:'Task',done:false,highPriority:false}];
  assert.equal(toggleTask(original,'1')[0].done,true);
  assert.equal(original[0].done,false)
});

test('removes only matching task',()=>assert.deepEqual(removeTask([{id:'1'},{id:'2'}],'1'),[{id:'2'}]));

test('filters active and completed',()=>{
  const tasks=[{id:'1',done:false,highPriority:false},{id:'2',done:true,highPriority:false}];
  assert.equal(visibleTasks(tasks).length,2);
  assert.equal(visibleTasks(tasks,'active')[0].id,'1');
  assert.equal(visibleTasks(tasks,'completed')[0].id,'2')
});

test('filters high-priority tasks including completed',()=>{
  const tasks=[{id:'1',done:false,highPriority:true},{id:'2',done:true,highPriority:true},{id:'3',done:false,highPriority:false}];
  const high=visibleTasks(tasks,'high');
  assert.equal(high.length,2);
  assert.deepEqual(high.map(t=>t.id),['1','2'])
});

test('unknown filter returns all tasks',()=>assert.equal(visibleTasks([{id:'1',highPriority:false}],'unknown').length,1));

test('backward compatibility: tasks without highPriority are normal',()=>{
  const tasks=[{id:'1',title:'Old task',done:false}];
  const all=visibleTasks(tasks,'all');
  const high=visibleTasks(tasks,'high');
  assert.equal(all.length,1);
  assert.equal(all[0].highPriority,undefined);
  assert.equal(high.length,0)
});

test('backward compatibility: toggle/remove work on tasks without highPriority',()=>{
  const tasks=[{id:'1',title:'Old task',done:false}];
  const toggled=toggleTask(tasks,'1');
  assert.equal(toggled[0].done,true);
  const removed=removeTask(tasks,'1');
  assert.equal(removed.length,0)
});