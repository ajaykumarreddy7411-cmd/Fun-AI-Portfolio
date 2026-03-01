# Ajay Kumar - AI Developer Portfolio

An immersive, interactive hacker-themed OS simulation portfolio built with Next.js, React, Tailwind CSS, and TypeScript.

## Features
- **Interactive Terminal UI:** Fully functional command-line interface directly in your browser.
- **Boot Sequence:** Realistic AI core startup simulation.
- **Built-in Challenges:** Unlock sections like Projects and Contact by solving Data Structures & System Design questions.
- **GitHub API Integration:** Dynamically fetches top repositories on unlock.
- **Autonomous AI Background:** System monitors and floating AI logs creating a "living" site feel.
- **Aesthetic Effects:** Matrix rain canvas, CSS CRT scanlines, and RGB glitch text.
- **Achievements System:** Gamified progression saved to `localStorage` via Zustand.

## Tech Stack
- Next.js 14+ (App Router)
- React 18
- TypeScript
- Tailwind CSS v4
- Zustand

## Running Locally

1. Install Dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
This project is fully static / client-side rendered and ready to deploy on **Vercel** with zero backend configuration needed.

> **Note**: To adjust your GitHub username, edit `src/components/Sections/Projects.tsx` line 29.
