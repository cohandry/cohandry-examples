import argparse
from model import make_note
from storage import load, save
def main():
    parser = argparse.ArgumentParser(description='Pocket Notes practice CLI')
    parser.add_argument('--file', default='notes.json')
    parser.add_argument('command', choices=['add', 'list'])
    parser.add_argument('text', nargs='?')
    args = parser.parse_args()
    notes = load(args.file)
    if args.command == 'add':
        if args.text is None: parser.error('add requires text')
        notes.append(make_note(args.text)); save(args.file, notes)
    else:
        for index, note in enumerate(notes, 1): print(f"{index}. {note['text']}")
if __name__ == '__main__': main()
