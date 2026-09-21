# LIFE RPG — LEVEL UP (Premium UI + Boss Accountability System)

> **Turn Real Life Into A Motivating RPG.**  
> Master your faith, health, work, learning, money, relationships, and freedom through compounding daily actions.

---

## ⚔️ Core Philosophy

- **Reward Consistency, Never Punish:** Missing a day never deletes your XP, achievements, goals, or saved money. Progress is permanent.
- **Dual-Role Operating System:**
  - **PLAYER:** Executes quests, today tasks, goals, habits, freedom savings, logs real deeds, and levels up.
  - **BOSS / MASTER:** Oversees player execution, audits completed tasks, awards certified **BOSS XP**, issues challenges, and conducts weekly evaluations.
- **Integrity First:** Players cannot self-award Boss XP. All Boss awards are immutably logged with date, amount, reason, and mentor notes.
- **Physical Environment Over Impulses:** Immediate 1-click **"I Want To Smoke" Emergency Menu** helps shift physical environments without mental negotiation.

---

## 🚀 Key Features

### 1. Main Dashboard & Command Center
- **Hero Level Card:** Displays `LEVEL 7 — 684 XP`, animated XP progress bar, current streak (`7D`), total money saved (`240 DH`), and Life Points (`48 LP`).
- **Dynamic Motivational Quotes:** Based on progress ("Day 1. Start", "Keep going", "You're building yourself", "Don't trade your future for one moment").
- **Live Statistics Cards Grid:** 9 real-time metrics (Level, Total XP, Next Level XP, Current Week XP, Streak, Total Money Saved, Goals Completed, Today's Progress %, Life Points).
- **TODAY'S MISSION:** One-click execution directly on the dashboard:
  1. Most important task (Main Quest)
  2. Three selected daily quests
  3. One health action
  4. One work or learning action
  5. One faith or personal action
  6. Money saved today counter
  7. XP earned today counter
- **Boss Accountability Widget:** Real-time supervisor status, latest feedback, active challenges, and immutable Boss XP audit feed.
- **Recent Activity Feed:** Chronological ledger of real deeds and achievements.

### 2. Daily Quests Engine (`/quests`)
- Categorized by **Faith, Mind, Health, Work, Learning, Money, Relationships, Life / Experiences**.
- Difficulties: Easy (5 XP), Medium (10 XP), Hard (20 XP), Major (50 XP).
- "What did you do?" notes field.
- Custom quest creation with automatic Freedom Fund deposits.
- Duplicate XP prevention and clean completion reversal.

### 3. Life Goals Roadmap (`/goals`)
- Timeframes: **Short-Term** (days/weeks), **Mid-Term** (1–3 months), **Long-Term** (6–12+ months).
- Categorized with progress sliders, "Why It Matters" purpose cards, and "Next Action" focus.

### 4. Permanent Achievements (`/achievements`)
- Seeded with 10 core milestones:
  - **First Day** (Complete first full day)
  - **3-Day Streak** (3 consecutive days)
  - **7-Day Streak** (7 consecutive days)
  - **First 50 DH** (Save 50 DH)
  - **First 100 DH** (Save 100 DH)
  - **Deep Work** (2 hours focused work)
  - **Body Activated** (5 workouts)
  - **Learner** (10 learning sessions)
  - **Explorer** (Visit somewhere new)
  - **Discipline** (Resist a craving or overcome procrastination)
- Auto-unlocking evaluator with confetti celebration modal.

### 5. Freedom Fund & Life Points (`/freedom-fund`)
- Money saved instead of spending on weed or impulsive luxuries.
- Flexible daily target: 5 DH to 20 DH.
- Formula: **Every 5 DH saved = 1 Life Point**.
- 9 Key Milestones: 25, 50, 75, 100, 150, 200, 300, 500, 1000 DH.
- Full transaction ledger and quick-deposit chips.

### 6. Weekly Score & Review (`/weekly`)
- Scorecard tracking XP, completed quests, work/learning hours, workouts, weed-free days.
- Weekly Ranks: **Beginner** (0–49), **Starter** (50–99), **Warrior** (100–199), **Elite** (200–299), **Legendary** (300+ XP).
- Interactive Recharts (Daily XP bar chart & Savings growth curve).
- Player reflection form + **Boss Weekly Review** display.

### 7. Progress Analytics (`/progress`)
- Line charts for XP over time and Money saved over time.
- Bar chart for weekly XP pacing.
- Donut chart for life balance across categories.
- Goal progress meters and achievement completion percentage.

### 8. Today Focus Mode (`/today`)
- Clean to-do list showing only tasks due today and pending completion.
- Priorities: Important (+15 XP), Normal (+10 XP), Easy (+5 XP).

### 9. Rewards Vault (`/rewards`)
- XP-unlocked redemption catalog (50 XP Movie Night, 100 XP Favorite Meal, 200 XP Gear, 300 XP Exploration, 500 XP Milestone).
- 10 free wholesome dopamine alternatives (Sunset, guitar, outdoor photography, chess, reading outside, etc.).

### 10. Craving Emergency Menu ("I Want To Smoke")
- Immediate modal categorized by duration:
  - **5-minute interventions** (Push-ups, shower, tea, clean desk, pray, walk outside...)
  - **20-minute resets** (Brisk walk, workout, guitar, chess, cook...)
  - **1-hour immersions** (Gym, ELITDIGI sprint, coding, sports, explore city...)
  - **2–3-hour power sprints** (Deep work, client deliverables, learn a skill...)
- "I Did This Instead" 1-click execution: logs victory to activity log, awards XP, and deposits 20 DH into Freedom Fund.

### 11. Boss Accountability Control Center (`/boss`)
- **Boss Overview (`/boss`):** Player snapshot, performance metrics, and neutral "Needs Attention" alerts.
- **Player Audit (`/boss/player`):** Review completed tasks and notes, 1-click approve, award bonus XP, send feedback.
- **Award Boss XP (`/boss/awards`):** Select +5, +10, +20, +50, +100, or Custom with standard reasons ("Excellent consistency", "Completed a difficult goal", etc.) and mentor notes.
- **Boss Challenges (`/boss/challenges`):** Issue custom time-boxed missions with XP rewards.
- **Weekly Boss Evaluation (`/boss/weekly-review`):** Complete weekly mentor reviews with star ratings and next week's priorities.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (Turbopack, App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with dark RPG HUD design system
- **Charts:** Recharts
- **Celebration Effects:** Canvas Confetti
- **Icons:** Lucide React
- **Database & Auth:** Supabase (PostgreSQL with Row Level Security) + Local-First Fallback
- **PWA:** Web App Manifest & Service Worker ready

---

## 💻 Getting Started Locally

### 1. Clone & Install
```bash
cd lifegame.web
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

The application starts immediately in **Local-First Demo Mode**, pre-populated with Level 7 stats, quests, goals, achievements, and Freedom Fund entries.

### 3. Switch Roles
Use the **Role Switcher** in the top navigation bar or log in at `/login`:
- **Enter as Player (Ayman):** Complete quests, track habits, save DH.
- **Enter as Boss (Commander Elena):** Oversee player, audit activities, award Boss XP, and send feedback.

---

## 🗄️ Supabase Cloud Setup (Optional)

To connect your own Supabase PostgreSQL database:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and run the migration script located at:
   ```text
   supabase/migrations/001_initial_schema.sql
   ```
3. Copy your project credentials and add them to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Restart your Next.js server (`npm run dev`).

---

## 🔔 Browser Notifications (Africa/Casablanca)

Configure in `/settings`:
- Default schedule: **09:00 to 00:00**
- Interval: **Every 30 minutes**
- Timezone: `Africa/Casablanca`
- Message: *"Read your LIFE RPG plan and choose your next action."*
- Click **Request Permission** and test instant notification delivery.

---

## 🚢 Production Build & Deployment

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Environment Variables.
4. Deploy with zero configuration.
