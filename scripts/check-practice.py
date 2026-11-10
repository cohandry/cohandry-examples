"""Check intentional starter states and shared sources without calling any model."""
import hashlib,json,pathlib,subprocess,sys
root=pathlib.Path(__file__).resolve().parent.parent
packs=json.loads((root/'practice/catalog.json').read_text())['packs']
assert len(packs)==6 and len({p['id'] for p in packs})==6
for p in packs:
 folder=root/'practice'/p['id'];template=json.loads((folder/'template.json').read_text())
 assert (folder/'template.json').read_bytes()==(root/'templates/official'/f"{p['id']}.json").read_bytes()
 assert len(template['agents'])==3
 assert template['sources']==[], 'Reusable template must not embed example sources'
 assert p['sample'] not in template['project']['name']
 assert (folder/'EXAMPLE-PROJECT.md').is_file()
 assert 'Project context' in (folder/'EXAMPLE-PROJECT.md').read_text()
 for name in ['README.md','EXPECTED-OUTPUTS.md','ACCEPTANCE.md','LICENSE']:assert (folder/name).stat().st_size>100
 assert (folder/'starter').is_dir()
 def run(args):return subprocess.run(args,cwd=folder/'starter',capture_output=True,text=True,timeout=30)
 if p['id']=='bug-investigation':
  r=run([sys.executable,'-m','unittest','-v']);log=r.stdout+r.stderr
  assert r.returncode==1 and 'Ran 3 tests' in log and 'FAILED (failures=1)' in log and 'test_quantity_regression' in log,log
 elif p['id']=='python-automation':
  r=run([sys.executable,'-m','unittest','-v']);log=r.stdout+r.stderr
  assert r.returncode==1 and 'Ran 4 tests' in log and 'FAILED (errors=4)' in log and 'NotImplementedError' in log,log
 elif p['id']=='codebase-onboarding':
  r=run([sys.executable,'-m','unittest','-v']);assert r.returncode==0,r.stderr
 elif p['id']=='game-prototype':
  r=run(['node','--test']);assert r.returncode==0,r.stdout+r.stderr
 print(p['id']+': sources and intentional starter baseline verified')
