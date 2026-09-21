import {
  UserProfile,
  Quest,
  Goal,
  Achievement,
  FreedomFundEntry,
  TodayTask,
  Reward,
  ActivityLog,
  BossXPAward,
  BossFeedback,
  BossChallenge,
  WeeklyScoreRecord,
  LifePlanTask
} from '@/types';

export const INITIAL_PLAYER_PROFILE: UserProfile = {
  id: 'usr_ayman_01',
  email: 'ayman@elitdigi.com',
  name: 'أيمن',
  role: 'player',
  avatarUrl: '',
  title: 'المستيقظ — بداية الرحلة (المستوى 0)',
  level: 0,
  totalXP: 0,
  lifePoints: 0,
  streak: 0,
  totalSavedDH: 0,
  weedFreeDays: 0,
  workHours: 0,
  learningHours: 0,
  workoutsCount: 0,
  goalsCompletedCount: 0,
  bossName: 'القائدة إيلينا (المشرف)',
  bossStatus: 'active',
  lastBossFeedback: 'بداية الرحلة. اختر مهمتك الأولى وأثبت جدارتك.',
  lastReviewDate: 'اليوم الأول'
};


export const INITIAL_BOSS_PROFILE: UserProfile = {
  id: 'boss_elena_01',
  email: 'boss@elitdigi.com',
  name: 'القائدة إيلينا',
  role: 'boss',
  avatarUrl: '',
  title: 'مدير المساءلة والتوجيه التنفيذي',
  level: 25,
  totalXP: 3400,
  lifePoints: 240,
  streak: 30,
  totalSavedDH: 1200,
  weedFreeDays: 90,
  workHours: 40,
  learningHours: 15,
  workoutsCount: 20,
  goalsCompletedCount: 12,
  bossName: 'النظام',
  bossStatus: 'active'
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q_daily_01',
    name: 'صلاة الصبح و10 دقائق تأمل وتفكر',
    category: 'إيمان',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'easy',
    xpReward: 5,
    moneySaved: 0,
    notes: '',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'faith_personal'
  },
  {
    id: 'q_main_01',
    name: 'التركيز العميق لساعتين على مشروع عميل ELITDIGI',
    category: 'عمل',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'hard',
    xpReward: 20,
    moneySaved: 0,
    notes: '',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'main'
  },
  {
    id: 'q_daily_02',
    name: 'ادخار 15 درهم اليوم في صندوق الحرية',
    category: 'مال',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'medium',
    xpReward: 10,
    moneySaved: 15,
    notes: '',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'daily_1'
  },
  {
    id: 'q_daily_03',
    name: 'قراءة 20 صفحة في هندسة البرمجيات المعمارية',
    category: 'تعلّم',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'medium',
    xpReward: 10,
    moneySaved: 0,
    notes: '',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'work_learn'
  },
  {
    id: 'q_health_01',
    name: 'المشي لمدة 30 دقيقة في الهواء النقي',
    category: 'صحة',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'medium',
    xpReward: 10,
    moneySaved: 0,
    notes: '',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'health'
  },
  {
    id: 'q_rel_01',
    name: 'الاتصال بالعائلة والاطمئنان عليهم',
    category: 'علاقات',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'easy',
    xpReward: 5,
    moneySaved: 0,
    notes: '',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'daily_2'
  },
  {
    id: 'q_boss_01',
    name: 'تحدي المشرف: 3 ساعات عمل مركز على ELITDIGI',
    category: 'عمل',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'major',
    xpReward: 50,
    moneySaved: 0,
    notes: 'مهمة موجهة مباشرة من القائدة إيلينا.',
    xpEarned: 0,
    isDailyMission: true,
    missionSlot: 'daily_3',
    isBossChallenge: true,
    bossChallengeId: 'bc_01'
  },
  {
    id: 'q_major_01',
    name: 'تنظيم وترتيب الغرفة وبيئة العمل بالكامل',
    category: 'عقل',
    date: new Date().toISOString().split('T')[0],
    status: 'not_started',
    difficulty: 'major',
    xpReward: 50,
    moneySaved: 0,
    notes: 'تحويل بيئة الغرفة إلى مساحة انضباط وتركيز هادئة.',
    xpEarned: 0,
    isDailyMission: false,
    objectives: [
      { id: 'obj-1', title: 'تنظيف وترتيب سطح المكتب والتخلص من الفوضى', completed: false },
      { id: 'obj-2', title: 'تنظيم الملابس وإعادتها للخزانة', completed: false },
      { id: 'obj-3', title: 'تنظيف الأرضية وتهوية الغرفة بالشمس', completed: false },
      { id: 'obj-4', title: 'ترتيب الأدراج وحذف الأوراق القديمة', completed: false }
    ]
  }
];



export const INITIAL_GOALS: Goal[] = [
  {
    id: 'g_01',
    name: 'إطلاق النسخة الأولى من تطبيق ويب ELITDIGI',
    type: 'short-term',
    category: 'ELITDIGI',
    deadline: '2026-10-05',
    status: 'in_progress',
    progress: 75,
    xpReward: 150,
    whyItMatters: 'ترسيخ المكانة المهنية وتوقيع العقود الأولى مع المؤسسات والعملاء.',
    nextAction: 'إتمام صلاحيات الأدوار ومراجعة تجربة الهاتف'
  },
  {
    id: 'g_02',
    name: 'الوصول إلى 1000 درهم في صندوق الحرية',
    type: 'mid-term',
    category: 'مال',
    deadline: '2026-11-15',
    status: 'in_progress',
    progress: 24, // 240 / 1000
    xpReward: 300,
    whyItMatters: 'رمز للسيطرة على النفس، كسر المحفزات الاندفاعية، وبناء وسادة استثمارية.',
    nextAction: 'إيداع 15-20 درهم يومياً بدون انقطاع'
  },
  {
    id: 'g_03',
    name: 'بناء روتين رياضي مستمر في النادي (4 مرات أسبوعياً)',
    type: 'short-term',
    category: 'صحة',
    deadline: '2026-10-15',
    status: 'in_progress',
    progress: 60,
    xpReward: 200,
    whyItMatters: 'القوة البدنية تحدد التحمل الذهني، توازن الهرمونات، ومقاومة الضغوط.',
    nextAction: 'جلسة تمارين الجزء العلوي غداً الساعة 6:00 مساءً'
  },
  {
    id: 'g_04',
    name: 'إتقان هندسة السحاب وقواعد بيانات Supabase المتقدمة',
    type: 'long-term',
    category: 'تعلّم',
    deadline: '2027-01-30',
    status: 'in_progress',
    progress: 45,
    xpReward: 500,
    whyItMatters: 'امتلاك قدرة هندسية شاملة لشحن المنتجات الرقمية من البداية للنهاية.',
    nextAction: 'دراسة أمان السجلات RLS وإدارة الاتصالات في PostgreSQL'
  },
  {
    id: 'g_05',
    name: '30 يوماً نظيف تماماً بدون تدخين',
    type: 'short-term',
    category: 'تطوير الذات',
    deadline: '2026-10-14',
    status: 'in_progress',
    progress: 23, // 7 / 30 days
    xpReward: 250,
    whyItMatters: 'صفاء الذهن، استعادة حساسية الدوبامين الطبيعية، وذاكرة حادة بدون ندم.',
    nextAction: 'استخدام قائمة الطوارئ فوراً في حال ظهور الرغبة في المساء'
  },
  {
    id: 'g_06',
    name: 'إعادة تنظيم وترتيب مساحة العمل والمكتب',
    type: 'short-term',
    category: 'تطوير الذات',
    deadline: '2026-09-18',
    status: 'completed',
    progress: 100,
    xpReward: 100,
    whyItMatters: 'المكتب النظيف يعكس عقلاً صافياً وعالي التركيز.',
    nextAction: 'الحفاظ على نظافة المكتب كل مساء',
    completedAt: '2026-09-18'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_01',
    code: 'FIRST_DAY',
    name: 'اليوم الأول',
    description: 'أكمل أول يوم كامل من المهام والواجبات اليومية.',
    category: 'الانضباط',
    xpReward: 50,
    unlockCondition: 'إكمال يومك الأول بنجاح',
    status: 'locked',
    progress: 0,
    maxProgress: 1,
    iconName: 'Flag'
  },
  {
    id: 'ach_02',
    code: 'STREAK_3',
    name: 'سلسلة 3 أيام',
    description: 'حافظ على استمراريتك وانضباطك لثلاثة أيام متتالية.',
    category: 'الاستمرارية',
    xpReward: 75,
    unlockCondition: 'الوصول لسلسلة 3 أيام متتالية',
    status: 'locked',
    progress: 0,
    maxProgress: 3,
    iconName: 'Flame'
  },
  {
    id: 'ach_03',
    code: 'STREAK_7',
    name: 'سلسلة 7 أيام',
    description: 'حافظ على الانضباط لسبعة أيام متتالية دون انقطاع.',
    category: 'الاستمرارية',
    xpReward: 150,
    unlockCondition: 'الوصول لسلسلة 7 أيام متتالية',
    status: 'locked',
    progress: 0,
    maxProgress: 7,
    iconName: 'Zap'
  },
  {
    id: 'ach_04',
    code: 'SAVE_50',
    name: 'أول 50 درهم',
    description: 'ادخر 50 درهم في صندوق الحرية بدلاً من الإنفاق المهدور.',
    category: 'الحرية',
    xpReward: 50,
    unlockCondition: 'جمع 50 درهم في مدخرات الصندوق',
    status: 'locked',
    progress: 0,
    maxProgress: 50,
    iconName: 'Coins'
  },
  {
    id: 'ach_05',
    code: 'SAVE_100',
    name: 'أول 100 درهم',
    description: 'ادخر 100 درهم في صندوق الحرية لحماية مستقبلك.',
    category: 'الحرية',
    xpReward: 100,
    unlockCondition: 'جمع 100 درهم في الصندوق',
    status: 'locked',
    progress: 0,
    maxProgress: 100,
    iconName: 'ShieldCheck'
  },
  {
    id: 'ach_06',
    code: 'DEEP_WORK',
    name: 'العمل العميق',
    description: 'أنجز ساعتين من العمل المركز دون أي مقاطعة رقمية.',
    category: 'التركيز',
    xpReward: 50,
    unlockCondition: 'تسجيل ساعتين من العمل المركز',
    status: 'locked',
    progress: 0,
    maxProgress: 2,
    iconName: 'Brain'
  },
  {
    id: 'ach_07',
    code: 'BODY_ACTIVATED',
    name: 'تفعيل الجسد',
    description: 'أكمل 5 تمارين رياضية وتدريبات بدنية كاملة.',
    category: 'الصحة',
    xpReward: 50,
    unlockCondition: 'إتمام 5 جلسات تمرين بدني',
    status: 'locked',
    progress: 0,
    maxProgress: 5,
    iconName: 'Dumbbell'
  },
  {
    id: 'ach_08',
    code: 'LEARNER',
    name: 'طالب العلم',
    description: 'أكمل عشر جلسات تعلّم وقراءة متخصصة.',
    category: 'العقل',
    xpReward: 50,
    unlockCondition: 'تسجيل 10 جلسات تعلّم',
    status: 'locked',
    progress: 0,
    maxProgress: 10,
    iconName: 'BookOpen'
  },
  {
    id: 'ach_09',
    code: 'EXPLORER',
    name: 'المستكشف',
    description: 'قم بزيارة مكان جديد واخرج من دائرة روتينك المعتاد.',
    category: 'تجارب',
    xpReward: 50,
    unlockCondition: 'استكشاف موقع أو حي جديد',
    status: 'locked',
    progress: 0,
    maxProgress: 1,
    iconName: 'Compass'
  },
  {
    id: 'ach_10',
    code: 'DISCIPLINE',
    name: 'الانضباط الحديدي',
    description: 'قاوم رغبة أو أنجز مهمة شاقة بدلاً من التهرب منها.',
    category: 'التمكن',
    xpReward: 75,
    unlockCondition: 'مقاومة الرغبة أو كسر التسويف',
    status: 'locked',
    progress: 0,
    maxProgress: 1,
    iconName: 'Award'
  }
];


export const INITIAL_FREEDOM_ENTRIES: FreedomFundEntry[] = [];

export const INITIAL_TODAY_TASKS: TodayTask[] = [
  {
    id: 'task_01',
    task: 'مراجعة وتجربة نظام المصادقة وسياسات الأمان RLS في Supabase',
    priority: 'Important',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'عمل',
    completed: false,
    xpReward: 15,
    xpEarned: 0,
    isObligatory: true,
    penaltyXP: 10
  },
  {
    id: 'task_02',
    task: 'المشي 30 دقيقة في الطبيعة بدون مشتتات',
    priority: 'Normal',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'صحة',
    completed: false,
    xpReward: 10,
    xpEarned: 0,
    isObligatory: true,
    penaltyXP: 10
  },
  {
    id: 'task_03',
    task: 'قراءة 20 صفحة من كتاب الهندسة المعمارية التقنية',
    priority: 'Normal',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'تعلّم',
    completed: false,
    xpReward: 10,
    xpEarned: 0,
    isObligatory: true,
    penaltyXP: 10
  },
  {
    id: 'task_04',
    task: 'إيداع ادخار اليوم في صندوق الحرية (15 درهم)',
    priority: 'Easy',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'مال',
    completed: false,
    xpReward: 5,
    xpEarned: 0,
    isObligatory: true,
    penaltyXP: 5
  },
  {
    id: 'task_05',
    task: 'تنظيف عميق لمساحة العمل وتنظيم كابلات المكتب',
    priority: 'Easy',
    dueDate: new Date().toISOString().split('T')[0],
    category: 'عقل',
    completed: false,
    xpReward: 5,
    xpEarned: 0,
    isObligatory: true,
    penaltyXP: 5
  }
];

export const INITIAL_LIFE_PLAN_TASKS: LifePlanTask[] = [
  {
    id: 'lp_01',
    title: 'إنهاء وإطلاق واجهة مصادقة المستخدمين في مشروع ELITDIGI',
    project: 'ELITDIGI',
    deadline: new Date(Date.now() + 24 * 3600 * 1000).toISOString().slice(0, 16), // Tomorrow same time
    priority: 'critical',
    xpReward: 40,
    penaltyXP: 25,
    status: 'pending',
    notes: 'الانتهاء من تجربة مسار تسجيل الدخول والمصادقة بالبريد وسياسات RLS.'
  },
  {
    id: 'lp_02',
    title: 'كتابة وثيقة المتطلبات والمواصفات الفنية للنظام الجديد',
    project: 'برمجة وتصميم',
    deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString().slice(0, 16), // 2 days
    priority: 'high',
    xpReward: 30,
    penaltyXP: 20,
    status: 'pending',
    notes: 'تحديد بنية الجداول ومخططات البيانات قبل البدء في التطوير الفعلي.'
  },
  {
    id: 'lp_03',
    title: 'مراجعة تقرير الأداء واختبارات الضغط للواجهة الخلفية',
    project: 'ELITDIGI',
    deadline: new Date(Date.now() + 72 * 3600 * 1000).toISOString().slice(0, 16), // 3 days
    priority: 'medium',
    xpReward: 25,
    penaltyXP: 15,
    status: 'pending',
    notes: 'التأكد من سرعة استجابة الاستعلامات واستقرار قواعد البيانات.'
  }
];


export const INITIAL_REWARDS: Reward[] = [
  // XP Tiered default rewards
  {
    id: 'rew_01',
    name: 'سهرة فيلم واسترخاء بدون تأنيب ضمير',
    costXP: 50,
    description: 'اختر فيلماً ملهماً، جهز شاياً طازجاً، واستمتع بوقت راحة مستحق.',
    isFree: false,
    unlocked: true,
    redeemed: false,
    category: 'ترفيه'
  },
  {
    id: 'rew_02',
    name: 'وجبة مفضلة في مطعم عالي الجودة',
    costXP: 100,
    description: 'احتفل بالجهد المتواصل بوجبة صحية ولذيذة في مكان مفضل.',
    isFree: false,
    unlocked: true,
    redeemed: false,
    category: 'طعام'
  },
  {
    id: 'rew_03',
    name: 'شراء شخصي بسيط / ملحق تقني مفيد',
    costXP: 200,
    description: 'شراء كتاب مميز أو ملحق تقني يرفع من كفاءة عملك وحياتك.',
    isFree: false,
    unlocked: true,
    redeemed: false,
    category: 'أدوات'
  },
  {
    id: 'rew_04',
    name: 'نشاط ترفيهي أو رحلة استكشافية ليوم كامل',
    costXP: 300,
    description: 'أخذ يوم لاستكشاف شاطئ أو جبل أو معلم تاريخي جديد.',
    isFree: false,
    unlocked: true,
    redeemed: false,
    category: 'تجارب'
  },
  {
    id: 'rew_05',
    name: 'شراء مميز لمكافأة إنجاز مرحلي كبير',
    costXP: 500,
    description: 'ترقية أساسية في أدواتك أو جهاز حاسوبك أو معدات صحتك.',
    isFree: false,
    unlocked: true,
    redeemed: false,
    category: 'إنجاز كبير'
  },
  // Free zero-cost rewards
  {
    id: 'rew_free_01',
    name: 'مشاهدة الغروب مع موسيقى هادئة',
    isFree: true,
    description: 'الجلوس في مكان مرتفع والابتعاد عن الشاشات لمراقبة غروب الشمس.',
    unlocked: true,
    redeemed: false,
    category: 'عقل'
  },
  {
    id: 'rew_free_02',
    name: 'المشي في حي أو مسار جديد في المدينة',
    isFree: true,
    description: 'استكشاف منطقة غير مألوفة بتمهل ودون استعجال.',
    unlocked: true,
    redeemed: false,
    category: 'استكشاف'
  },
  {
    id: 'rew_free_03',
    name: 'التقاط صور فوتوغرافية في الهواء الطلق',
    isFree: true,
    description: 'توثيق جمال العمارة وانعكاسات الضوء وزوايا الشوارع.',
    unlocked: true,
    redeemed: false,
    category: 'إبداع'
  },
  {
    id: 'rew_free_04',
    name: 'العزف على الغيتار / تعلم لحن جديد',
    isFree: true,
    description: '30 دقيقة من الاستغراق في الموسيقى والأنغام.',
    unlocked: true,
    redeemed: false,
    category: 'إبداع'
  },
  {
    id: 'rew_free_05',
    name: 'لعب مباريات شطرنج عبر الإنترنت',
    isFree: true,
    description: 'شحذ التفكير التكتيكي والاستراتيجي بثلاث جولات شطرنج.',
    unlocked: true,
    redeemed: false,
    category: 'عقل'
  },
  {
    id: 'rew_free_06',
    name: 'طهي وجبة صحية جديدة من الصفر',
    isFree: true,
    description: 'استخدام مكونات طازجة لإتقان طبق صحي ولذيذ.',
    unlocked: true,
    redeemed: false,
    category: 'طعام'
  },
  {
    id: 'rew_free_07',
    name: 'القراءة في حديقة تحت الأشجار',
    isFree: true,
    description: 'أخذ كتاب ورقي والجلوس في حديقة هادئة ومظللة.',
    unlocked: true,
    redeemed: false,
    category: 'تعلّم'
  },
  {
    id: 'rew_free_08',
    name: 'قضاء وقت نوعي مميز مع العائلة',
    isFree: true,
    description: 'شرب الشاي وتجاذب أطراف الحديث الصادق دون النظر للهاتف.',
    unlocked: true,
    redeemed: false,
    category: 'علاقات'
  },
  {
    id: 'rew_free_09',
    name: 'استكشاف أزقة المدينة العتيقة والأسواق الشعبية',
    isFree: true,
    description: 'الاستمتاع بعبق التراث ورائحة التوابل وروح الأصالة.',
    unlocked: true,
    redeemed: false,
    category: 'استكشاف'
  },
  {
    id: 'rew_free_10',
    name: 'بناء ميزة تجريبية جديدة لمشروع ELITDIGI',
    isFree: true,
    description: 'البرمجة الحرة على فكرة مبتكرة ومحفزة في المشروع.',
    unlocked: true,
    redeemed: false,
    category: 'عمل'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act_01',
    name: 'بدء لعبة الحياة — المستوى 0',
    dateTime: 'اليوم — البداية',
    category: 'تطوير الذات',
    notes: 'الانطلاقة الأولى نحو بناء الانضباط الشخصي والارتقاء في الحياة الحقيقية.',
    xpEarned: 0,
    moneySaved: 0,
    source: 'player'
  }
];

export const INITIAL_BOSS_XP_AWARDS: BossXPAward[] = [];

export const INITIAL_BOSS_FEEDBACK: BossFeedback[] = [
  {
    id: 'bfb_01',
    bossId: 'boss_elena_01',
    bossName: 'القائدة إيلينا',
    playerId: 'usr_ayman_01',
    targetType: 'general',
    message: 'مرحباً بك في البداية (المستوى 0). سأتابع التزامك خطوة بخطوة. اختر مهمتك الأولى وأثبت جدارتك.',
    createdAt: 'اليوم — البداية',
    status: 'unread'
  }
];

export const INITIAL_BOSS_CHALLENGES: BossChallenge[] = [
  {
    id: 'bc_01',
    bossId: 'boss_elena_01',
    bossName: 'القائدة إيلينا',
    playerId: 'usr_ayman_01',
    title: 'إكمال 3 ساعات عمل مركز على مشروع ELITDIGI',
    description: 'صفر مقاطعات هاتفية، إتمام نظام المصادقة الأساسي وواجهة لوحة تحكم العميل.',
    xpReward: 50,
    deadline: '2026-09-25',
    difficulty: 'hard',
    status: 'active',
    createdAt: '2026-09-20'
  }
];

export const INITIAL_WEEKLY_SCORE: WeeklyScoreRecord = {
  weekId: '2026-W38',
  weekStartDate: '2026-09-15',
  xpEarned: 0,
  bossXPEarned: 0,
  completedQuests: 0,
  completedDays: 0,
  moneySavedDH: 0,
  workHours: 0,
  learningHours: 0,
  workoutsCount: 0,
  weedFreeDays: 0,
  personalAchievements: [],
  weeklyScore: 0,
  weeklyRank: 'Beginner',
  playerReflection: {
    wins: 'بداية الأسبوع الأول في لعبة الانضباط.',
    challenges: 'الحفاظ على التركيز الكامل وبناء العادات الصباحية.',
    nextWeekPriority: 'إنجاز أول 100 XP والارتقاء إلى المستوى 1.'
  }
};

