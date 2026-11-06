import unittest
from cart import subtotal
class CartTests(unittest.TestCase):
    def test_empty(self): self.assertEqual(subtotal([]), 0)
    def test_single_quantity(self): self.assertEqual(subtotal([{'price_cents': 250, 'quantity': 1}]), 250)
    def test_quantity_regression(self): self.assertEqual(subtotal([{'price_cents': 250, 'quantity': 3}, {'price_cents': 100, 'quantity': 2}]), 950)
if __name__ == '__main__': unittest.main()
