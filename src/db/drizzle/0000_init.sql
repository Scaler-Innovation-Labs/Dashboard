CREATE TABLE "degrees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"degree_name" text NOT NULL,
	"institution" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_degrees" (
	"user_id" uuid NOT NULL,
	"degree_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"emergency_phone_number" text NOT NULL,
	"profile_image" text NOT NULL,
	"github" text NOT NULL,
	"linkedin" text NOT NULL,
	"twitter" text NOT NULL,
	"leetcode" text NOT NULL,
	"codeforces" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_emergency_phone_number_unique" UNIQUE("emergency_phone_number")
);
--> statement-breakpoint
ALTER TABLE "user_degrees" ADD CONSTRAINT "user_degrees_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "user_degrees" ADD CONSTRAINT "user_degrees_degree_id_degrees_id_fk" FOREIGN KEY ("degree_id") REFERENCES "public"."degrees"("id") ON DELETE cascade ON UPDATE cascade;