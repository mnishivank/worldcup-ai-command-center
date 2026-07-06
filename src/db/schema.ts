import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  role: text('role').notNull().default('fan'), // 'fan', 'staff', 'admin', 'volunteer'
  createdAt: timestamp('created_at').defaultNow(),
});

export const incidents = pgTable('incidents', {
  id: serial('id').primaryKey(),
  reporterId: integer('reporter_id').references(() => users.id),
  type: text('type').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull().default('open'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  assigneeId: integer('assignee_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull().default('pending'),
  dueDate: timestamp('due_date'),
});

export const crowdMetrics = pgTable('crowd_metrics', {
  id: serial('id').primaryKey(),
  zoneId: text('zone_id').notNull(),
  density: integer('density').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const sustainabilityMetrics = pgTable('sustainability_metrics', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(), // 'energy', 'water', 'waste'
  value: integer('value').notNull(),
  unit: text('unit').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  incidents: many(incidents),
  tasks: many(tasks),
}));
