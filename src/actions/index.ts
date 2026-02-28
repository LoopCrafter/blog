"use server";
import { blogSchema } from "../schemas/blog";

export const createBlogAction = async (_: any, formData: FormData) => {
  const blogData = {
    title: (formData.get("title") as string) ?? "",
    content: (formData.get("content") as string) ?? "",
  };
  const results = blogSchema.safeParse(blogData);
  console.log("Received blog data:", results);
  if (!results.success) {
    const errors: Record<string, string> = {};

    results.error.issues.forEach((issue) => {
      const field = issue.path.join(".");

      if (!errors[field]) {
        errors[field] = issue.message;
      }
    });
    return {
      success: false,
      errors,
      data: blogData,
    };
  }
  return {
    success: true,
    data: blogData,
    errors: {
      title: "",
      content: "",
    },
  };
};
