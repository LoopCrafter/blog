"use server";
import { fetchMutation } from "convex/nextjs";
import { blogSchema } from "../schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { zodToFieldErrors } from "../helper";
import { updateTag } from "next/cache";

export const createBlogAction = async (_: any, formData: FormData) => {
  const titleRaw = formData.get("title");
  const contentRaw = formData.get("content");
  const statusRaw = formData.get("status");
  const status: "draft" | "publish" = statusRaw === "on" ? "draft" : "publish";
  const image = formData.get("image") as File;
  const blogData = {
    title: typeof titleRaw === "string" ? titleRaw : "",
    content: typeof contentRaw === "string" ? contentRaw : "",
    status: statusRaw === "on" ? "draft" : "publish",
    image,
  };

  const result = blogSchema.safeParse(blogData);
  const errors: Record<string, string> = {};
  if (!result.success) {
    Object.assign(errors, zodToFieldErrors(result.error));
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
    const requestObj = {
      title: blogData.title,
      content: blogData.content,
      imageStorageId: undefined,
      status,
    };
    if (image && image.size > 0) {
      console.log("hamed", image);
      const imageUrl = await fetchMutation(
        api.posts.generateImageUploadUrl,
        {},
        { token },
      );
      const uploadResult = await fetch(imageUrl, {
        method: "POST",
        headers: {
          "Content-Type": image.type,
        },
        body: image,
      });
      if (!uploadResult.ok) {
        console.error("Image upload failed", await uploadResult.text());
        throw new Error("Failed to upload image");
      }

      const { storageId } = await uploadResult.json();
      requestObj["imageStorageId"] = storageId;
    }
    await fetchMutation(api.posts.createPost, requestObj, { token });
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

    let errorMessage = "An error occurred while creating the post.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      success: false,
      errors: {
        general: errorMessage || "An error occurred while creating the post.",
      },
      data: blogData,
    };
  }
  updateTag("blog");
  redirect("/dashboard/my-posts");
};
