# Share a Cohandry template

Official templates live in `official/`; accepted community templates live in `community/` and keep their author attribution. Templates are reusable instructions, not executable plugins or model weights.

## Contribute

1. Export a template from a Cohandry build that supports portable templates, or start from an official JSON example.
2. Inspect every field and selected source document. Remove credentials, personal data, private URLs and text you cannot redistribute.
3. Submit a **Community template** issue with a public source link, or open a pull request adding `templates/community/your-template.json`.
4. Include author, version, license, purpose, requirements and a short reproducible test. Explain the starting project and expected result. Test import in a fresh paused project; never assume access to someone else's tools.
5. A maintainer reviews format, licensing, instructions, requirements and the demonstration before listing it on the website. Submission does not publish automatically. Changes to accepted templates require another review.

Only maintainers may mark templates official. Community authors retain credit and the license they select. A review is not a guarantee of model output or third-party tools. Files cannot include executable setup, credentials or runtime permissions. Imported instructions must be inspected by the recipient.

## Format v1

Use the exact fields shown in the official examples. `format` is `cohandry-template`, `schemaVersion` is `1`, and `kind` is `project` or `agent`. Agent templates contain one role and currently import into a new paused project. Metadata requires name, description, author, version and license. Project contains name and brief. Roles contain key, name, role, goal, backstory, delegates and reviewers. Role references use local keys. Sources contain unique text filenames and content. Requirements are explanatory text, not installation commands.

Limits: 400 KB per file, 30 roles, 20 text sources (30,000 characters each), 20 requirements. No external URLs are fetched on import. The app rejects unknown fields and unsupported versions. Export excludes runtime bindings and work history, but cannot identify every secret someone typed into a prompt; inspect the text yourself.

## Listing and reports

Website listings distinguish official and community authors. Use a library report issue for attribution, licensing, unsafe instructions or broken downloads. Maintainers can remove a listing without deleting the report. Ratings and public user profiles are not part of the first version.


## Security validation and review

The dedicated **Template security validation** workflow runs a trusted validator from the target branch against candidate JSON files. Its `pull_request_target` job has read-only repository access, no secrets, no package installation and no execution of candidate code; it must never import scripts or commands from the PR. Candidate workflow/validator edits cannot change that trusted validation for the same PR. The general example checks are separate and run in ordinary secret-free PR jobs.

Checks enforce the app format-v1 schema/limits, regular safe filenames, references and reviewer cycles. Known credential patterns block acceptance. Risk categories include destructive commands, downloaded scripts, credential requests, instruction overrides, external destinations and active markup. Reports retain hashes and category names, never raw candidate text or credential matches. A static pass is not a safety certification: instruction attacks can be obfuscated, servers can be malicious, and the model may still behave unexpectedly. Import must remain paused without runtime grants, and tool permissions remain explicit in the app.

Every community template needs a maintainer to inspect all roles/sources, author/license rights, destinations, requested commands, model/tool requirements and the reproducible import test. Review the exact report SHA-256 and candidate commit; repeat when bytes change. Do not download external issue attachments or follow their links automatically. Ask issue authors for a PR adding a regular JSON file when needed. Never execute a template to decide if it is safe. Publication is a separate curated website change; a passing workflow does not add a listing.

`CODEOWNERS` requests review but does not enforce it by itself. Repository rules must require owner approval/checks to prevent bypass; inspect the actual settings before claiming enforcement. Workflow reports expire after 30 days. The maintainer should retain the reviewed hash/report with the website publication record. No automatic unsafe-content approval or remote URL fetching is provided.

The strict format validator is vendored from the desktop importer with a recorded source fingerprint in `scripts/template-security/source.json`. Update it deliberately with app schema changes and regression tests. The desktop importer remains authoritative. For bootstrap, the new workflow starts protecting submissions after it is merged into the default branch; the ordinary checks and local adversarial tests validate the initial PR.
