import csv, unittest
from pathlib import Path
from summarize import summarize
class SummaryTests(unittest.TestCase):
    def test_fixture(self):
        with (Path(__file__).parent/'fixtures/expenses.csv').open(newline='') as f: rows = list(csv.DictReader(f))
        self.assertEqual(summarize(rows), {'Office': 4200, 'Travel': 6500})
    def test_empty(self): self.assertEqual(summarize([]), {})
    def test_invalid_amount(self):
        with self.assertRaises(ValueError): summarize([{'id':'E1','category':'Office','amount_cents':'2.5'}])
    def test_duplicate(self):
        with self.assertRaises(ValueError): summarize([{'id':'E1','category':'Office','amount_cents':'1'}]*2)
if __name__ == '__main__': unittest.main()
