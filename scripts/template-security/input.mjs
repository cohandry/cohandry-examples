// Bound and inspect JSON syntax before schema validation. Never evaluate source.
export function parseTemplateJSON(bytes){
 const text=new TextDecoder('utf-8',{fatal:true}).decode(bytes),stack=[];
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(c==='"'){
   const start=i;for(i++;i<text.length;i++){if(text[i]==='\\'){i++;continue}if(text[i]==='"')break}
   if(i>=text.length)throw Error('Invalid JSON string');
   const frame=stack.at(-1);
   if(frame?.object&&frame.key){const key=JSON.parse(text.slice(start,i+1));if(['__proto__','prototype','constructor'].includes(key)||frame.keys.has(key))throw Error('Ambiguous or unsafe JSON key');frame.keys.add(key);frame.key=false}
  }else if(c==='{'||c==='['){if(stack.length>=32)throw Error('JSON nesting limit');stack.push({object:c==='{',key:c==='{',keys:new Set()})}
  else if(c==='}'||c===']')stack.pop();
  else if(c===','&&stack.at(-1)?.object)stack.at(-1).key=true;
 }
 return JSON.parse(text);
}
export function templateText(value){
 const strings=[],visit=v=>{if(typeof v==='string')strings.push(v);else if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object')Object.values(v).forEach(visit)};visit(value);return strings.join('\n');
}
export function normalizedText(text){
 let value=text.normalize('NFKC').replace(/[\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/g,'');
 for(let pass=0;pass<2;pass++)value=value.replace(/%([a-f\d]{2})/gi,(_,n)=>String.fromCharCode(parseInt(n,16))).replace(/&#(x[a-f\d]+|\d+);?/gi,(_,n)=>{const cp=n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):parseInt(n,10);return cp<=0x10ffff?String.fromCodePoint(cp):' '}).replace(/&(lt|gt|colon|tab|newline|quot|apos|amp);/gi,(_,n)=>({lt:'<',gt:'>',colon:':',tab:'\t',newline:'\n',quot:'"',apos:"'",amp:'&'}[n.toLowerCase()]));
 return value;
}
