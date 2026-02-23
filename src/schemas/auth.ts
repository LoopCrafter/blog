import z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(8).max(30),
});
