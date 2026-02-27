// 教材
export interface Textbook {
  id: string;
  title: string;
  level: string;
  cover: string;
  totalLessons: number;
  description: string;
}

// 课程单元
export interface Lesson {
  id: string;
  textbookId: string;
  title: string;
  unitNumber: number;
  pageRange: string;
  thumbnail: string; // emoji
  status: 'locked' | 'in-progress' | 'completed';
  starsEarned: number;
  maxStars: number;
}

// 课程内容
export interface LessonContent {
  id: string;
  lessonId: string;
  pageNumber: number;
  englishText: string;
  chineseText: string;
  words: Array<{
    word: string;
    translation: string;
    pronunciation?: string;
  }>;
}

// 收藏
export interface Favorite {
  id: string;
  type: 'word' | 'sentence';
  english: string;
  chinese: string;
  lessonId: string;
  createdAt: Date;
}

// 学习进度
export interface LearningProgress {
  lessonId: string;
  completedPages: number;
  totalPages: number;
  lastStudied: Date;
  timeSpent: number; // minutes
}

// 学习统计
export interface StudyStats {
  dailyStudyTime: Array<{
    date: string;
    minutes: number;
  }>;
  totalStudyTime: number;
  streakDays: number;
  lastStudyDate: string;
}

// 星星记录
export interface Star {
  id: string;
  lessonId: string;
  count: number;
  earnedAt: Date;
}

// 虚拟宠物
export interface LearningPet {
  id: string;
  name: string;
  emoji: string;
  mood: 'happy' | 'normal' | 'hungry';
  level: number;
  experience: number;
}

// 成就徽章
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  unlocked: boolean;
  unlockedAt?: Date;
  requirement: string;
}

// 用户等级
export interface UserLevel {
  currentLevel: number;
  currentExp: number;
  maxExp: number;
  totalStars: number;
}
