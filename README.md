# Backend Odyssey

Backend Odyssey is a backend learning system built around short, mystery-driven lessons.

This is an AI-generated tool that creates interesting backend topics to help learn backend knowledge.

The goal is simple:

> Understand one backend concept quickly, know why it exists, verify it with a small experiment, then test whether you truly got it.

## How This Repo Is Organized

```text
issues/      Newspaper-style lessons designed for phone reading.
topics/      Topic folders for what was learned that day.
src/         Fastify API, lesson data, scoring, and knowledge map.
publishing/  Notes for scheduled generation and phone delivery.
```

## Current Issue

- [001: Why Does HTTP Exist?](issues/001-why-http-exists.md)
- Newspaper web edition: `docs/issues/001-why-http-exists.html`

## Phone Reading

The repo includes two reading formats:

- Newspaper web edition under `docs/`
- Phone-delivery PDF generated under `dist/pdf/`

To read it on your phone through GitHub Pages:

1. Open the repo on GitHub.
2. Go to `Settings` -> `Pages`.
3. Set source to `Deploy from a branch`.
4. Choose branch `main` and folder `/docs`.
5. Open the published Pages URL on your phone.

To receive issues without clicking around, use the Gmail PDF email workflow:

1. Turn on 2-Step Verification for your Gmail account.
2. Create a Gmail App Password.
3. In GitHub, go to `Settings` -> `Secrets and variables` -> `Actions`.
4. Add these repository secrets:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `ODYSSEY_TO_EMAIL`
5. Run the `Publish Backend Odyssey Gazette PDF` workflow manually once.

The workflow builds the latest newspaper issue as a PDF and emails it as an attachment.

## Local API

```bash
npm install
npm start
```

Open:

- `GET /`
- `GET /lessons/current`
- `GET /lessons/001`
- `POST /lessons/001/submit`
- `GET /knowledge-map`

## Publishing Rhythm

The intended rhythm is one newspaper-style issue every 2-3 days, not a daily checklist.

Each issue includes:

- Mystery
- Why
- History
- Mechanism
- Trade-off
- Lab
- Real World
- Boss Challenge
- Test
- Score
- Knowledge Map
