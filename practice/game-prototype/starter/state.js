export const width=600,height=360;
export const initial=()=>({x:40,y:180});
export function move(state,dx,dy){return {...state,x:Math.max(12,Math.min(width-12,state.x+dx)),y:Math.max(12,Math.min(height-12,state.y+dy))};}
