import {writeFile,appendFile} from 'node:fs/promises';
import {checkDirectory} from './check.mjs';
const report=await checkDirectory(process.argv[2]);
for(const [key,value]of Object.entries({candidateCommit:process.env.CANDIDATE_SHA,validatorCommit:process.env.VALIDATOR_SHA}))if(/^[a-f0-9]{40}$/.test(value||''))report[key]=value;
await writeFile(process.argv[3],JSON.stringify(report,null,2)+'\n');
const rejected=report.templates.filter(t=>t.status==='rejected').length;
const summary=['## Template validation','',report.claim,'','The workflow initializes no model, executes no template commands and fetches no URLs from template content. All community publication still requires maintainer review.','',`Candidate: ${report.candidateCommit||'local'}`,`Validator: ${report.validatorCommit||'local'}`,'','| File | SHA-256 | Static result | Flags |','|---|---|---|---|',...report.templates.map(t=>`| ${t.file} | ${t.sha256} | ${t.status} | ${t.warnings.join(', ')||'none detected'} |`),'','Artifacts expire after 30 days. Keep this report with the publication review if longer retention is needed.'].join('\n');
if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,summary+'\n');
console.log(JSON.stringify({templates:report.templates.length,rejected,flagged:report.templates.filter(t=>t.status==='needs_review').length}));if(rejected)process.exitCode=1;
