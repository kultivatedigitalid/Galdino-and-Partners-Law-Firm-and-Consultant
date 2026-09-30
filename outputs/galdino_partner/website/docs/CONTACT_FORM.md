# Contact endpoint

`ContactForm.astro` posts multipart data to `/api/contact/`. Required fields: name, company, email, phone/WhatsApp, selected service, business location, message and privacy consent. No attachments or marketing consent are collected.

The handler enforces POST, exact Origin, non-cross-site fetch context, URL-encoded or multipart content, a streamed 24 KB body limit, field lengths, single-valued string fields, allowlisted service identifiers, email/phone checks, a honeypot and HTML escaping. It normalises Unicode and whitespace. Emails use a fixed subject and validated Reply-To. No request body or SMTP error details are logged.

Per-process controls: five requests per pseudonymised IP in 15 minutes, ten-second cooldown, 60 requests per minute globally and at most 10,000 buckets. Identifiers are HMACs with an ephemeral random key; buckets expire. Restarting the process resets limits. Multi-instance deployment needs an agreed shared store or trusted ingress limit before scaling.

The UI prevents repeated in-flight submissions, resets only on success, announces errors and displays a focus-managed native success dialog. A delivery error returns 503 and retains the form. A 30-second client cooldown follows success.

Local tests can use CONTACT_TEST_MODE=true only with a loopback HTTP CONTACT_ORIGIN; Nodemailer then creates an in-memory message stream and sends no external mail. Never enable test mode on a public host.

Retention policy for received inquiry correspondence is 12 months after the last communication, subject to the documented exceptions. Mailbox retention and access permissions must be configured operationally; the website cannot enforce deletion inside an external mailbox.
