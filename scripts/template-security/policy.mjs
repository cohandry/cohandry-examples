import {createHash} from 'node:crypto';
import {validateTemplate} from './format.mjs';
import {parseTemplateJSON,templateText,normalizedText} from './input.mjs';
export const POLICY_VERSION=2;
// Recognizable attack payloads are blocked, including when presented as examples.
// Other matches require explicit maintainer review. Neither result proves safety.
const rules=[
 ['credential_material','block',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|sk-(?:or-v1-)?[A-Za-z0-9_-]{25,}|AKIA[A-Z0-9]{16})\b/i],
 ['sql_injection','block',/\bunion\s+(?:all\s+)?select\b|['"`]\s*(?:or|and)\s+(?:\d+\s*=\s*\d+|['"][^'"\r\n]{0,50}['"]\s*=\s*['"])|['"`]\s*;\s*(?:drop|truncate|delete|alter|insert|update|exec(?:ute)?)\b|\b(?:sleep|pg_sleep|benchmark)\s*\(|\bwaitfor\s+delay\b|\bload_file\s*\(|\binto\s+(?:out|dump)file\b|\bxp_cmdshell\b/i],
 ['nosql_injection','block',/["']?\$(?:where|ne|gt|regex|function)["']?\s*:/i],
 ['command_injection','block',/\$\([^\r\n)]{1,500}\)|`\s*(?:curl|wget|bash|sh|powershell|pwsh|cat|rm|nc)\b[^`\r\n]{0,500}`|(?:&&|;|\|\|)\s*(?:curl|wget|bash|powershell|pwsh|nc)\b/i],
 ['encoded_execution','block',/\b(?:eval|exec|system)\s*\([^\r\n]{0,300}(?:atob|base64|frombase64)|\b(?:powershell|pwsh)\b[^\r\n]{0,200}\s-(?:enc|encodedcommand)\b|\bbase64\b[^\r\n]{0,100}\|\s*(?:sh|bash)/i],
 ['instruction_override','block',/ignore\s+(?:all\s+|any\s+|the\s+)?(?:previous|prior|system)\s+instructions|bypass\s+(?:the\s+)?(?:approval|review|permission)|(?:disable|skip)\s+(?:the\s+)?(?:approval|security|review)\s+(?:checks?|gates?)/i],
 ['active_markup','block',/<\s*(?:script|iframe|object|embed|svg|math)\b|javascript\s*:|data\s*:\s*(?:text\/html|image\/svg\+xml)|<[^>\r\n]{0,500}\bon[a-z]+\s*=/i],
 ['data_exfiltration','block',/\b(?:curl|wget)\b[^\r\n]{0,500}(?:--data(?:-binary)?|-d|--upload-file|-T)\s+@?[^\s\r\n]{0,100}(?:\.env\b|\.ssh\b|credentials\b)|https?:\/\/[^\s/@:]+:[^\s/@]+@/i],
 ['cloud_metadata_destination','block',/\b169\.254\.169\.254\b|\bmetadata\.google\.internal\b/i],
 ['download_and_execute','review',/(?:curl|wget)[^\r\n]{0,1000}\|[^\r\n]{0,200}(?:sh|bash|pwsh|powershell)|(?:Invoke-WebRequest|iwr)[^\r\n]{0,1000}(?:iex|Invoke-Expression)/i],
 ['privileged_or_destructive','review',/\bsudo\s|\brm\s+-[^\r\n]{0,30}r|Remove-Item[^\r\n]{0,100}-Recurse|chmod\s+777/i],
 ['credential_or_private_path','review',/\.ssh(?:[\/\\]|\b)|\.env\b|(?:api[_ -]?key|access[_ -]?token|password)/i],
 ['path_traversal','review',/(?:\.\.[\/\\]){1,}|(?:file|smb|ftp):\/\//i],
 ['private_network_destination','review',/https?:\/\/(?:localhost\b|127(?:\.\d{1,3}){3}\b|0\.0\.0\.0\b|10(?:\.\d{1,3}){3}\b|192\.168(?:\.\d{1,3}){2}\b|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}\b|\[(?:::1|::ffff:|f[cd]|fe80))/i],
 ['external_destination','review',/(?:https?|ftp):\/\/|\b(?:curl|wget|ssh|scp)\s/i],
 ['encoded_content','review',/%[a-f\d]{2}|&#(?:x[a-f\d]+|\d+);|\b[A-Za-z0-9+/]{80,}={0,2}\b/i],
 ['obfuscated_text','review',/[\u200b-\u200f\u202a-\u202e\u2060-\u2069\ufeff]/]
];
export function inspectBytes(bytes){
 const sha256=createHash('sha256').update(bytes).digest('hex'),base={sha256,policyVersion:POLICY_VERSION};if(bytes.length>400000)return {...base,status:'rejected',reason:'size_limit',warnings:[]};
 let input;try{input=parseTemplateJSON(bytes);validateTemplate(input)}catch{return {...base,status:'rejected',reason:'invalid_format',warnings:[]}}
 const original=templateText(input),normalized=normalizedText(original),sql=normalized.replace(/\/\*[\s\S]*?\*\//g,' '),warnings=[],blocked=[];
 for(const [code,mode,pattern]of rules)if(pattern.test(original)||pattern.test(normalized)||(code==='sql_injection'&&(pattern.test(sql)||pattern.test(normalized.replace(/\/\*[\s\S]*?\*\//g,''))))){warnings.push(code);if(mode==='block')blocked.push(code)}
 return {...base,status:blocked.length?'rejected':warnings.length?'needs_review':'format_valid',reason:blocked[0]||null,warnings};
}
