# FitLog

FitLog is a dark, no-nonsense workout library and planning app built with Next.js, TypeScript, and Tailwind CSS. It lets users browse a live workout library, save sessions for later, and build a five-lift plan for the day using persistent local storage.

## Technologies used

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React
- React Toastify
- FitLog API

## Features

1. Browse the full library of workouts from the official API.
2. Search by workout name, muscle group, or equipment.
3. Sort library cards by duration, calories, or rating.
4. Add workouts to Today’s Plan with a max of five lifts.
5. Save workouts for later and persist them across refreshes.
6. View detailed workout instructions and training information.
7. Track daily plan metrics for exercises, minutes, and calories.
8. Responsive dark gym-inspired UI for mobile, tablet, and desktop.

## API information

The app uses the official FitLog API:

- GET: https://api.abcz.workers.dev/api/fitlog
- Single workout: https://api.abcz.workers.dev/api/fitlog/:id

This app reads the API response directly and uses the real workout fields without inventing a separate data structure.

## Local setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build and deployment

```bash
npm run build
npm run start
```

The app is production-safe and uses dynamic route rendering and client-side persistence for plan and saved data.

## Project structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    my-plan/
    workout/[id]/
  components/
    homepage/
    my-plan/
    shared/
    workout/
  context/
    FitLogContext.tsx
  lib/
    api.ts
  types/
    fitlog.ts
```