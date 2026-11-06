import argparse, csv, json

def summarize(rows):
    """Return {category: integer cents}; implement the contract in sources/."""
    raise NotImplementedError('Practice task: implement validated category totals')

def main():
    parser = argparse.ArgumentParser(description='Fictional expense summary')
    parser.add_argument('input'); parser.add_argument('--output')
    args = parser.parse_args()
    try:
        with open(args.input, newline='', encoding='utf-8') as f: result = summarize(list(csv.DictReader(f)))
        text = json.dumps(result, sort_keys=True, indent=2) + '\n'
        if args.output:
            with open(args.output, 'x', encoding='utf-8') as f: f.write(text)
        else: print(text, end='')
    except (ValueError, OSError, NotImplementedError) as exc: parser.exit(1, str(exc) + '\n')
if __name__ == '__main__': main()
