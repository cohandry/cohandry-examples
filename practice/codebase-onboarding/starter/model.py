def make_note(text):
    value = text.strip()
    if not value: raise ValueError('Note cannot be empty')
    return {'text': value}
