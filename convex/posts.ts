import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
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
    });

    return blogArticle;
  },
});

export const getPosts = query({
  args: {
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const PAGE_SIZE = 5;

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
