// Loopback-only email sink for browser QA. Never use this entry point for hosting.
process.env.HOST='127.0.0.1';process.env.PORT='4327';process.env.CONTACT_ORIGIN='http://localhost:4327';process.env.CONTACT_TEST_MODE='true';
await import('../dist/server/entry.mjs');
