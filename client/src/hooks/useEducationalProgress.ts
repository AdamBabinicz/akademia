import { useState, useCallback } from 'react';
import { UserProgress } from '@/types/education';

export function useEducationalProgress() {
  const [progress, setProgress] = useState<UserProgress[]>([]);

  const updateProgress = useCallback((categoryId: string, topicId: string, completionPercentage: number) => {
    setProgress(prev => {
      const existing = prev.find(p => p.categoryId === categoryId && p.topicId === topicId);
      if (existing) {
        return prev.map(p => 
          p.categoryId === categoryId && p.topicId === topicId
            ? { ...p, completionPercentage, completed: completionPercentage >= 100, lastAccessed: new Date() }
            : p
        );
      } else {
        return [...prev, {
          categoryId,
          topicId,
          completionPercentage,
          completed: completionPercentage >= 100,
          lastAccessed: new Date()
        }];
      }
    });
  }, []);

  const getTopicProgress = useCallback((categoryId: string, topicId: string) => {
    return progress.find(p => p.categoryId === categoryId && p.topicId === topicId)?.completionPercentage || 0;
  }, [progress]);

  const getCategoryProgress = useCallback((categoryId: string) => {
    const categoryProgress = progress.filter(p => p.categoryId === categoryId);
    if (categoryProgress.length === 0) return 0;
    
    const total = categoryProgress.reduce((sum, p) => sum + p.completionPercentage, 0);
    return Math.round(total / categoryProgress.length);
  }, [progress]);

  return { progress, updateProgress, getTopicProgress, getCategoryProgress };
}
