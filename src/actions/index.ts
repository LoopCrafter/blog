"use server";
import { fetchMutation } from "convex/nextjs";
import { blogSchema } from "../schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export const createBlogAction = async (_: any, formData: FormData) => {
  const blogData = {
    title: (formData.get("title") as string) ?? "",
    content: (formData.get("content") as string) ?? "",
  };
  const results = blogSchema.safeParse(blogData);
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

  const token = await getToken();
  try {
    await fetchMutation(
      api.posts.createPost,
      {
        title: blogData.title,
        content: blogData.content,
      },
      { token },
    );
  } catch (error: unknown) {
    const raw = error instanceof Error ? error.message : "";

    const isAuthError =
      raw.includes("User not authenticated") ||
      raw.includes("Unauthorized") ||
      raw.includes("Not authenticated") ||
      raw.includes("authentication");
    if (isAuthError) {
      redirect("/auth/login");
    }

    console.log("Error creating blog post:", error);
    return {
      success: false,
      errors: {
        general: "An error occurred while creating the post.",
      },
      data: blogData,
    };
  }
  redirect("/");
};
