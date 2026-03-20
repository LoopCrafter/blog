import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
    status: v.union(v.literal("publish"), v.literal("draft")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("User not authenticated");
    }

    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
      status: args.status,
    });

    return blogArticle;
  },
});

export const getPosts = query({
  args: {
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const PAGE_SIZE = 9;

    const result = await ctx.db
      .query("posts")
      .order("desc")
      .paginate({
        cursor: args.cursor ?? null,
        numItems: PAGE_SIZE,
      });

    const items = await Promise.all(
      result.page.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          id: post._id,
          createdAt: post._creationTime,
          authorId: post.authorId,
          excerpt: post.content.slice(0, 140),
          content: post.content,
          title: post.title,
          imageUrl: resolvedImageUrl,
        };
      }),
    );

    return {
      items,
      nextCursor: result.continueCursor,
    };
  },
});

export const getPostById = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return null;
    const imageUrl = post.imageStorageId
      ? await ctx.storage.getUrl(post.imageStorageId)
      : null;

    return {
      id: post._id,
      createdAt: post._creationTime,
      authorId: post.authorId,
      content: post.content,
      title: post.title,
      imageUrl,
    };
  },
});
export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("User not authenticated");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostsByUser = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }
    const result = await ctx.db
      .query("posts")
      .withIndex("by_authorId", (q) => q.eq("authorId", user._id))
      .order("desc")
      .collect();

    const items = await Promise.all(
      result.map(async (post) => {
        const resolvedImageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          id: post._id,
          createdAt: post._creationTime,
          authorId: post.authorId,
          excerpt: post.content.slice(0, 140),
          content: post.content,
          title: post.title,
          imageUrl: resolvedImageUrl,
        };
      }),
    );

    return items ?? [];
  },
});
