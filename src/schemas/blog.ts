import z from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title is required")
    .max(50, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(10, "Content is Too Short")
    .max(5000, "Content must be less than 5000 characters"),
  image: z.instanceof(File),
});

export type Blog = z.infer<typeof blogSchema>;
