def subtotal(items):
    """Return a subtotal in integer cents. Known practice bug: quantity ignored."""
    return sum(item['price_cents'] for item in items)
