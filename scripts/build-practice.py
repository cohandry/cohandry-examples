"""Deterministic public practice ZIPs; no account files, generated data or symlinks."""
import hashlib,json,pathlib,subprocess,sys,zipfile
root=pathlib.Path(__file__).resolve().parent.parent
out=pathlib.Path(sys.argv[1]).resolve() if len(sys.argv)>1 else root/'work/practice-kits';out.mkdir(parents=True,exist_ok=True)
manifest=[]
for p in json.loads((root/'practice/catalog.json').read_text())['packs']:
 assert p['id'].replace('-','').isalnum()
 folder=root/'practice'/p['id'];name=f"Cohandry-{p['id']}-{p['version']}.zip";target=out/name
 with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:
  tracked=subprocess.check_output(['git','ls-files','-z','--',str(folder.relative_to(root))],cwd=root).decode().split('\0')
  for name_in_tree in sorted(n for n in tracked if n):
   file=root/name_in_tree;rel=file.relative_to(folder)
   if '__pycache__' in rel.parts:continue
   if file.is_symlink():raise ValueError('No symlinks in practice packs')
   if not file.is_file():continue
   if file.name not in ['LICENSE','.gitignore'] and file.suffix not in ['.md','.json','.py','.csv','.html','.css','.svg','.js']:raise ValueError('Unexpected asset: '+str(rel))
   i=zipfile.ZipInfo(p['id']+'/'+rel.as_posix(),(1980,1,1,0,0,0));i.compress_type=zipfile.ZIP_DEFLATED;i.external_attr=0o644<<16;z.writestr(i,file.read_bytes())
 with zipfile.ZipFile(target) as z:
  assert z.testzip() is None
  for name_in_zip in z.namelist():assert not name_in_zip.startswith('/') and '..' not in pathlib.PurePosixPath(name_in_zip).parts
 manifest.append(dict(id=p['id'],version=p['version'],file=name,bytes=target.stat().st_size,sha256=hashlib.sha256(target.read_bytes()).hexdigest()))
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');print('Built',len(manifest),'practice kits:',out)
