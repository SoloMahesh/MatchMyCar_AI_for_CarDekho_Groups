# 🏎️ MatchMyCar AI (CarDekho Genius)

> "Find your perfect car in 60 seconds."

MatchMyCar AI is a premium, AI-powered car recommendation platform built for the **CarDekho Group**. It solves the "decision paralysis" problem by transforming technical car research into a simple, guided journey—from confusion to a confident shortlist.

---

## 🌟 The Core Innovation

Unlike traditional research tools that show spreadsheets of specs, MatchMyCar AI uses a **two-tier decision engine**:

1.  **Mathematical Scoring Layer:** A weighted algorithm (`lib/scoring.ts`) that evaluates 30+ cars against your budget, family size, safety requirements, and performance needs.
2.  **AI Justification Layer:** Integrated with **Google Gemini 2.5 Flash**, the system generates "Kinetic Noir" styled explanations for why a specific car fits your *lifestyle*, not just your specs.

---

## 🛠️ Features

- **Intelligence-First Funnel:** A 5-step interactive questionnaire that captures user intent (Usage, Budget, Priorities).
- **Parallel AI Processing:** The loading screen (`/loading`) fetches recommendations and AI justifications in parallel with the animation to ensure a zero-latency transition.
- **Instant Results:** Pre-fetched data allows the results page to render instantly without secondary loading states.
- **Telemetry Comparison:** A side-by-side spec comparison table with automated "best-in-class" highlighting.
- **Kinetic Noir UI:** A high-end automotive aesthetic using Tailwind CSS 4, Glassmorphism, and Space Grotesk typography.

---

## 🚀 Local Setup (Under 2 Minutes)

### 1. Prerequisites
- Node.js 20+
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/))

### 2. Installation
```bash
# Clone the repository and navigate to the app directory
cd app

# Install dependencies
npm install

# Setup Environment
# Create a .env file and add your key:
# GEMINI_API_KEY=your_key_here
# DATABASE_URL="file:./dev.db"
```

### 3. Database Initialization
```bash
# Push the schema and seed the database with 30+ Indian market cars
npx prisma db push
npx prisma db seed
```

### 4. Launch
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

---

## 🧪 Testing Checklist for Reviewers

1.  **Typing Effect:** Observe the looping "60 Seconds" typing animation on the landing page.
2.  **Questionnaire:** Complete the 5-step funnel. Try selecting "Safety" or "Mileage" as high priorities.
3.  **Loading Transition:** Notice the parallel AI processing (minimum 4s for UX, then instant redirect).
4.  **Results:** Review the match percentages and the AI-generated "why this car" explanations.
5.  **Comparison:** Click "Compare" to see the dynamic spec table and "best-in-row" indicators.

---

## 📂 Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4 (Experimental/Next), Glassmorphism
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** SQLite (local-first)
- **AI:** Google Generative AI (Gemini 2.5 Flash)

---

**Developed with 🧡 for the CarDekho Engineering Challenge.**
