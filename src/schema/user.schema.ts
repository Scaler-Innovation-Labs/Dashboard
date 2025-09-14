import * as z from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
});

export type User = z.infer<typeof userSchema>;