# Publishing Plan

Backend Odyssey should feel like a small technical newspaper, not a local-only project.

## Recommended Rhythm

Publish one issue every 3 days.

This is frequent enough to keep momentum, but not so frequent that it becomes another daily checklist.

## Generation

Codex can run a scheduled background automation that wakes up every 3 days and creates the next issue in `issues/`.

The automation should:

1. Read the latest issue.
2. Read the current knowledge map.
3. Generate the next newspaper-style issue.
4. Add or update the relevant `topics/` folder.
5. Keep the issue short enough for phone reading.
6. Avoid generating a huge fixed roadmap.

## Phone Delivery Options

Start simple:

1. Email yourself the Markdown or HTML issue.
2. Read it from your phone email app.
3. Later, connect Telegram, Pushover, or another notification channel.

## What Codex Can Do In The Background

Codex can create the next issue on a schedule inside this repo.

Codex cannot magically send to your phone until a delivery channel is configured. For email, that usually means adding SMTP credentials or using a provider such as SendGrid, Resend, or Gmail app password through GitHub Secrets.

## Suggested Next Issues

- 002: Why is HTTP stateless, but websites can keep you logged in?
- 003: What problems do Cookie, Session, and Token each solve?
- 004: Why do CORS and CSRF exist?
