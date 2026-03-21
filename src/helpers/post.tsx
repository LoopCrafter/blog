import { z } from "zod";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

type UploadImageArgs = {
  image: File | null;
  token?: string;
};

export type BlogActionState = {
  success: boolean;
  errors: Record<string, string>;
  data: {
    title?: string;
    content?: string;
    status?: "draft" | "publish";
    image?: File | null;
  };
};

export const initialBlogActionState: BlogActionState = {
  success: false,
  errors: {},
  data: {},
};

export function getBlogFormValues(formData: FormData) {
  const titleRaw = formData.get("title");
  const contentRaw = formData.get("content");
  const statusRaw = formData.get("status");
  const imageRaw = formData.get("image");
  const removeImageRaw = formData.get("removeImage");
  const removeImage = removeImageRaw === "true";
  const postIdRaw = formData.get("postId") || "";

  const postId = postIdRaw as Id<"posts">;

  const image = imageRaw instanceof File && imageRaw.size > 0 ? imageRaw : null;

  const values = {
    title: typeof titleRaw === "string" ? titleRaw : "",
    content: typeof contentRaw === "string" ? contentRaw : "",
    status: statusRaw === "on" ? "draft" : "publish",
    image,
    removeImage,
    postId: postId,
  } as const;

  return values;
}

export function validateBlogForm<T>(
  schema: z.ZodSchema<T>,
  values: unknown,
  zodToFieldErrors: (error: z.ZodError) => Record<string, string>,
) {
  const result = schema.safeParse(values);

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
      errors: {},
    };
  }

  return {
    success: false as const,
    data: null,
    errors: zodToFieldErrors(result.error),
  };
}

export async function uploadPostImageIfNeeded({
  image,
  token,
}: UploadImageArgs) {
  if (!image) return undefined;

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
    throw new Error("Failed to upload image");
  }

  const { storageId } = await uploadResult.json();
  return storageId as Id<"_storage"> | undefined;
}

export function isAuthError(error: unknown) {
  const raw = error instanceof Error ? error.message : "";

  return (
    raw.includes("User not authenticated") ||
    raw.includes("Unauthorized") ||
    raw.includes("Not authenticated") ||
    raw.includes("authentication")
  );
}

export function getActionErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "An error occurred while processing the post.";
}

export function handleActionError(error: unknown): never | undefined {
  if (isAuthError(error)) {
    redirect("/auth/login");
  }
}
