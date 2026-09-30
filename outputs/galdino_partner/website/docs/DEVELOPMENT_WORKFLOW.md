# Workflow

Base main → implementation branch → local QA → validated commit → main. The user explicitly authorised committing and pushing the completed change to main. Never force-push to replace remote work; fetch and integrate any upstream changes first.

Run npm ci and npm run qa. Review rendered pages and functional browser flows. Record checks in reports/validation.json and QA_REPORT.md. Local mail stream tests are not evidence of SMTP delivery.

Use central data and URL helpers; validate references whenever a service changes. Keep paired Markdown articles and source links. Preserve approved Home/About layout. Document provisional changes and block indexing until approval.

No secrets, populated .env, node_modules, dist or local logs belong in Git. All generated source artifacts, content, test scripts and release documentation do.
