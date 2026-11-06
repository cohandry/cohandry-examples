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
