export type UserRole = 'player' | 'boss';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  title: string;
  level: number;
  totalXP: number;
  lifePoints: number;
  streak: number;
  totalSavedDH: number;
  weedFreeDays: number;
  workHours: number;
  learningHours: number;
  workoutsCount: number;
  goalsCompletedCount: number;
  bossName: string;
  bossStatus: 'active' | 'observing' | 'offline';
  lastBossFeedback?: string;
  lastReviewDate?: string;
}

export type QuestCategory =
  | 'Faith' | 'إيمان'
  | 'Mind' | 'عقل'
  | 'Health' | 'صحة'
  | 'Work' | 'عمل'
  | 'Learning' | 'تعلّم'
  | 'Money' | 'مال'
  | 'Relationships' | 'علاقات'
  | 'Life / Experiences' | 'حياة وتجارب';

export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'major';

export type QuestStatus = 'not_started' | 'in_progress' | 'completed';

export interface QuestObjective {
  id: string;
  title: string;
  completed: boolean;
}

export interface Quest {
  id: string;
  name: string;
  category: QuestCategory;
  date: string; // YYYY-MM-DD
  status: QuestStatus;
  difficulty: QuestDifficulty;
  xpReward: number; // 5, 10, 20, 50
  moneySaved: number;
  notes: string; // "What did you do?"
  completedAt?: string;
  xpEarned: number;
  isDailyMission?: boolean;
  missionSlot?: 'main' | 'daily_1' | 'daily_2' | 'daily_3' | 'health' | 'work_learn' | 'faith_personal';
  timeSlot?: string; // e.g. "12:00 PM"
  objectives?: QuestObjective[];
  isBossChallenge?: boolean;
  bossChallengeId?: string;
}

export interface DisciplineRule {
  id: string;
  title: string;
  penaltyXP: number;
  rewardXP: number;
  statusToday: 'resisted' | 'broken' | 'pending';
  streakDays: number;
}

export interface Chapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  status: 'locked' | 'active' | 'completed';
  progress: number;
  requiredLevel: number;
  description: string;
}

export interface ProgressNode {
  day: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  xpEarned: number;
  dateStr: string;
}

export interface RandomMission {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  xpReward: number;
  category: string;
}


export type GoalType = 'short-term' | 'mid-term' | 'long-term';

export type GoalCategory =
  | 'Health' | 'صحة'
  | 'Faith' | 'إيمان'
  | 'Money' | 'مال'
  | 'Career' | 'مسار مهني'
  | 'ELITDIGI'
  | 'Learning' | 'تعلّم'
  | 'Relationships' | 'علاقات'
  | 'Personal Growth' | 'تطوير الذات'
  | 'Experiences' | 'تجارب';

export type GoalStatus = 'not_started' | 'in_progress' | 'completed' | 'paused';

export interface Goal {
  id: string;
  name: string;
  type: GoalType;
  category: GoalCategory;
  deadline: string;
  status: GoalStatus;
  progress: number; // 0 - 100
  xpReward: number;
  whyItMatters: string;
  nextAction: string;
  completedAt?: string;
}

export type AchievementStatus = 'locked' | 'in_progress' | 'unlocked';

export interface Achievement {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  xpReward: number;
  unlockCondition: string;
  status: AchievementStatus;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
  iconName: string;
}

export type FreedomReason =
  | 'instead_of_weed'
  | 'avoided_unnecessary_spending'
  | 'extra_saving'
  | 'other';

export interface FreedomFundEntry {
  id: string;
  date: string;
  amountDH: number;
  reason: FreedomReason;
  notes: string;
  runningTotalDH: number;
  lifePointsEarned: number; // 5 DH = 1 Life Point
  rewardTarget?: string;
  milestoneReached?: string;
  createdAt: string;
}

export type WeeklyRank = 'Beginner' | 'Starter' | 'Warrior' | 'Elite' | 'Legendary';

export interface WeeklyScoreRecord {
  weekId: string; // e.g. 2026-W38
  weekStartDate: string;
  xpEarned: number;
  bossXPEarned: number;
  completedQuests: number;
  completedDays: number;
  moneySavedDH: number;
  workHours: number;
  learningHours: number;
  workoutsCount: number;
  weedFreeDays: number;
  personalAchievements: string[];
  weeklyScore: number;
  weeklyRank: WeeklyRank;
  playerReflection?: {
    wins: string;
    challenges: string;
    nextWeekPriority: string;
  };
  bossReview?: BossWeeklyReview;
}

export type TaskPriority = 'Important' | 'Normal' | 'Easy';

export interface TodayTask {
  id: string;
  task: string;
  priority: TaskPriority;
  dueDate: string;
  category: string;
  completed: boolean;
  xpReward: number; // 15, 10, 5
  xpEarned: number;
  completedAt?: string;
  isObligatory?: boolean; // Repeating obligatory daily ritual
  penaltyXP?: number;     // Penalty if midnight passes uncompleted
}

export type LifePlanPriority = 'critical' | 'high' | 'medium';
export type LifePlanStatus = 'pending' | 'completed' | 'overdue';

export interface LifePlanTask {
  id: string;
  title: string;
  project: string; // e.g., 'ELITDIGI', 'برمجة', 'عمل حر', 'تطوير أعمال'
  deadline: string; // YYYY-MM-DDTHH:mm or ISO string
  priority: LifePlanPriority;
  xpReward: number;  // XP awarded if completed on time
  penaltyXP: number; // XP deducted if deadline passed without completion
  status: LifePlanStatus;
  completedAt?: string;
  failedAt?: string;
  penalized?: boolean;
  notes?: string;
}

export interface MidnightPenaltyReview {
  date: string;
  missedCount: number;
  penalizedXP: number;
  missedTaskTitles: string[];
}

export interface Reward {
  id: string;
  name: string;
  costXP?: number;
  costDH?: number;
  description: string;
  isFree: boolean;
  unlocked: boolean;
  redeemed: boolean;
  redeemedAt?: string;
  category: string;
}

export interface ActivityLog {
  id: string;
  name: string;
  dateTime: string;
  category: string;
  notes: string;
  xpEarned: number;
  moneySaved: number;
  relatedQuestId?: string;
  relatedGoalId?: string;
  source: 'player' | 'boss_award' | 'craving_resisted';
}

// BOSS ACCOUNTABILITY SYSTEM INTERFACES
export interface BossXPAward {
  id: string;
  bossId: string;
  bossName: string;
  playerId: string;
  amount: number;
  reason: string;
  note?: string;
  createdAt: string;
}

export interface BossFeedback {
  id: string;
  bossId: string;
  bossName: string;
  playerId: string;
  targetType: 'activity' | 'quest' | 'goal' | 'general';
  targetId?: string;
  targetTitle?: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

export interface BossChallenge {
  id: string;
  bossId: string;
  bossName: string;
  playerId: string;
  title: string;
  description: string;
  xpReward: number;
  deadline: string;
  difficulty: QuestDifficulty;
  status: 'active' | 'completed' | 'reviewed';
  completedAt?: string;
  createdAt: string;
}

export interface BossWeeklyReview {
  id: string;
  bossId: string;
  bossName: string;
  playerId: string;
  weekId: string;
  whatWentWell: string;
  needsImprovement: string;
  nextPriority: string;
  rating: number; // 1 - 5
  createdAt: string;
}

export interface BossNeedsAttentionItem {
  id: string;
  type: 'uncompleted_task' | 'overdue_goal' | 'low_activity' | 'broken_consistency' | 'pending_review';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  date?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "00:00"
  intervalMinutes: number; // 30
  timezone: string; // "Africa/Casablanca"
  reminderMessage: string;
}
