# Python automation team: Expense summary CSV

Version 1.0.0 · Cohandry · MIT. All names, inputs and project material here are original fictional practice data.

## What is included
- `template.json`: reusable team instructions and shared sample source text. Import this file, not the ZIP.
- `sources/`: human-readable copies of the references embedded in the template. **Do not upload duplicates after importing.** Edit or replace these sample records when adapting the project.
- `starter/`: a deliberately small unfinished project or writing outline. Importing a template does **not** copy these files into your workspace.
- `EXPECTED-OUTPUTS.md` and `ACCEPTANCE.md`: the goal and checks for your review.

## Try it in Cohandry
1. Unzip the kit into a new practice folder. Use Cohandry 0.1.13 or later.
2. Open **Templates → Project packs → Import template** and select `template.json`. Inspect roles and sources; importing creates a new paused project.
3. Read the requirements below and connect your own model. For file work, select/copy `starter/` into a disposable working folder and configure its execution host and allowed tools. Importing grants no tool permissions.
4. To practice Git delivery, create your own disposable repository containing the starter contents. Do not push changes to the public examples repository or copy its `.git` directory. Git is optional for the exercise itself.
5. Read the brief and acceptance checks, then submit this objective:

> Implement the expense summarizer to meet the supplied contract. Keep dry-run as the default, validate bad inputs and prove totals and overwrite protection. Do not process personal financial files.

6. Review setup before resuming dispatch, and inspect proposed commands before approving them. Inspect actual output and acceptance evidence; model behavior is not guaranteed.

## Requirements
- Python 3.10+ and an approved execution host; no packages, bank access or external services.
- Use only the fictional fixture CSVs until you have reviewed the behavior.

## Baseline / manual preview
On Windows, use `python` or `py -3` instead of `python3` if that is how Python is installed.

From starter/: python3 -m unittest -v. Some tests intentionally fail until summarize is implemented. After implementation: python3 summarize.py fixtures/expenses.csv. Use --output result.json only to create a new file.

Only run local preview servers when needed and stop them afterward. Never use private inputs for the first practice run.

## Adapt it
Replace the sample project brief and shared source records with your own. Keep the role responsibilities and acceptance criteria that fit; remove sample-specific constraints. The template is not tied to a particular model or engine.
