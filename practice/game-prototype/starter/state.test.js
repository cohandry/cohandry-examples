import test from 'node:test';import assert from 'node:assert/strict';import {initial,move} from './state.js';
test('movement is bounded and does not mutate its input',()=>{const s=initial(),next=move(s,-100,1000);assert.deepEqual(next,{x:12,y:348});assert.deepEqual(s,{x:40,y:180});});
test('new starts are independent',()=>{const a=initial();a.x=300;assert.equal(initial().x,40);});
