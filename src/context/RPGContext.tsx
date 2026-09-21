'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import XpParticleEffect, { XpNotification } from '@/components/game/XpParticleEffect';
import LevelUpModal from '@/components/game/LevelUpModal';
import {
  UserProfile,
  UserRole,
  Quest,
  Goal,
  Achievement,
  FreedomFundEntry,
  FreedomReason,
  TodayTask,
  Reward,
  ActivityLog,
  BossXPAward,
  BossFeedback,
  BossChallenge,
  BossWeeklyReview,
  WeeklyScoreRecord,
  NotificationSettings,
  QuestDifficulty,
  DisciplineRule,
  RandomMission,
  LifePlanTask,
  MidnightPenaltyReview
} from '@/types';
import MidnightPenaltyModal from '@/components/game/MidnightPenaltyModal';

import {
  INITIAL_PLAYER_PROFILE,
  INITIAL_BOSS_PROFILE,
  INITIAL_QUESTS,
  INITIAL_GOALS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_FREEDOM_ENTRIES,
  INITIAL_TODAY_TASKS,
  INITIAL_LIFE_PLAN_TASKS,
  INITIAL_REWARDS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_BOSS_XP_AWARDS,
  INITIAL_BOSS_FEEDBACK,
  INITIAL_BOSS_CHALLENGES,
  INITIAL_WEEKLY_SCORE
} from '@/lib/mock-data';
import {
  calculateLevel,
  calculateWeeklyRank,
  evaluateAchievements,
  FREEDOM_FUND_MILESTONES
} from '@/lib/rpg-engine';

interface CelebrationState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'level_up' | 'achievement' | 'boss_award' | 'general';
}

interface RPGContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  playerProfile: UserProfile;
  bossProfile: UserProfile;
  quests: Quest[];
  goals: Goal[];
  achievements: Achievement[];
  freedomEntries: FreedomFundEntry[];
  todayTasks: TodayTask[];
  rewards: Reward[];
  activityLogs: ActivityLog[];
  bossAwards: BossXPAward[];
  bossFeedback: BossFeedback[];
  bossChallenges: BossChallenge[];
  weeklyScore: WeeklyScoreRecord;
  notificationSettings: NotificationSettings;
  celebration: CelebrationState | null;
  closeCelebration: () => void;
  
  // Actions
  completeQuest: (id: string, notes?: string) => void;
  uncompleteQuest: (id: string) => void;
  addCustomQuest: (quest: {
    name: string;
    category: Quest['category'];
    difficulty: QuestDifficulty;
    notes?: string;
    moneySaved?: number;
  }) => void;
  editQuest: (id: string, updates: Partial<Quest>) => void;
  deleteQuest: (id: string) => void;

  toggleTask: (id: string) => void;
  addTask: (task: { task: string; priority: TodayTask['priority']; category: string; dueDate?: string }) => void;
  deleteTask: (id: string) => void;

  updateGoalProgress: (id: string, progress: number) => void;
  completeGoal: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'completedAt'>) => void;
  deleteGoal: (id: string) => void;

  addFreedomEntry: (data: { amountDH: number; reason: FreedomReason; notes: string }) => void;

  // Boss Actions
  awardBossXP: (amount: number, reason: string, note?: string) => void;
  addBossChallenge: (challenge: {
    title: string;
    description: string;
    xpReward: number;
    deadline: string;
    difficulty: QuestDifficulty;
  }) => void;
  addBossFeedback: (message: string, targetType?: 'activity' | 'quest' | 'goal' | 'general', targetId?: string) => void;
  submitBossWeeklyReview: (review: {
    whatWentWell: string;
    needsImprovement: string;
    nextPriority: string;
    rating: number;
  }) => void;

  // Emergency craving action
  resistCraving: (actionName: string, durationLabel: string, note?: string) => void;
  logActivity: (name: string, category: string, notes: string, xpEarned?: number, moneySaved?: number) => void;
  redeemReward: (id: string) => void;
  addCustomReward: (reward: { name: string; costXP?: number; costDH?: number; description: string; isFree: boolean; category: string }) => void;
  // Discipline Game additions
  soundEnabled: boolean;
  toggleSound: () => void;
  triggerXpNotification: (text: string, type?: 'xp' | 'bonus' | 'boss' | 'miss') => void;
  disciplineRules: DisciplineRule[];
  resistRule: (id: string) => void;
  breakRule: (id: string) => void;
  acceptRandomMission: (mission: RandomMission) => void;
  dailyBonusClaimed: boolean;
  claimDailyBonus: () => void;

  // Life Plan & Midnight Cycle additions
  lifePlanTasks: LifePlanTask[];
  addLifePlanTask: (task: Omit<LifePlanTask, 'id' | 'status' | 'penalized'>) => void;
  completeLifePlanTask: (id: string) => void;
  deleteLifePlanTask: (id: string) => void;
  checkLifePlanDeadlines: () => void;
  midnightPenaltyReview: MidnightPenaltyReview | null;
  closeMidnightPenaltyModal: () => void;
  simulateMidnightCycle: () => void;
  lastActiveDate: string;

  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  resetAllData: () => void;
}


const STORAGE_KEY = 'LIFE_RPG_DISCIPLINE_V3';

const defaultNotificationSettings: NotificationSettings = {
  enabled: true,
  startTime: '09:00',
  endTime: '00:00',
  intervalMinutes: 30,
  timezone: 'Africa/Casablanca',
  reminderMessage: 'Read your LIFE RPG plan and choose your next action.'
};

const RPGContext = createContext<RPGContextType | undefined>(undefined);

export function RPGProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('player');
  const [playerProfile, setPlayerProfile] = useState<UserProfile>(INITIAL_PLAYER_PROFILE);
  const [bossProfile] = useState<UserProfile>(INITIAL_BOSS_PROFILE);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [freedomEntries, setFreedomEntries] = useState<FreedomFundEntry[]>(INITIAL_FREEDOM_ENTRIES);
  const [todayTasks, setTodayTasks] = useState<TodayTask[]>(INITIAL_TODAY_TASKS);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [bossAwards, setBossAwards] = useState<BossXPAward[]>(INITIAL_BOSS_XP_AWARDS);
  const [bossFeedback, setBossFeedback] = useState<BossFeedback[]>(INITIAL_BOSS_FEEDBACK);
  const [bossChallenges, setBossChallenges] = useState<BossChallenge[]>(INITIAL_BOSS_CHALLENGES);
  const [weeklyScore, setWeeklyScore] = useState<WeeklyScoreRecord>(INITIAL_WEEKLY_SCORE);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings);
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);

  // Discipline Game additions
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sound.isEnabled;
    }
    return true;
  });
  const [xpNotifications, setXpNotifications] = useState<XpNotification[]>([]);
  const [levelUpModal, setLevelUpModal] = useState<{ isOpen: boolean; newLevel: number }>({
    isOpen: false,
    newLevel: 1
  });
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState<boolean>(false);
  const [disciplineRules, setDisciplineRules] = useState<DisciplineRule[]>([
    {
      id: 'rule-1',
      title: 'لا تصفح عشوائي للهاتف قبل إنهاء جلسة العمل الأولى',
      penaltyXP: 5,
      rewardXP: 5,
      statusToday: 'pending',
      streakDays: 0
    },
    {
      id: 'rule-2',
      title: 'لا سكريات أو وجبات سريعة بعد الساعة 8 مساءً',
      penaltyXP: 5,
      rewardXP: 5,
      statusToday: 'pending',
      streakDays: 0
    },
    {
      id: 'rule-3',
      title: 'لا سهر بعد منتصف الليل بدون عذر قهري',
      penaltyXP: 5,
      rewardXP: 5,
      statusToday: 'pending',
      streakDays: 0
    }
  ]);

  // Life Plan & Midnight Cycle state
  const [lifePlanTasks, setLifePlanTasks] = useState<LifePlanTask[]>(INITIAL_LIFE_PLAN_TASKS);
  const [lastActiveDate, setLastActiveDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [midnightPenaltyReview, setMidnightPenaltyReview] = useState<MidnightPenaltyReview | null>(null);

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.setEnabled(next);
    setSoundEnabledState(next);
    if (next) sound.playTaskComplete();
  };

  const triggerXpNotification = (text: string, type: 'xp' | 'bonus' | 'boss' | 'miss' = 'xp') => {
    const id = `xpn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setXpNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setXpNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 1800);
  };

  const resistRule = (ruleId: string) => {
    setDisciplineRules((prev) =>
      prev.map((r) =>
        r.id === ruleId
          ? { ...r, statusToday: 'resisted' as const, streakDays: r.streakDays + 1 }
          : r
      )
    );
    addXPToPlayer(5, 'Resisted distraction rule');
    triggerXpNotification('✓ قاومت (+5 XP)', 'xp');
  };

  const breakRule = (ruleId: string) => {
    setDisciplineRules((prev) =>
      prev.map((r) =>
        r.id === ruleId
          ? { ...r, statusToday: 'broken' as const, streakDays: 0 }
          : r
      )
    );
    setPlayerProfile((prev) => {
      const newXP = Math.max(0, prev.totalXP - 5);
      return { ...prev, totalXP: newXP };
    });
    triggerXpNotification('✕ انكسرت القاعدة (-5 XP)', 'miss');
  };

  const acceptRandomMission = (mission: RandomMission) => {
    const newTask: TodayTask = {
      id: `task_random_${Date.now()}`,
      task: mission.title,
      priority: 'Important',
      dueDate: 'Today',
      category: mission.category,
      completed: false,
      xpReward: mission.xpReward,
      xpEarned: 0
    };
    setTodayTasks((prev) => [newTask, ...prev]);
    triggerXpNotification(`تم قبول مهمة الفراغ: +${mission.xpReward} XP`, 'bonus');
  };

  const claimDailyBonus = () => {
    if (dailyBonusClaimed) return;
    sound.playLevelUp();
    addXPToPlayer(25, 'Daily 100% Completion Bonus');
    setDailyBonusClaimed(true);
    triggerXpNotification('+25 BONUS XP — اكتملت مهام اليوم', 'bonus');
  };

  // Load from localStorage on mount (async to prevent cascading renders)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.playerProfile) setPlayerProfile(parsed.playerProfile);
          if (parsed.quests) setQuests(parsed.quests);
          if (parsed.goals) setGoals(parsed.goals);
          if (parsed.achievements) setAchievements(parsed.achievements);
          if (parsed.freedomEntries) setFreedomEntries(parsed.freedomEntries);
          if (parsed.todayTasks) setTodayTasks(parsed.todayTasks);
          if (parsed.rewards) setRewards(parsed.rewards);
          if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
          if (parsed.bossAwards) setBossAwards(parsed.bossAwards);
          if (parsed.bossFeedback) setBossFeedback(parsed.bossFeedback);
          if (parsed.bossChallenges) setBossChallenges(parsed.bossChallenges);
          if (parsed.weeklyScore) setWeeklyScore(parsed.weeklyScore);
          if (parsed.notificationSettings) setNotificationSettings(parsed.notificationSettings);
          if (parsed.role) setRole(parsed.role);
          if (parsed.disciplineRules) setDisciplineRules(parsed.disciplineRules);
          if (parsed.lifePlanTasks) setLifePlanTasks(parsed.lifePlanTasks);
          if (parsed.lastActiveDate) setLastActiveDate(parsed.lastActiveDate);
        }
      } catch (e) {
        console.error('Failed to parse saved state from local storage', e);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);


  // Sync to localStorage
  useEffect(() => {
    try {
      const payload = {
        role,
        playerProfile,
        quests,
        goals,
        achievements,
        freedomEntries,
        todayTasks,
        rewards,
        activityLogs,
        bossAwards,
        bossFeedback,
        bossChallenges,
        weeklyScore,
        notificationSettings,
        disciplineRules,
        lifePlanTasks,
        lastActiveDate
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to sync to local storage', e);
    }
  }, [
    role,
    playerProfile,
    quests,
    goals,
    achievements,
    freedomEntries,
    todayTasks,
    rewards,
    activityLogs,
    bossAwards,
    bossFeedback,
    bossChallenges,
    weeklyScore,
    notificationSettings,
    disciplineRules,
    lifePlanTasks,
    lastActiveDate
  ]);

  const fireConfetti = () => {
    if (typeof window !== 'undefined') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#38bdf8', '#10b981', '#f59e0b', '#ec4899']
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const triggerCelebrationModal = (title: string, message: string, type: CelebrationState['type'] = 'general') => {
    setCelebration({ isOpen: true, title, message, type });
    fireConfetti();
  };

  const closeCelebration = () => {
    setCelebration(null);
  };

  // Helper to add XP and check Level Up
  const addXPToPlayer = (xpToAdd: number, _reason?: string) => {
    void _reason;
    setPlayerProfile((prev) => {


      const oldLevel = prev.level;
      const newTotalXP = prev.totalXP + xpToAdd;
      const newLevel = calculateLevel(newTotalXP);
      const newWeeklyXP = weeklyScore.xpEarned + xpToAdd;

      // Update weekly score record
      setWeeklyScore((wPrev) => ({
        ...wPrev,
        xpEarned: newWeeklyXP,
        weeklyRank: calculateWeeklyRank(newWeeklyXP)
      }));

      // Check level up celebration
      if (newLevel > oldLevel) {
        setTimeout(() => {
          setLevelUpModal({ isOpen: true, newLevel });
        }, 150);
      }


      return {
        ...prev,
        totalXP: newTotalXP,
        level: newLevel,
        title: `Disciplined Ascendant (Level ${newLevel})`
      };
    });
  };

  // Helper to check achievements
  const checkAchievementsAfterAction = (currentProfile: UserProfile, currentQuests: Quest[]) => {
    const completedCount = currentQuests.filter((q) => q.status === 'completed').length;
    const { updatedAchievements, newlyUnlocked } = evaluateAchievements(achievements, {
      totalSavedDH: currentProfile.totalSavedDH,
      streak: currentProfile.streak,
      workoutsCount: currentProfile.workoutsCount,
      learningHours: currentProfile.learningHours,
      workHours: currentProfile.workHours,
      completedQuestsCount: completedCount,
      cravingsResistedCount: activityLogs.filter((a) => a.source === 'craving_resisted').length
    });

    if (newlyUnlocked.length > 0) {
      setAchievements(updatedAchievements);
      newlyUnlocked.forEach((ach) => {
        addXPToPlayer(ach.xpReward, `Achievement: ${ach.name}`);
        setTimeout(() => {
          triggerCelebrationModal(
            `ACHIEVEMENT UNLOCKED: ${ach.name.toUpperCase()}!`,
            `${ach.description} (+${ach.xpReward} XP awarded)`,
            'achievement'
          );
        }, 300);
      });
    }
  };

  // 1. Quests Handlers
  const completeQuest = (id: string, notes?: string) => {
    setQuests((prev) => {
      const target = prev.find((q) => q.id === id);
      if (!target || target.status === 'completed') return prev; // Avoid duplicate XP

      const updated = prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            status: 'completed' as const,
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            notes: notes !== undefined ? notes : q.notes,
            xpEarned: q.xpReward
          };
        }
        return q;
      });

      // Sound and Floating XP
      sound.playXpGain();
      triggerXpNotification(`+${target.xpReward} XP`, 'xp');

      // Award XP
      addXPToPlayer(target.xpReward, `Quest: ${target.name}`);


      // Log activity
      const newLog: ActivityLog = {
        id: `act_${Date.now()}`,
        name: `Completed quest: ${target.name}`,
        dateTime: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        category: target.category,
        notes: notes || target.notes || 'Executed with focus.',
        xpEarned: target.xpReward,
        moneySaved: target.moneySaved || 0,
        source: 'player',
        relatedQuestId: target.id
      };
      setActivityLogs((aPrev) => [newLog, ...aPrev]);

      // If money was saved in this quest, add to freedom fund automatically
      if (target.moneySaved && target.moneySaved > 0) {
        addFreedomEntry({
          amountDH: target.moneySaved,
          reason: 'avoided_unnecessary_spending',
          notes: `Saved via quest: ${target.name}`
        });
      }

      // Check category increments
      if (target.category === 'Health') {
        setPlayerProfile((p) => ({ ...p, workoutsCount: p.workoutsCount + 1 }));
      } else if (target.category === 'Learning') {
        setPlayerProfile((p) => ({ ...p, learningHours: p.learningHours + 1 }));
      } else if (target.category === 'Work') {
        setPlayerProfile((p) => ({ ...p, workHours: p.workHours + 1 }));
      }

      setTimeout(() => {
        checkAchievementsAfterAction(playerProfile, updated);
      }, 100);

      return updated;
    });
  };

  const uncompleteQuest = (id: string) => {
    setQuests((prev) => {
      const target = prev.find((q) => q.id === id);
      if (!target || target.status !== 'completed') return prev;

      const xpToSubtract = target.xpEarned || target.xpReward;

      // Revert XP cleanly without duplicating or going negative
      setPlayerProfile((pPrev) => {
        const newTotal = Math.max(0, pPrev.totalXP - xpToSubtract);
        const newLvl = calculateLevel(newTotal);
        return {
          ...pPrev,
          totalXP: newTotal,
          level: newLvl
        };
      });

      return prev.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            status: 'not_started' as const,
            completedAt: undefined,
            xpEarned: 0
          };
        }
        return q;
      });
    });
  };

  const addCustomQuest = (questData: {
    name: string;
    category: Quest['category'];
    difficulty: QuestDifficulty;
    notes?: string;
    moneySaved?: number;
  }) => {
    const xpMap: Record<QuestDifficulty, number> = {
      easy: 5,
      medium: 10,
      hard: 20,
      major: 50
    };

    const newQuest: Quest = {
      id: `q_custom_${Date.now()}`,
      name: questData.name,
      category: questData.category,
      date: new Date().toISOString().split('T')[0],
      status: 'not_started',
      difficulty: questData.difficulty,
      xpReward: xpMap[questData.difficulty],
      moneySaved: questData.moneySaved || 0,
      notes: questData.notes || '',
      xpEarned: 0,
      isDailyMission: false
    };

    setQuests((prev) => [newQuest, ...prev]);
  };

  const editQuest = (id: string, updates: Partial<Quest>) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuest = (id: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  };

  // 2. Today Tasks
  const toggleTask = (id: string) => {
    setTodayTasks((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target) return prev;

      const willBeCompleted = !target.completed;
      if (willBeCompleted) {
        sound.playTaskComplete();
        triggerXpNotification(`+${target.xpReward} XP`, 'xp');
        addXPToPlayer(target.xpReward, `Task: ${target.task}`);
      } else {
        sound.playMissedTask();
        triggerXpNotification(`-${target.xpReward} XP`, 'miss');
        // clean reversal
        setPlayerProfile((p) => {
          const newXP = Math.max(0, p.totalXP - target.xpReward);
          return { ...p, totalXP: newXP, level: calculateLevel(newXP) };
        });
      }


      return prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: willBeCompleted,
              xpEarned: willBeCompleted ? t.xpReward : 0,
              completedAt: willBeCompleted
                ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : undefined
            }
          : t
      );
    });
  };

  const addTask = (taskData: { task: string; priority: TodayTask['priority']; category: string; dueDate?: string }) => {
    const xpPriorityMap = { Important: 15, Normal: 10, Easy: 5 };
    const newTask: TodayTask = {
      id: `task_${Date.now()}`,
      task: taskData.task,
      priority: taskData.priority,
      category: taskData.category,
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      xpReward: xpPriorityMap[taskData.priority],
      xpEarned: 0
    };
    setTodayTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTodayTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 3. Goals
  const updateGoalProgress = (id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const clamped = Math.min(100, Math.max(0, progress));
          const shouldComplete = clamped === 100 && g.status !== 'completed';
          if (shouldComplete) {
            completeGoal(id);
          }
          return {
            ...g,
            progress: clamped,
            status: clamped === 100 ? 'completed' : g.status === 'not_started' ? 'in_progress' : g.status
          };
        }
        return g;
      })
    );
  };

  const completeGoal = (id: string) => {
    setGoals((prev) => {
      const target = prev.find((g) => g.id === id);
      if (!target || target.status === 'completed') return prev;

      addXPToPlayer(target.xpReward, `Goal: ${target.name}`);
      setPlayerProfile((p) => ({ ...p, goalsCompletedCount: p.goalsCompletedCount + 1 }));

      triggerCelebrationModal(
        `GOAL COMPLETED: ${target.name.toUpperCase()}!`,
        `Tremendous milestone achieved! (+${target.xpReward} XP awarded)`,
        'general'
      );

      return prev.map((g) =>
        g.id === id
          ? {
              ...g,
              status: 'completed' as const,
              progress: 100,
              completedAt: new Date().toISOString().split('T')[0]
            }
          : g
      );
    });
  };

  const addGoal = (goalData: Omit<Goal, 'id' | 'completedAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `goal_${Date.now()}`
    };
    setGoals((prev) => [newGoal, ...prev]);
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // 4. Freedom Fund
  const addFreedomEntry = (data: { amountDH: number; reason: FreedomReason; notes: string }) => {
    const lifePointsEarned = Math.floor(data.amountDH / 5);
    const newRunningTotal = playerProfile.totalSavedDH + data.amountDH;

    // Check milestone
    let milestoneReached: string | undefined;
    for (const m of FREEDOM_FUND_MILESTONES) {
      if (playerProfile.totalSavedDH < m && newRunningTotal >= m) {
        milestoneReached = `${m} DH Milestone Reached!`;
        break;
      }
    }

    const newEntry: FreedomFundEntry = {
      id: `ff_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amountDH: data.amountDH,
      reason: data.reason,
      notes: data.notes,
      runningTotalDH: newRunningTotal,
      lifePointsEarned,
      milestoneReached,
      createdAt: new Date().toISOString()
    };

    setFreedomEntries((prev) => [newEntry, ...prev]);
    setPlayerProfile((prev) => ({
      ...prev,
      totalSavedDH: newRunningTotal,
      lifePoints: prev.lifePoints + lifePointsEarned
    }));

    if (data.reason === 'instead_of_weed') {
      setPlayerProfile((prev) => ({ ...prev, weedFreeDays: prev.weedFreeDays + 1 }));
    }

    // Award bonus XP for saving discipline
    addXPToPlayer(10, `Freedom Fund deposit: ${data.amountDH} DH`);

    // Log Activity
    setActivityLogs((aPrev) => [
      {
        id: `act_${Date.now()}`,
        name: `Freedom Fund: Saved ${data.amountDH} DH`,
        dateTime: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        category: 'Money',
        notes: data.notes || `Reason: ${data.reason.replace(/_/g, ' ')}`,
        xpEarned: 10,
        moneySaved: data.amountDH,
        source: 'player'
      },
      ...aPrev
    ]);

    if (milestoneReached) {
      triggerCelebrationModal(
        'FREEDOM FUND MILESTONE REACHED!',
        `You have saved ${newRunningTotal} DH! Every dirham not spent is your discipline taking physical form.`,
        'achievement'
      );
    }
  };

  // 5. BOSS ACTIONS (Strict accountability system)
  const awardBossXP = (amount: number, reason: string, note?: string) => {
    const newAward: BossXPAward = {
      id: `baw_${Date.now()}`,
      bossId: bossProfile.id,
      bossName: bossProfile.name,
      playerId: playerProfile.id,
      amount,
      reason,
      note,
      createdAt: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    };

    setBossAwards((prev) => [newAward, ...prev]);

    // Sound and Notification
    sound.playBossVerified();
    triggerXpNotification(`BOSS VERIFIED ✓ +${amount} XP`, 'boss');

    // Apply XP to player
    addXPToPlayer(amount, `BOSS XP: ${reason}`);


    // Update Boss Feedback indicator on Player Profile
    setPlayerProfile((prev) => ({
      ...prev,
      lastBossFeedback: `Awarded +${amount} XP (${reason})`,
      lastReviewDate: 'Just now'
    }));

    // Add to activity log as verified BOSS AWARD
    setActivityLogs((prev) => [
      {
        id: `act_${Date.now()}`,
        name: `BOSS XP AWARDED: +${amount} XP`,
        dateTime: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        category: 'Discipline',
        notes: `${bossProfile.name}: ${reason}${note ? ` — "${note}"` : ''}`,
        xpEarned: amount,
        moneySaved: 0,
        source: 'boss_award'
      },
      ...prev
    ]);

    triggerCelebrationModal(
      `BOSS AWARD CERTIFIED: +${amount} XP`,
      `Commander Elena recognized your discipline: "${reason}". Points added to your total permanent XP.`,
      'boss_award'
    );
  };

  const addBossChallenge = (challengeData: {
    title: string;
    description: string;
    xpReward: number;
    deadline: string;
    difficulty: QuestDifficulty;
  }) => {
    const newChallenge: BossChallenge = {
      id: `bc_${Date.now()}`,
      bossId: bossProfile.id,
      bossName: bossProfile.name,
      playerId: playerProfile.id,
      title: challengeData.title,
      description: challengeData.description,
      xpReward: challengeData.xpReward,
      deadline: challengeData.deadline,
      difficulty: challengeData.difficulty,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBossChallenges((prev) => [newChallenge, ...prev]);

    // Also inject into player quests as a tagged boss quest
    const newQuest: Quest = {
      id: `q_boss_${Date.now()}`,
      name: `BOSS MISSION: ${challengeData.title}`,
      category: 'Work',
      date: new Date().toISOString().split('T')[0],
      status: 'not_started',
      difficulty: challengeData.difficulty,
      xpReward: challengeData.xpReward,
      moneySaved: 0,
      notes: challengeData.description,
      xpEarned: 0,
      isDailyMission: true,
      isBossChallenge: true,
      bossChallengeId: newChallenge.id
    };

    setQuests((qPrev) => [newQuest, ...qPrev]);
  };

  const addBossFeedback = (message: string, targetType: 'activity' | 'quest' | 'goal' | 'general' = 'general', targetId?: string) => {
    const newFeedback: BossFeedback = {
      id: `bfb_${Date.now()}`,
      bossId: bossProfile.id,
      bossName: bossProfile.name,
      playerId: playerProfile.id,
      targetType,
      targetId,
      message,
      createdAt: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: 'unread'
    };

    setBossFeedback((prev) => [newFeedback, ...prev]);
    setPlayerProfile((prev) => ({
      ...prev,
      lastBossFeedback: message,
      lastReviewDate: 'Today'
    }));
  };

  const submitBossWeeklyReview = (review: {
    whatWentWell: string;
    needsImprovement: string;
    nextPriority: string;
    rating: number;
  }) => {
    const newReview: BossWeeklyReview = {
      id: `bwr_${Date.now()}`,
      bossId: bossProfile.id,
      bossName: bossProfile.name,
      playerId: playerProfile.id,
      weekId: weeklyScore.weekId,
      whatWentWell: review.whatWentWell,
      needsImprovement: review.needsImprovement,
      nextPriority: review.nextPriority,
      rating: review.rating,
      createdAt: new Date().toISOString()
    };

    setWeeklyScore((prev) => ({
      ...prev,
      bossReview: newReview
    }));

    setPlayerProfile((prev) => ({
      ...prev,
      lastBossFeedback: review.nextPriority,
      lastReviewDate: 'Week Review Completed'
    }));
  };

  // 6. Craving & Emergency Menu handler
  const resistCraving = (actionName: string, durationLabel: string, note?: string) => {
    const xpReward = durationLabel.includes('5-min')
      ? 15
      : durationLabel.includes('20-min')
      ? 20
      : durationLabel.includes('1-hour')
      ? 35
      : 50;

    addXPToPlayer(xpReward, `Resisted Craving: ${actionName}`);

    setPlayerProfile((prev) => ({
      ...prev,
      weedFreeDays: prev.weedFreeDays + 1,
      streak: prev.streak + 1
    }));

    // Log to activity log
    setActivityLogs((prev) => [
      {
        id: `act_${Date.now()}`,
        name: `Craving Resisted: ${actionName} (${durationLabel})`,
        dateTime: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        category: 'Health',
        notes: note || 'Changed environment immediately. Refused to negotiate with urge.',
        xpEarned: xpReward,
        moneySaved: 20, // Estimated money not spent
        source: 'craving_resisted'
      },
      ...prev
    ]);

    // Automatically deposit saved DH into freedom fund!
    addFreedomEntry({
      amountDH: 20,
      reason: 'instead_of_weed',
      notes: `Immediate win: ${actionName} instead of smoking.`
    });

    triggerCelebrationModal(
      'CRAVING RESISTED: ENVIRONMENT SHIFTED!',
      `You executed "${actionName}" instead of negotiating with an impulse. +${xpReward} XP and 20 DH protected in Freedom Fund!`,
      'general'
    );
  };

  const logActivity = (name: string, category: string, notes: string, xpEarned = 10, moneySaved = 0) => {
    const newLog: ActivityLog = {
      id: `act_${Date.now()}`,
      name,
      dateTime: `Today — ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      category,
      notes,
      xpEarned,
      moneySaved,
      source: 'player'
    };

    setActivityLogs((prev) => [newLog, ...prev]);
    if (xpEarned > 0) addXPToPlayer(xpEarned, name);
  };

  const redeemReward = (id: string) => {
    setRewards((prev) =>
      prev.map((r) => (r.id === id ? { ...r, redeemed: true, redeemedAt: new Date().toISOString() } : r))
    );
  };

  const addCustomReward = (rewardData: {
    name: string;
    costXP?: number;
    costDH?: number;
    description: string;
    isFree: boolean;
    category: string;
  }) => {
    const newRew: Reward = {
      id: `rew_${Date.now()}`,
      ...rewardData,
      unlocked: true,
      redeemed: false
    };
    setRewards((prev) => [newRew, ...prev]);
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings((prev) => ({ ...prev, ...settings }));
  };

  // 6. LIFE PLAN (Working tasks with strict deadlines & -XP penalties)
  const checkLifePlanDeadlines = () => {
    const now = new Date();
    setLifePlanTasks((prev) => {
      let xpToDeduct = 0;
      let hasOverdue = false;

      const updated = prev.map((task) => {
        if (task.status === 'pending' && new Date(task.deadline).getTime() < now.getTime()) {
          xpToDeduct += task.penaltyXP;
          hasOverdue = true;
          return {
            ...task,
            status: 'overdue' as const,
            failedAt: now.toISOString(),
            penalized: true
          };
        }
        return task;
      });

      if (hasOverdue && xpToDeduct > 0) {
        setPlayerProfile((p) => {
          const newXP = Math.max(0, p.totalXP - xpToDeduct);
          return { ...p, totalXP: newXP, level: calculateLevel(newXP) };
        });
        sound.playMissedTask();
        triggerXpNotification(`-${xpToDeduct} XP — فات موعد في خطة الحياة!`, 'miss');
      }

      return updated;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLifePlanDeadlines();
    }, 50);
    const interval = setInterval(checkLifePlanDeadlines, 20000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addLifePlanTask = (taskData: Omit<LifePlanTask, 'id' | 'status' | 'penalized'>) => {
    const newTask: LifePlanTask = {
      ...taskData,
      id: `lp_${Date.now()}`,
      status: 'pending',
      penalized: false
    };
    setLifePlanTasks((prev) => [newTask, ...prev]);
    sound.playXpGain();
    triggerXpNotification('تمت إضافة مهمة خطة الحياة', 'bonus');
  };

  const completeLifePlanTask = (id: string) => {
    setLifePlanTasks((prev) => {
      const target = prev.find((t) => t.id === id);
      if (!target || target.status === 'completed') return prev;

      sound.playTaskComplete();
      addXPToPlayer(target.xpReward, `Life Plan: ${target.title}`);
      triggerXpNotification(`+${target.xpReward} XP — أُنجزت مهمة العمل بنجاح!`, 'xp');

      logActivity(
        `إنجاز خطة الحياة: ${target.title}`,
        'عمل',
        `أُنجزت بنجاح في موعدها (${target.project})`,
        target.xpReward
      );

      return prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'completed' as const,
              completedAt: new Date().toISOString()
            }
          : t
      );
    });
  };

  const deleteLifePlanTask = (id: string) => {
    setLifePlanTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 7. MIDNIGHT CYCLE & DAILY DISCIPLINE RECKONING
  const executeMidnightPenaltyCheck = (prevDate: string, currentDate: string) => {
    const missedObligatoryTasks = todayTasks.filter(
      (t) => t.isObligatory !== false && !t.completed
    );

    if (missedObligatoryTasks.length > 0) {
      const totalPenalty = missedObligatoryTasks.reduce(
        (acc, t) => acc + (t.penaltyXP || 10),
        0
      );

      setPlayerProfile((p) => {
        const newXP = Math.max(0, p.totalXP - totalPenalty);
        return {
          ...p,
          totalXP: newXP,
          streak: 0,
          level: calculateLevel(newXP)
        };
      });

      sound.playMissedTask();
      triggerXpNotification(`-${totalPenalty} XP — جزاء انتصاف الليل`, 'miss');

      setMidnightPenaltyReview({
        date: prevDate,
        missedCount: missedObligatoryTasks.length,
        penalizedXP: totalPenalty,
        missedTaskTitles: missedObligatoryTasks.map((t) => t.task)
      });
    }

    // Reset daily tasks fresh for the new day
    setTodayTasks((prev) =>
      prev.map((t) => ({
        ...t,
        completed: false,
        xpEarned: 0,
        completedAt: undefined,
        dueDate: currentDate
      }))
    );

    // Reset daily quests
    setQuests((prev) =>
      prev.map((q) =>
        q.isDailyMission
          ? { ...q, status: 'not_started' as const, xpEarned: 0, completedAt: undefined }
          : q
      )
    );

    setDailyBonusClaimed(false);
    setLastActiveDate(currentDate);
  };

  const simulateMidnightCycle = () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    executeMidnightPenaltyCheck(yesterday, today);
  };

  const closeMidnightPenaltyModal = () => {
    setMidnightPenaltyReview(null);
  };

  useEffect(() => {
    const checkDateTransition = () => {
      const todayStr = new Date().toISOString().split('T')[0];
      if (lastActiveDate && todayStr > lastActiveDate) {
        executeMidnightPenaltyCheck(lastActiveDate, todayStr);
      }
    };

    const timer = setTimeout(checkDateTransition, 50);
    const interval = setInterval(checkDateTransition, 30000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActiveDate, todayTasks]);

  const resetAllData = () => {
    setPlayerProfile(INITIAL_PLAYER_PROFILE);
    setQuests(INITIAL_QUESTS);
    setGoals(INITIAL_GOALS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setFreedomEntries(INITIAL_FREEDOM_ENTRIES);
    setTodayTasks(INITIAL_TODAY_TASKS);
    setLifePlanTasks(INITIAL_LIFE_PLAN_TASKS);
    setMidnightPenaltyReview(null);
    setLastActiveDate(new Date().toISOString().split('T')[0]);
    setRewards(INITIAL_REWARDS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setBossAwards(INITIAL_BOSS_XP_AWARDS);
    setBossFeedback(INITIAL_BOSS_FEEDBACK);
    setBossChallenges(INITIAL_BOSS_CHALLENGES);
    setWeeklyScore(INITIAL_WEEKLY_SCORE);
    setDailyBonusClaimed(false);
    setDisciplineRules([
      {
        id: 'rule-1',
        title: 'لا تصفح عشوائي للهاتف قبل إنهاء جلسة العمل الأولى',
        penaltyXP: 5,
        rewardXP: 5,
        statusToday: 'pending',
        streakDays: 0
      },
      {
        id: 'rule-2',
        title: 'لا سكريات أو وجبات سريعة بعد الساعة 8 مساءً',
        penaltyXP: 5,
        rewardXP: 5,
        statusToday: 'pending',
        streakDays: 0
      },
      {
        id: 'rule-3',
        title: 'لا سهر بعد منتصف الليل بدون عذر قهري',
        penaltyXP: 5,
        rewardXP: 5,
        statusToday: 'pending',
        streakDays: 0
      }
    ]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('LIFE_RPG_STATE_V1');
      localStorage.removeItem('LIFE_RPG_STATE_V2');
    }
  };


  return (
    <RPGContext.Provider
      value={{
        role,
        setRole,
        playerProfile,
        bossProfile,
        quests,
        goals,
        achievements,
        freedomEntries,
        todayTasks,
        rewards,
        activityLogs,
        bossAwards,
        bossFeedback,
        bossChallenges,
        weeklyScore,
        notificationSettings,
        celebration,
        closeCelebration,
        completeQuest,
        uncompleteQuest,
        addCustomQuest,
        editQuest,
        deleteQuest,
        toggleTask,
        addTask,
        deleteTask,
        updateGoalProgress,
        completeGoal,
        addGoal,
        deleteGoal,
        addFreedomEntry,
        awardBossXP,
        addBossChallenge,
        addBossFeedback,
        submitBossWeeklyReview,
        resistCraving,
        logActivity,
        redeemReward,
        addCustomReward,
        updateNotificationSettings,
        resetAllData,
        soundEnabled,
        toggleSound,
        triggerXpNotification,
        disciplineRules,
        resistRule,
        breakRule,
        acceptRandomMission,
        dailyBonusClaimed,
        claimDailyBonus,
        lifePlanTasks,
        addLifePlanTask,
        completeLifePlanTask,
        deleteLifePlanTask,
        checkLifePlanDeadlines,
        midnightPenaltyReview,
        closeMidnightPenaltyModal,
        simulateMidnightCycle,
        lastActiveDate
      }}
    >
      {children}
      <XpParticleEffect notifications={xpNotifications} />
      <LevelUpModal
        isOpen={levelUpModal.isOpen}
        onClose={() => setLevelUpModal((p) => ({ ...p, isOpen: false }))}
        newLevel={levelUpModal.newLevel}
      />
      <MidnightPenaltyModal
        review={midnightPenaltyReview}
        onClose={closeMidnightPenaltyModal}
      />
    </RPGContext.Provider>

  );
}

export function useRPG() {
  const context = useContext(RPGContext);
  if (!context) {
    throw new Error('useRPG must be used within an RPGProvider');
  }
  return context;
}
