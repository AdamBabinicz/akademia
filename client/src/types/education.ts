export interface Topic {
  id: string;
  titlePl: string;
  titleEn: string;
  titleHu: string;
  category: Category;
  estimatedTime: number; // in minutes
  difficulty: 'basic' | 'intermediate' | 'advanced';
  interactiveModules: string[];
  mdxContent: string;
}

export interface Category {
  id: string;
  titlePl: string;
  titleEn: string;
  titleHu: string;
  icon: string;
  topics: Topic[];
}

export interface InteractiveModule {
  id: string;
  type: 'simulation' | 'experiment' | 'quiz' | 'visualization' | '3d-model';
  title: string;
  description: string;
  component: string;
}

export interface QuizQuestion {
  id: string;
  questionPl: string;
  questionEn: string;
  questionHu: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export interface QuizOption {
  id: string;
  textPl: string;
  textEn: string;
  textHu: string;
}

export interface UserProgress {
  categoryId: string;
  topicId: string;
  completed: boolean;
  completionPercentage: number;
  lastAccessed: Date;
}

export interface ScaleLevel {
  name: string;
  size: string;
  description: string;
  visualization: string;
}

export type Language = 'pl' | 'en' | 'hu';

export interface SimulationState {
  isPlaying: boolean;
  voltage: number;
  frequency: number;
  currentScale: number;
  [key: string]: any;
}
