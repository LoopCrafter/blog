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
  const image = formData.get("image") as File | null;
  console.log("Received form data:", { titleRaw, contentRaw, image });
  const blogData = {
    title: typeof titleRaw === "string" ? titleRaw : "",
    content: typeof contentRaw === "string" ? contentRaw : "",
    image,
  };
  const result = blogSchema.safeParse(blogData);
  const errors: Record<string, string> = {};
  if (!result.success) {
    Object.assign(errors, zodToFieldErrors(result.error));
  }

  if (!image || image.size === 0) {
    errors.image = "Image is required";
  } else {
    if (!image.type.startsWith("image/")) {
      errors.image = "Selected file must be an image";
    }

    if (image.size > 1024 * 1024) {
      errors.image = "Image size must be less than 1MB";
    }
  }

  if (Object.keys(errors).length > 0) {
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
