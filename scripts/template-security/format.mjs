// Vendored format-v1 validator from Cohandry; instructions are never executed.
const fail=message=>{throw Error(message)};
const LIMIT=400000;
function object(v,keys,label){if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).some(k=>!keys.includes(k)))fail('Invalid '+label+' fields.');return v}
function text(v,max,label,optional=false){if(typeof v!=='string'||v.length>max||v.includes('\0')||(!optional&&!v.trim()))fail('Invalid '+label+'.');return v.trim()}
function list(v,max,label){if(!Array.isArray(v)||v.length>max)fail('Invalid '+label+'.');return v}
export function validateTemplate(input){
 if(Buffer.byteLength(JSON.stringify(input)??'')>LIMIT)fail('Template exceeds 400 KB.');
 const t=structuredClone(input);object(t,['format','schemaVersion','kind','metadata','project','agents','sources','requirements'],'template');
 if(t.format!=='cohandry-template'||t.schemaVersion!==1||!['project','agent'].includes(t.kind))fail('Unsupported Cohandry template format or version.');
 object(t.metadata,['name','description','author','version','license'],'metadata');for(const [k,max] of [['name',120],['description',1200],['author',120],['version',40],['license',100]])t.metadata[k]=text(t.metadata[k],max,k);
 object(t.project,['name','brief'],'project');t.project.name=text(t.project.name,120,'project name');t.project.brief=text(t.project.brief,16000,'project context');
 const ids=new Set();list(t.agents,30,'agents');if(!t.agents.length||(t.kind==='agent'&&t.agents.length!==1))fail('Choose at least one role; agent templates contain one role.');
 for(const a of t.agents){object(a,['key','name','role','goal','backstory','delegates','reviewers'],'agent');if(!/^[a-z][a-z0-9-]{0,49}$/.test(a.key)||ids.has(a.key))fail('Agent keys must be unique.');ids.add(a.key);for(const [k,max,optional] of [['name',80,false],['role',140,false],['goal',4000,false],['backstory',4000,true]])a[k]=text(a[k],max,k,optional);for(const k of ['delegates','reviewers'])list(a[k],20,k);}
 for(const a of t.agents)for(const k of ['delegates','reviewers'])if(new Set(a[k]).size!==a[k].length||a[k].some(id=>id===a.key||!ids.has(id)))fail('Role references must name another included agent.');
 const visited=new Set();const visit=(key,path=new Set())=>{if(visited.has(key))return;if(path.has(key))fail('Required reviewer relationships cannot contain cycles.');const next=new Set(path).add(key);for(const reviewer of t.agents.find(a=>a.key===key).reviewers)visit(reviewer,next);visited.add(key)};for(const a of t.agents)visit(a.key);
 list(t.sources,20,'sources');const names=new Set();for(const s of t.sources){object(s,['name','content'],'source');s.name=text(s.name,100,'source name');if(!/^[a-zA-Z0-9_. -]+\.(md|txt|json|csv|py|cs)$/i.test(s.name)||names.has(s.name))fail('Use unique text source filenames.');names.add(s.name);s.content=text(s.content,30000,'source content');}
 list(t.requirements,20,'requirements');t.requirements=t.requirements.map(r=>text(r,300,'requirement'));
 return t;
}
