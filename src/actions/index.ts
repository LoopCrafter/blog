"use server";
import { fetchMutation } from "convex/nextjs";
import { blogSchema } from "../schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { zodToFieldErrors } from "../helper";

export const createBlogAction = async (_: any, formData: FormData) => {
  const titleRaw = formData.get("title");
  const contentRaw = formData.get("content");

  const blogData = {
    title: typeof titleRaw === "string" ? titleRaw : "",
    content: typeof contentRaw === "string" ? contentRaw : "",
  };
  const result = blogSchema.safeParse(blogData);
  if (!result.success) {
    return {
      success: false,
      errors: zodToFieldErrors(result.error),
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
