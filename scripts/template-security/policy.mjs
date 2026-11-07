import {createHash} from 'node:crypto';
import {validateTemplate} from './format.mjs';
export function inspectBytes(bytes){
 const sha256=createHash('sha256').update(bytes).digest('hex');if(bytes.length>400000)return {sha256,status:'rejected',reason:'size_limit',warnings:[]};
 let input;try{input=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));validateTemplate(input)}catch{return {sha256,status:'rejected',reason:'invalid_format',warnings:[]}}
 const text=JSON.stringify(input),warnings=[];
 // Findings name categories only. Never echo candidate text or potential secrets into CI logs.
 const patterns=[['credential_material',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|sk-(?:or-v1-)?[A-Za-z0-9_-]{25,}|AKIA[A-Z0-9]{16})\b/i],['download_and_execute',/(?:curl|wget)[^\n]{0,1000}\|[^\n]{0,200}(?:sh|bash|pwsh|powershell)|(?:Invoke-WebRequest|iwr)[^\n]{0,1000}(?:iex|Invoke-Expression)/i],['privileged_or_destructive',/\bsudo\s|\brm\s+-[^\n]{0,30}r|Remove-Item[^\n]{0,100}-Recurse|chmod\s+777/i],['credential_or_private_path',/\.ssh(?:[\/\\]|\b)|\.env\b|(?:api[_ -]?key|access[_ -]?token|password)/i],['instruction_override',/ignore (?:all |any |the )?(?:previous|prior|system) instructions|bypass (?:the )?(?:approval|review|permission)|(?:disable|skip) (?:the )?(?:approval|security|review) (?:checks?|gates?)/i],['active_markup',/<(?:script|iframe|object|embed)\b|javascript\s*:/i],['external_destination',/(?:https?|ftp):\/\/|\b(?:curl|wget|ssh|scp)\s/i]];
 for(const [code,pattern]of patterns)if(pattern.test(text))warnings.push(code);
 if(warnings.includes('credential_material'))return {sha256,status:'rejected',reason:'credential_material',warnings};
 return {sha256,status:warnings.length?'needs_review':'format_valid',reason:null,warnings};
}
