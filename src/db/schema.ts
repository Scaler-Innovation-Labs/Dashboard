import {
  pgTable,
  text,
  timestamp,
  bigint,
  integer,
  real,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("user", {
  id: bigint("id", { mode: "bigint" }).primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  contactNumber: text("phoneNumber").notNull().unique(),
  profileUrl: text("profileUrl").notNull().unique(),
  emergencyPhoneNumber: text("emergencyPhoneNumber").notNull().unique(),
  role: text("role", { enum: ["admin", "student", "instructor"] })
    .default("student")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const batch = pgTable("batch", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  endDate: timestamp("endDate").notNull(),
  minPersonaldevCreditRequired: integer(
    "MinPersonaldevCreditRequired",
  ).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const degrees = pgTable("degrees", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  degreeName: text("degreeName").notNull(),
  institution: text("institution").notNull(),
  duration: real("duration").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const studentProfile = pgTable("studentProfile", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  userId: bigint("userId", { mode: "bigint" })
    .notNull()
    .references(() => users.id),
  degreeIds: integer("degreeIds")
    .array()
    .notNull()
    .default(sql`'{}'::integer[]`),
  // will be made many to one relation with studentProfile do this later as it is not a part of the schema
  batchId: bigint("batchId", { mode: "bigint" })
    .notNull()
    .references(() => batch.id),
  githubUsername: text("githubUsername").notNull(),
  linkedinUsername: text("linkedinUsername").notNull(),
  twitterUsername: text("twitterUsername").notNull(),
  leetcodeUsername: text("leetcodeUsername").notNull(),
  codeforcesUsername: text("codeforcesUsername").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const subject = pgTable("subject", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  credits: integer("credits").notNull(),
  SubjectCategory: text("SubjectCode").notNull(),
  SubjectSlug: text("SubjectSlug").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const term = pgTable("term", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  batchId: bigint("batchId", { mode: "bigint" })
    .notNull()
    .references(() => batch.id),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const termSubject = pgTable("termSubject", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  termId: integer("termId")
    .notNull()
    .references(() => term.id),
  subjectId: integer("subjectId")
    .notNull()
    .references(() => subject.id),
  instructorId: bigint("instructorId", { mode: "bigint" })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const classes = pgTable("classes", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  duration: real("duration").notNull(),
  classType: text("classType", {
    enum: ["lecture", "lab", "miscellaneous"],
  }).notNull(),
  termSubjectId: bigint("termSubjectId", { mode: "bigint" })
    .notNull()
    .references(() => termSubject.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const termSubjectEnrollement = pgTable("termSubjectEnrollement", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  termSubjectId: bigint("termSubjectId", { mode: "bigint" })
    .notNull()
    .references(() => termSubject.id),
  studentId: bigint("studentId", { mode: "bigint" })
    .notNull()
    .references(() => users.id),
  enrollementType: text("enrollementType", {
    enum: [
      "personalDevelopmentCredit",
      "elective",
      "coreCurriculum",
      "industryImmersion",
    ],
  }).notNull(),
  hasCompletedSubject: boolean("hasCompletedSubject").notNull().default(false),
  attendance: real("attendance").notNull(),
  grade: text("grade", {
    enum: ["A*", "A", "B", "B-", "C", "C-", "D", "F"],
  }).notNull(),
  score: real("score").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const assessmentType = pgTable("assessmentType", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const results = pgTable("results", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  termSubjectEnrollementId: bigint("termSubjectEnrollementId", {
    mode: "bigint",
  })
    .notNull()
    .references(() => termSubjectEnrollement.id),
  assessmentTypeId: integer("assessmentTypeId")
    .notNull()
    .references(() => assessmentType.id),
  value: real("score").notNull(),
  weightage: real("weightage").notNull().default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const attendance = pgTable("attendance", {
  id: bigint("id", { mode: "bigint" })
    .primaryKey()
    .generatedByDefaultAsIdentity(),
  termSubjectEnrollementId: bigint("termSubjectEnrollementId", {
    mode: "bigint",
  })
    .notNull()
    .references(() => termSubjectEnrollement.id),
  studentId: bigint("studentId", { mode: "bigint" })
    .notNull()
    .references(() => users.id),
  classId: bigint("classId", { mode: "bigint" })
    .notNull()
    .references(() => classes.id),
  attendanceStatus: text("attendanceStatus", {
    enum: ["present", "absent", "late", "exemption", "leave"],
  }).notNull(),
  endTime: timestamp("endTime").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

/*
Writing the Relations for the schema

*/

export const userRelations = relations(users, ({ one, many }) => ({
  studentProfile: one(studentProfile, {
    fields: [users.id],
    references: [studentProfile.userId],
  }),
  termSubjectsAsInstructor: many(termSubject, {
    relationName: "instructorTermSubjects",
  }),
  termSubjecEnrollments: many(termSubjectEnrollement, {
    relationName: "studentEnrollments",
  }),
  attendanceRecords: many(attendance, { relationName: "studentAttendance" }),
}));

export const studentProfileRelations = relations(studentProfile, ({ one }) => ({
  user: one(users, {
    fields: [studentProfile.userId],
    references: [users.id],
  }),
  batch: one(batch, {
    fields: [studentProfile.batchId],
    references: [batch.id],
  }),
}));

export const batchRelations = relations(batch, ({ many }) => ({
  studentProfiles: many(studentProfile),
  terms: many(term),
}));

export const degreesRelations = relations(degrees, ({ many }) => ({}));

// doubt here
export const subjectRelations = relations(subject, ({ many }) => ({
  termSubjects: many(termSubject),
}));

export const termRelations = relations(term, ({ one, many }) => ({
  batch: one(batch, {
    fields: [term.batchId],
    references: [batch.id],
  }),
  termSubjects: many(termSubject),
}));

export const termSubjectRelations = relations(termSubject, ({ one, many }) => ({
  term: one(term, {
    fields: [termSubject.termId],
    references: [term.id],
  }),
  subject: one(subject, {
    fields: [termSubject.subjectId],
    references: [subject.id],
  }),
  instructor: one(users, {
    fields: [termSubject.instructorId],
    references: [users.id],
  }),
  classes: many(classes),
  enrollments: many(termSubjectEnrollement),
}));

export const termSubjectEnrollmentRelations = relations(
  termSubjectEnrollement,
  ({ one, many }) => ({
    termSubject: one(termSubject, {
      fields: [termSubjectEnrollement.termSubjectId],
      references: [termSubject.id],
    }),
    student: one(users, {
      fields: [termSubjectEnrollement.studentId],
      references: [users.id],
      relationName: "studentEnrollments",
    }),
    results: many(results),

    attendanceRecords: many(attendance, {
      relationName: "enrollementAttendance",
    }),
  }),
);

export const assessmentTypeRelations = relations(
  assessmentType,
  ({ many }) => ({
    results: many(results),
  }),
);

export const resultRelations = relations(results, ({ one }) => ({
  termSubjectEnrollment: one(termSubjectEnrollement, {
    fields: [results.termSubjectEnrollementId],
    references: [termSubjectEnrollement.id],
  }),
  assessmentType: one(assessmentType, {
    fields: [results.assessmentTypeId],
    references: [assessmentType.id],
  }),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  termSubject: one(termSubject, {
    fields: [classes.termSubjectId],
    references: [termSubject.id],
  }),
  attendanceRecords: many(attendance),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  termSubjectEnrollment: one(termSubjectEnrollement, {
    fields: [attendance.termSubjectEnrollementId],
    references: [termSubjectEnrollement.id],
    relationName: "enrollmentAttendance",
  }),
  student: one(users, {
    fields: [attendance.studentId],
    references: [users.id],
    relationName: "studentAttendance",
  }),
  class: one(classes, {
    fields: [attendance.classId],
    references: [classes.id],
  }),
}));

// Writing this for type safety while generating the schema and reading the data from the database

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Batch = typeof batch.$inferSelect;
export type NewBatch = typeof batch.$inferInsert;

export type Degree = typeof degrees.$inferSelect;
export type NewDegree = typeof degrees.$inferInsert;

export type StudentProfile = typeof studentProfile.$inferSelect;
export type NewStudentProfile = typeof studentProfile.$inferInsert;

export type Subject = typeof subject.$inferSelect;
export type NewSubject = typeof subject.$inferInsert;

export type Term = typeof term.$inferSelect;
export type NewTerm = typeof term.$inferInsert;

export type TermSubject = typeof termSubject.$inferSelect;
export type NewTermSubject = typeof termSubject.$inferInsert;

export type Classes = typeof classes.$inferSelect;
export type NewClasses = typeof classes.$inferInsert;

export type TermSubjectEnrollment = typeof termSubjectEnrollement.$inferSelect;
export type NewTermSubjectEnrollment =
  typeof termSubjectEnrollement.$inferInsert;

export type AssessmentType = typeof assessmentType.$inferSelect;
export type NewAssessmentType = typeof assessmentType.$inferInsert;

export type Results = typeof results.$inferSelect;
export type NewResults = typeof results.$inferInsert;

export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
