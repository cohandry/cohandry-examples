import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const routes=new Map([['/',['index.html','text/html']],['/app.js',['app.js','text/javascript']],['/tasks.mjs',['tasks.mjs','text/javascript']],['/style.css',['style.css','text/css']]]);
const port=Number(process.env.PORT||4310);
const server=createServer(async(req,res)=>{const route=routes.get(new URL(req.url,'http://localhost').pathname);if(!route){res.writeHead(404);res.end('Not found');return}try{const body=await readFile(new URL('./public/'+route[0],import.meta.url));res.writeHead(200,{'Content-Type':route[1]+'; charset=utf-8','Cache-Control':'no-store'});res.end(body)}catch{res.writeHead(500);res.end('Unable to load file')}});
server.listen(port,'127.0.0.1',()=>console.log('Task Garden: http://127.0.0.1:'+port));
