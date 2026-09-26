# FitLog — Workout Library & Planning Website

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, dive into detailed exercise instructions, and build out **Today's Plan** or a **Saved for later** list — all persisted right in your browser.

 [**Live Site:**](https://fit-log-three-sigma.vercel.app/)
 [**Repository:**](https://github.com/Maidul-057/FitLog)

---

## 📖 Description

FitLog fetches workout data from a public API and presents it as a browsable, searchable, and sortable library. Users can lock a lift into today's plan, save it for later, mark it as done, or remove it — with live badge counters in the navbar, toast feedback on every action, and full persistence via `localStorage` so nothing is lost on refresh.

---

## 🛠️ Technologies Used

- **Next.js (App Router)** — routing, layouts, and page structure
- **React** — component-based UI and state management
- **TypeScript** — type-safe components and data models
- **Tailwind CSS** — styling and fully responsive layouts
- **React Context API** — global state for the plan/saved lists
- **react-toastify** — toast notifications for user actions
- **lucide-react** — icon set used across the navbar, cards, and buttons
- **localStorage (Web Storage API)** — persists the plan and saved lists across page reloads

---

## ✨ Key Features

1. **Dynamic Workout Library** — Fetches live workout data from an API and displays it as a responsive grid of cards (category tags, equipment, duration, calories, and rating), collapsing gracefully across mobile, tablet, and desktop.
2. **Workout Detail Pages** — Dynamic `/workout/[id]` route with a two-column layout showing full specs (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions.
3. **Today's Plan & Saved List** — Add a workout to today's plan or save it for later directly from its detail page, with instant toast confirmation and live badge counters in the navbar.
4. **My Plan Page with Tabs & Live Metrics** — A dedicated `/my-plan` page with "Today's Plan" / "Saved" tabs, a live-updating metrics summary (exercises, minutes, calories), a "Mark as Done" action, a remove (X) action, and a friendly empty state.
5. **Search & Sort** — Instantly filter the library by workout name, muscle group, or equipment, and sort results by Duration, Calories, or Rating.
6. **Plan Cap & Persistence** — Today's Plan is capped at 5 lifts, and both the plan and saved lists persist in `localStorage` so your progress survives a page reload.
7. **Polished States & Routing** — Skeleton loading states while data is fetched, a custom 404 page for unknown routes, and reload-safe routing after deployment.

---

## 📱 Responsive Design

The entire site — navbar, hero, library grid, detail pages, and My Plan page — is built mobile-first with Tailwind CSS and adapts cleanly across mobile, tablet, and desktop breakpoints.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
src/
├── app/                   # App Router pages (home, my-plan, workout/[id], not-found, loading)
├── components/
│   ├── homepage/          # Banner, Library grid, Library card
│   ├── my-plan/           # My Plan page UI
│   ├── shared/             # Navbar, Footer
│   └── workout/           # Workout detail page UI
├── context/               # FitLogContext — plan/saved state + localStorage sync
├── lib/                   # API fetch helpers
└── types/                 # Shared TypeScript types
```

---

© 2026 FitLog — Workout Library. Train hard, log honest.