# Cohandry examples

Public practice projects for [Cohandry](https://cohandry.com). Browse, clone or download the examples without signing in to Cohandry. These are sample websites that you improve with the desktop app.

## Task Garden

| Edition | Purpose | Files |
| --- | --- | --- |
| Starter | Working task list with eight baseline tests. Follow the tutorial to add priorities. | [task-garden-starter](task-garden-starter/) |
| Completed reference | Priority checkbox, badges, filter and persistence, plus a distinct cream/orange presentation. Twelve tests. Compare after your own attempt. | [task-garden-reference](task-garden-reference/) |

[Download starter ZIP](https://github.com/quinlayen/cohandry-examples/releases/download/examples-v1.0.0/Task-Garden-Starter.zip) · [Download reference ZIP](https://github.com/quinlayen/cohandry-examples/releases/download/examples-v1.0.0/Task-Garden-Reference.zip) · [Guided project walkthrough](https://cohandry.com/tutorial/) · [Learn](https://cohandry.com/learn/)

## Clone and run

Requires Node 24+. No dependencies to install.

```sh
git clone https://github.com/quinlayen/cohandry-examples.git
cd cohandry-examples/task-garden-starter
npm test
npm run check
npm start
```

Open http://127.0.0.1:4310. Stop with Ctrl-C. Use practice data only; tasks are stored in your browser. To try the completed reference, stop the starter server and run the same commands from `task-garden-reference`.

## Use your own GitHub repository

Cloning this public repository gives you a readable local copy, not permission to push here. For the tutorial's Git delivery workflow, create your own disposable repository and copy **the contents** of `task-garden-starter` into its root, including `.gitignore` and `.node-version`. Do not copy this collection's `.git` directory. Follow the walkthrough for connecting that repository, model and execution host to Cohandry. Keep your model keys and private project material out of Git.

The reference is not the tutorial starting point. Its priority feature is already implemented; its presentation was refreshed after the original demo feature run.

## Contributions and sharing

Issues and pull requests are welcome for example corrections. This repository is the initial official example collection, not yet an in-app template marketplace. Template-package import/export and community library submissions are tracked separately. Do not submit credentials, personal data or private project files.

MIT licensed; see [LICENSE](LICENSE).
