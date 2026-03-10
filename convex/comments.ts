import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";

export const getCommentsByPost = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const { postId } = args;

    const data = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("postId"), postId))
      .order("desc")
      .collect();
    return data;
  },
});

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const { postId, body } = args;
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("User not authenticated");
    }
    const commentId = await ctx.db.insert("comments", {
      postId,
      authorId: user._id,
      authorName: user.name || "Unknown User",
      body,
    });
    return commentId;
  },
});
