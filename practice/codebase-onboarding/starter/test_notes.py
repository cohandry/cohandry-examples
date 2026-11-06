import tempfile, unittest
from pathlib import Path
from model import make_note
from storage import load, save
class NotesTests(unittest.TestCase):
    def test_trim(self): self.assertEqual(make_note(' hello '), {'text': 'hello'})
    def test_empty(self):
        with self.assertRaises(ValueError): make_note('  ')
    def test_roundtrip(self):
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / 'notes.json'
            self.assertEqual(load(p), []); save(p, [make_note('hello')]); self.assertEqual(load(p), [{'text': 'hello'}])
if __name__ == '__main__': unittest.main()
