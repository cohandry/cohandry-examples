import json
from pathlib import Path
def load(path):
    p = Path(path)
    return json.loads(p.read_text(encoding='utf-8')) if p.exists() else []
def save(path, notes):
    Path(path).write_text(json.dumps(notes, indent=2) + '\n', encoding='utf-8')
