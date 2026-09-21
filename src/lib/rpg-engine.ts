import { WeeklyRank, Achievement, AchievementStatus } from '@/types';

// Level & XP calculations: starts at Level 0 (0-99 XP)
export function calculateLevel(totalXP: number): number {
  return Math.max(0, Math.floor(totalXP / 100));
}


export function calculateLevelProgress(totalXP: number): number {
  return totalXP % 100;
}

export function calculateXPToNextLevel(totalXP: number): number {
  return 100 - (totalXP % 100);
}

export function getMotivationalMessage(totalXP: number, level: number, streak: number): string {
  const messages = [
    '«اليوم الأول. ابدأ الآن.»',
    '«استمر في التقدم، كل خطوة تصنع فارقاً.»',
    '«أنت تبني نسختك الأقوى يوماً بعد يوم.»',
    '«يوم آخر نحو القمة والارتقاء.»',
    '«ارتقِ بمستواك وتجاوز حدودك.»',
    '«لا تبع مستقبلك من أجل لحظة عابرة.»',
    '«الاستمرارية والانضباط يهزمان الحماس المؤقت دائماً.»',
    '«كل فعل تقوم به اليوم هو تصويت للشخص الذي تريد أن تصبح عليه.»'
  ];

  if (streak === 0 || totalXP < 50) return messages[0];
  if (totalXP % 100 >= 80) return '«أنت على وشك الارتقاء للمستوى التالي!»';
  if (streak >= 7) return messages[5]; // Don't trade your future
  if (streak >= 3) return messages[2]; // You're building yourself
  
  const index = (level + streak) % messages.length;
  return messages[index];
}

export function calculateWeeklyRank(weeklyXP: number): WeeklyRank {
  if (weeklyXP >= 300) return 'Legendary';
  if (weeklyXP >= 200) return 'Elite';
  if (weeklyXP >= 100) return 'Warrior';
  if (weeklyXP >= 50) return 'Starter';
  return 'Beginner';
}

export function getRankArabicName(rank: WeeklyRank): string {
  switch (rank) {
    case 'Legendary': return 'أسطوري';
    case 'Elite': return 'نخبة';
    case 'Warrior': return 'محارب';
    case 'Starter': return 'منطلق';
    case 'Beginner': return 'مبتدئ';
  }
}

export const FREEDOM_FUND_MILESTONES = [25, 50, 75, 100, 150, 200, 300, 500, 1000];

export function getNextMilestone(currentTotalDH: number): { next: number; progressPercent: number } {
  for (const m of FREEDOM_FUND_MILESTONES) {
    if (currentTotalDH < m) {
      const prev = FREEDOM_FUND_MILESTONES[FREEDOM_FUND_MILESTONES.indexOf(m) - 1] || 0;
      const progressPercent = Math.min(100, Math.round(((currentTotalDH - prev) / (m - prev)) * 100));
      return { next: m, progressPercent };
    }
  }
  return { next: 1000, progressPercent: 100 };
}

// Check achievements unlock conditions
export function evaluateAchievements(
  currentAchievements: Achievement[],
  stats: {
    totalSavedDH: number;
    streak: number;
    workoutsCount: number;
    learningHours: number;
    workHours: number;
    completedQuestsCount: number;
    cravingsResistedCount: number;
  }
): { updatedAchievements: Achievement[]; newlyUnlocked: Achievement[] } {
  const newlyUnlocked: Achievement[] = [];

  const updatedAchievements = currentAchievements.map((ach) => {
    if (ach.status === 'unlocked') return ach;

    let shouldUnlock = false;
    let newProgress = ach.progress;

    switch (ach.code) {
      case 'FIRST_DAY':
        newProgress = Math.min(1, stats.completedQuestsCount >= 1 ? 1 : 0);
        shouldUnlock = stats.completedQuestsCount >= 1;
        break;
      case 'STREAK_3':
        newProgress = Math.min(3, stats.streak);
        shouldUnlock = stats.streak >= 3;
        break;
      case 'STREAK_7':
        newProgress = Math.min(7, stats.streak);
        shouldUnlock = stats.streak >= 7;
        break;
      case 'SAVE_50':
        newProgress = Math.min(50, stats.totalSavedDH);
        shouldUnlock = stats.totalSavedDH >= 50;
        break;
      case 'SAVE_100':
        newProgress = Math.min(100, stats.totalSavedDH);
        shouldUnlock = stats.totalSavedDH >= 100;
        break;
      case 'DEEP_WORK':
        newProgress = Math.min(2, stats.workHours);
        shouldUnlock = stats.workHours >= 2;
        break;
      case 'BODY_ACTIVATED':
        newProgress = Math.min(5, stats.workoutsCount);
        shouldUnlock = stats.workoutsCount >= 5;
        break;
      case 'LEARNER':
        newProgress = Math.min(10, Math.floor(stats.learningHours));
        shouldUnlock = stats.learningHours >= 10;
        break;
      case 'EXPLORER':
        shouldUnlock = ach.progress >= ach.maxProgress;
        break;
      case 'DISCIPLINE':
        newProgress = Math.min(1, stats.cravingsResistedCount);
        shouldUnlock = stats.cravingsResistedCount >= 1;
        break;
    }

    if (shouldUnlock) {
      const unlockedAch: Achievement = {
        ...ach,
        status: 'unlocked',
        progress: ach.maxProgress,
        unlockedAt: new Date().toISOString().split('T')[0]
      };
      newlyUnlocked.push(unlockedAch);
      return unlockedAch;
    }

    const nextStatus: AchievementStatus = newProgress > 0 ? 'in_progress' : 'locked';

    return {
      ...ach,
      progress: newProgress,
      status: nextStatus
    };
  });

  return { updatedAchievements, newlyUnlocked };
}
