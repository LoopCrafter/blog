"use server";
import { fetchMutation } from "convex/nextjs";
import { blogSchema } from "../schemas/blog";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { zodToFieldErrors } from "../helpers";
import { updateTag } from "next/cache";
import {
  getActionErrorMessage,
  getBlogFormValues,
  handleActionError,
  uploadPostImageIfNeeded,
  validateBlogForm,
} from "../helpers/post";

export const createBlogAction = async (_: any, formData: FormData) => {
  const blogData = getBlogFormValues(formData);

  const validation = validateBlogForm(blogSchema, blogData, zodToFieldErrors);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      data: blogData,
    };
  }

  try {
    const token = await getToken();
    const imageStorageId = await uploadPostImageIfNeeded({
      image: blogData.image,
      token,
    });

    const requestObj = {
      title: validation.data.title,
      content: validation.data.content,
      status: validation.data.status,
      ...(imageStorageId ? { imageStorageId } : {}),
    };

    await fetchMutation(api.posts.createPost, requestObj, { token });
  } catch (error: unknown) {
    handleActionError(error);

    return {
      success: false,
      errors: {
        general: getActionErrorMessage(error),
      },
      data: blogData,
    };
  }
  updateTag("blog");
  redirect("/dashboard/my-posts");
};

export const editBlogAction = async (_: any, formData: FormData) => {
  const blogData = getBlogFormValues(formData);

  const validation = validateBlogForm(blogSchema, blogData, zodToFieldErrors);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      data: blogData,
    };
  }

  try {
    const token = await getToken();
    const imageStorageId = await uploadPostImageIfNeeded({
      image: blogData.image,
      token,
    });

    const requestObj = {
      title: validation.data.title,
      content: validation.data.content,
      status: validation.data.status,
      ...(imageStorageId ? { imageStorageId } : {}),
      postId: blogData.postId,
    };
    await fetchMutation(api.posts.updatePost, requestObj, { token });
  } catch (error: unknown) {
    handleActionError(error);

    return {
      success: false,
      errors: {
        general: getActionErrorMessage(error),
      },
      data: blogData,
    };
  }
  updateTag("blog");
  redirect("/dashboard/my-posts");
};
