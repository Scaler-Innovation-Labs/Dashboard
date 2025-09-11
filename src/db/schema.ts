import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// -------------------- User Table --------------------
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull().unique(),
  emergencyPhoneNumber: text("emergency_phone_number").notNull().unique(),
  profileImage: text("profile_image").notNull(),

  github: text("github").notNull(),
  linkedin: text("linkedin").notNull(),
  twitter: text("twitter").notNull(),
  leetcode: text("leetcode").notNull(),
  codeforces: text("codeforces").notNull(),

  role: text("role", { enum: ["admin", "student", "faculty"] })
    .default("student")
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// -------------------- Degree Table --------------------
export const degrees = pgTable("degrees", {
  id: uuid("id").defaultRandom().primaryKey(),
  degreeName: text("degree_name").notNull(),
  institution: text("institution").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// -------------------- User ↔ Degree (Join Table) --------------------
export const userDegrees = pgTable("user_degrees", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  degreeId: uuid("degree_id")
    .notNull()
    .references(() => degrees.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

// -------------------- Relations --------------------
export const userRelations = relations(users, ({ many }) => ({
  degrees: many(userDegrees),
}));

export const degreeRelations = relations(degrees, ({ many }) => ({
  users: many(userDegrees),
}));

// -------------------- Types --------------------
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Degree = typeof degrees.$inferSelect;
export type NewDegree = typeof degrees.$inferInsert;

export type UserDegree = typeof userDegrees.$inferSelect;
export type NewUserDegree = typeof userDegrees.$inferInsert;
