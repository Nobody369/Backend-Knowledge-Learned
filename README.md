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
