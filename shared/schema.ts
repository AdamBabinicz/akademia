import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  preferredLanguage: text("preferred_language").default("pl").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const educationalProgress = pgTable("educational_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  categoryId: text("category_id").notNull(),
  topicId: text("topic_id").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completionPercentage: integer("completion_percentage").default(0).notNull(),
  lastAccessed: timestamp("last_accessed").defaultNow().notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  topicId: text("topic_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  difficultyLevel: text("difficulty_level").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const dailyFacts = pgTable("daily_facts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titlePl: text("title_pl").notNull(),
  titleEn: text("title_en").notNull(),
  titleHu: text("title_hu").notNull(),
  contentPl: text("content_pl").notNull(),
  contentEn: text("content_en").notNull(),
  contentHu: text("content_hu").notNull(),
  category: text("category").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  preferredLanguage: true,
});

export const insertProgressSchema = createInsertSchema(educationalProgress).pick({
  userId: true,
  categoryId: true,
  topicId: true,
  completed: true,
  completionPercentage: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).pick({
  userId: true,
  topicId: true,
  score: true,
  totalQuestions: true,
  difficultyLevel: true,
});

export const insertDailyFactSchema = createInsertSchema(dailyFacts).pick({
  titlePl: true,
  titleEn: true,
  titleHu: true,
  contentPl: true,
  contentEn: true,
  contentHu: true,
  category: true,
  isActive: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type EducationalProgress = typeof educationalProgress.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertDailyFact = z.infer<typeof insertDailyFactSchema>;
export type DailyFact = typeof dailyFacts.$inferSelect;
