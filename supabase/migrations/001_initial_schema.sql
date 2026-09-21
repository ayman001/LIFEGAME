-- ====================================================================
-- LIFE RPG — LEVEL UP & BOSS ACCOUNTABILITY SYSTEM
-- Supabase PostgreSQL Schema & Row Level Security (RLS) Migrations
-- ====================================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. USER PROFILES
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  role text not null check (role in ('player', 'boss')),
  avatar_url text,
  title text default 'Level 1 Adventurer',
  total_xp integer default 0,
  life_points integer default 0,
  streak integer default 0,
  total_saved_dh numeric(10, 2) default 0.00,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. BOSS-PLAYER RELATIONSHIPS
create table if not exists public.boss_player_relationships (
  id uuid primary key default gen_random_uuid(),
  boss_id uuid not null references public.user_profiles(id) on delete cascade,
  player_id uuid not null references public.user_profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'paused', 'terminated')),
  assigned_at timestamptz default now(),
  unique(boss_id, player_id)
);

-- 3. QUESTS
create table if not exists public.quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  name text not null,
  category text not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard', 'major')),
  xp_reward integer not null,
  money_saved numeric(10, 2) default 0.00,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  notes text,
  is_boss_challenge boolean default false,
  boss_challenge_id uuid,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- 4. GOALS
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  name text not null,
  type text not null check (type in ('short-term', 'mid-term', 'long-term')),
  category text not null,
  deadline timestamptz not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed', 'paused')),
  progress integer default 0 check (progress >= 0 and progress <= 100),
  xp_reward integer not null,
  why_it_matters text not null,
  next_action text not null,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- 5. ACHIEVEMENTS
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  code text not null,
  name text not null,
  description text not null,
  category text not null,
  xp_reward integer not null,
  unlock_condition text not null,
  status text not null default 'locked' check (status in ('locked', 'in_progress', 'unlocked')),
  unlocked_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, code)
);

-- 6. FREEDOM FUND ENTRIES
create table if not exists public.freedom_fund_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  date date not null default current_date,
  amount_dh numeric(10, 2) not null check (amount_dh >= 0),
  reason text not null check (reason in ('instead_of_weed', 'avoided_unnecessary_spending', 'extra_saving', 'other')),
  notes text,
  life_points integer not null default 0,
  created_at timestamptz default now()
);

-- 7. TODAY TASKS (TO-DO)
create table if not exists public.today_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  task text not null,
  priority text not null check (priority in ('Important', 'Normal', 'Easy')),
  due_date date not null default current_date,
  category text not null,
  completed boolean not null default false,
  xp_reward integer not null default 5,
  created_at timestamptz default now()
);

-- 8. ACTIVITY LOGS
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  name text not null,
  category text not null,
  notes text,
  xp_earned integer not null default 0,
  money_saved numeric(10, 2) default 0.00,
  source text not null default 'player' check (source in ('player', 'boss_award', 'craving_resisted')),
  related_quest_id uuid references public.quests(id) on delete set null,
  related_goal_id uuid references public.goals(id) on delete set null,
  created_at timestamptz default now()
);

-- 9. BOSS XP AWARDS (IMMUTABLE AUDIT LOG)
create table if not exists public.boss_xp_awards (
  id uuid primary key default gen_random_uuid(),
  boss_id uuid not null references public.user_profiles(id) on delete restrict,
  player_id uuid not null references public.user_profiles(id) on delete cascade,
  amount integer not null check (amount > 0),
  reason text not null,
  note text,
  created_at timestamptz default now()
);

-- 10. BOSS FEEDBACK
create table if not exists public.boss_feedback (
  id uuid primary key default gen_random_uuid(),
  boss_id uuid not null references public.user_profiles(id) on delete cascade,
  player_id uuid not null references public.user_profiles(id) on delete cascade,
  target_type text not null check (target_type in ('activity', 'quest', 'goal', 'general')),
  target_id uuid,
  target_title text,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read')),
  created_at timestamptz default now()
);

-- 11. BOSS CHALLENGES
create table if not exists public.boss_challenges (
  id uuid primary key default gen_random_uuid(),
  boss_id uuid not null references public.user_profiles(id) on delete cascade,
  player_id uuid not null references public.user_profiles(id) on delete cascade,
  title text not null,
  description text not null,
  xp_reward integer not null,
  deadline timestamptz not null,
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard', 'major')),
  status text not null default 'active' check (status in ('active', 'completed', 'reviewed')),
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- 12. BOSS WEEKLY REVIEWS
create table if not exists public.boss_weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  boss_id uuid not null references public.user_profiles(id) on delete cascade,
  player_id uuid not null references public.user_profiles(id) on delete cascade,
  week_id text not null,
  what_went_well text not null,
  needs_improvement text not null,
  next_priority text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz default now(),
  unique(player_id, week_id)
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.user_profiles enable row level security;
alter table public.boss_player_relationships enable row level security;
alter table public.quests enable row level security;
alter table public.goals enable row level security;
alter table public.achievements enable row level security;
alter table public.freedom_fund_entries enable row level security;
alter table public.today_tasks enable row level security;
alter table public.activity_logs enable row level security;
alter table public.boss_xp_awards enable row level security;
alter table public.boss_feedback enable row level security;
alter table public.boss_challenges enable row level security;
alter table public.boss_weekly_reviews enable row level security;

-- Helper function to check if current user is Boss of a player
create or replace function public.is_boss_of(target_player_id uuid)
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.boss_player_relationships
    where boss_id = auth.uid() and player_id = target_player_id and status = 'active'
  );
end;
$$ language plpgsql;

-- User Profiles: Users can read own profile; Boss can read assigned players
create policy "Read own or assigned profile" on public.user_profiles
  for select using (auth.uid() = id or public.is_boss_of(id));

create policy "Update own profile" on public.user_profiles
  for update using (auth.uid() = id);

-- Quests: Player manages own quests; Boss can read assigned player quests
create policy "Players manage own quests" on public.quests
  for all using (auth.uid() = user_id);

create policy "Boss view assigned player quests" on public.quests
  for select using (public.is_boss_of(user_id));

-- Goals: Player manages own goals; Boss can view
create policy "Players manage own goals" on public.goals
  for all using (auth.uid() = user_id);

create policy "Boss view assigned player goals" on public.goals
  for select using (public.is_boss_of(user_id));

-- Achievements: Player reads own achievements; Boss can view
create policy "Players manage own achievements" on public.achievements
  for all using (auth.uid() = user_id);

create policy "Boss view assigned player achievements" on public.achievements
  for select using (public.is_boss_of(user_id));

-- Freedom Fund: Player manages own savings; Boss can view
create policy "Players manage freedom fund" on public.freedom_fund_entries
  for all using (auth.uid() = user_id);

create policy "Boss view assigned player freedom fund" on public.freedom_fund_entries
  for select using (public.is_boss_of(user_id));

-- Today Tasks: Player manages tasks; Boss can view
create policy "Players manage today tasks" on public.today_tasks
  for all using (auth.uid() = user_id);

create policy "Boss view assigned player tasks" on public.today_tasks
  for select using (public.is_boss_of(user_id));

-- Activity Logs: Player manages activity logs; Boss can view
create policy "Players view and insert activity logs" on public.activity_logs
  for all using (auth.uid() = user_id);

create policy "Boss view assigned player activity logs" on public.activity_logs
  for select using (public.is_boss_of(user_id));

-- BOSS XP AWARDS:
-- Boss can INSERT awards for assigned player.
-- Boss & Player can SELECT.
-- Player CANNOT INSERT, UPDATE, or DELETE!
create policy "Read boss xp awards" on public.boss_xp_awards
  for select using (auth.uid() = player_id or auth.uid() = boss_id);

create policy "Boss insert xp awards" on public.boss_xp_awards
  for insert with check (auth.uid() = boss_id and public.is_boss_of(player_id));

-- BOSS FEEDBACK:
create policy "Read boss feedback" on public.boss_feedback
  for select using (auth.uid() = player_id or auth.uid() = boss_id);

create policy "Boss insert and update feedback" on public.boss_feedback
  for all using (auth.uid() = boss_id and public.is_boss_of(player_id));

-- BOSS CHALLENGES:
create policy "Read boss challenges" on public.boss_challenges
  for select using (auth.uid() = player_id or auth.uid() = boss_id);

create policy "Boss manage challenges" on public.boss_challenges
  for all using (auth.uid() = boss_id and public.is_boss_of(player_id));

create policy "Player mark boss challenge complete" on public.boss_challenges
  for update using (auth.uid() = player_id) with check (status in ('active', 'completed'));

-- BOSS WEEKLY REVIEWS:
create policy "Read weekly reviews" on public.boss_weekly_reviews
  for select using (auth.uid() = player_id or auth.uid() = boss_id);

create policy "Boss create weekly reviews" on public.boss_weekly_reviews
  for all using (auth.uid() = boss_id and public.is_boss_of(player_id));
