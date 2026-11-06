import test from 'node:test';import assert from 'node:assert/strict';import {addTask,toggleTask,removeTask,visibleTasks} from '../public/tasks.mjs';
test('adds a trimmed active task without changing input',()=>{const original=[];const next=addTask(original,'  Write guide  ');assert.equal(next[0].title,'Write guide');assert.equal(next[0].done,false);assert.equal(original.length,0)});
test('rejects whitespace-only titles',()=>assert.throws(()=>addTask([],'   '),/title/));
test('rejects titles longer than 80 characters',()=>assert.throws(()=>addTask([],'x'.repeat(81)),/80/));
test('accepts an 80-character title',()=>assert.equal(addTask([],'x'.repeat(80))[0].title.length,80));
test('toggle preserves original',()=>{const original=[{id:'1',title:'Task',done:false}];assert.equal(toggleTask(original,'1')[0].done,true);assert.equal(original[0].done,false)});
test('removes only matching task',()=>assert.deepEqual(removeTask([{id:'1'},{id:'2'}],'1'),[{id:'2'}]));
test('filters active and completed',()=>{const tasks=[{id:'1',done:false},{id:'2',done:true}];assert.equal(visibleTasks(tasks).length,2);assert.equal(visibleTasks(tasks,'active')[0].id,'1');assert.equal(visibleTasks(tasks,'completed')[0].id,'2')});
test('unknown filter returns all tasks',()=>assert.equal(visibleTasks([{id:'1'}],'unknown').length,1));
