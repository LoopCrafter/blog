import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
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

    const items = result.page.map((p) => ({
      id: p._id,
      createdAt: p._creationTime,
      authorId: p.authorId,
      excerpt: p.content?.slice(0, 140) ?? "",
      content: p.content,
      title: p.title,
    }));

    return {
      items,
      nextCursor: result.continueCursor,
    };
  },
});
