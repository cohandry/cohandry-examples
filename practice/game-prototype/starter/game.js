import {initial,move,width,height} from './state.js';
let state=initial();const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');
function draw(){ctx.clearRect(0,0,width,height);ctx.fillStyle='#ffc96b';ctx.beginPath();ctx.arc(state.x,state.y,12,0,Math.PI*2);ctx.fill();}
canvas.addEventListener('keydown',e=>{const delta={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]}[e.key];if(delta){e.preventDefault();state=move(state,...delta);draw();}});draw();
