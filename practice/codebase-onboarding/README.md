# Codebase onboarding team: Pocket Notes CLI

Practice kit 1.1.0 · Cohandry · MIT. Original fictional practice material.

## Template or example?
`template.json` contains only reusable team settings. It does not contain this example brief, source documents or starter files. Importing it never copies files into your project folder, installs tools, grants permissions or starts work. The separate example material is optional.

## Try this example in Cohandry
1. Unzip this kit into a new disposable practice folder. Read `EXAMPLE-PROJECT.md`, `ACCEPTANCE.md` and `EXPECTED-OUTPUTS.md`.
2. Open **Templates → Project packs → Import template**, choose `template.json`, inspect the team and use the project name from `EXAMPLE-PROJECT.md`. Create the paused project.
3. Open **Project context → Edit context** and replace the generic brief with the **Project context** section of `EXAMPLE-PROJECT.md`. In **Instructions**, add the files in `sources/` as reference documents. They are not imported by the template.
4. In **Settings → Project folder → Change folder**, choose the extracted `starter/` folder (or a disposable copy containing its contents). This is where file-reading and editing should happen. The folder is not the ZIP and is not the examples repository root.
5. Connect your own model. Allow only the project commands and external tools this exercise needs. Check the prerequisites below.
6. From **Overview → Give the team an objective**, paste the **Team objective** from `EXAMPLE-PROJECT.md`. Resume only when you are ready. Inspect requested commands before approving them.
7. Review the actual output, test evidence and reviewer findings against `ACCEPTANCE.md`. Nothing is published automatically.

Git is optional. For Git delivery, create your own disposable repository from the starter contents; do not copy the public examples repository’s `.git` folder or push to it. A downloaded ZIP has no repository history.

## Prerequisites for this example
- Cohandry 0.1.13 or later and your own supported model connection.
- A readable local folder or repository connection for the starter files.
- Python 3.10+ and a configured host if you want to verify commands; disclose read-only review limitations.

## Baseline / manual preview
On Windows, use `python` or `py -3` instead of `python3` if that is how Python is installed.

From starter/: python3 -m unittest -v. For a disposable example: python3 app.py --file demo-notes.json add "Read the guide" then python3 app.py --file demo-notes.json list. Delete only your practice file when finished.

Only run local preview servers when needed and stop them afterward. Never use private inputs for the first practice run.

## Use the template for your own project
Download only the reusable template JSON from the library, import it, supply your own project context and folder, and connect your own references and tools. Do not upload the example sources unless you want this exercise.
