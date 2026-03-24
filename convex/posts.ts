import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./betterAuth/auth";
import { Doc, Id } from "./_generated/dataModel";

export const createPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
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

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    title: v.string(),
    content: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    status: v.union(v.literal("publish"), v.literal("draft")),
    removeImage: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    const existingPost = await ctx.db.get(args.postId);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== user._id) {
      throw new Error("Unauthorized");
    }

    const patchData: {
      title: string;
      content: string;
      status: "publish" | "draft";
      imageStorageId?: Id<"_storage">;
    } = {
      title: args.title,
      content: args.content,
      status: args.status,
    };

    if (args.removeImage) {
      patchData.imageStorageId = undefined;
    }

    if (args.imageStorageId) {
      patchData.imageStorageId = args.imageStorageId;
    }

    await ctx.db.patch(args.postId, patchData);

    return args.postId;
  },
});

export const deletePostById = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new Error("User not authenticated");
    }

    const existingPost = await ctx.db.get(args.postId);

    if (!existingPost) {
      throw new Error("Post not found");
    }

    if (existingPost.authorId !== user._id) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.postId);
    return { message: "Successfully removed!" };
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
      status: post.status,
    };
  },
});

export const getPosts = query({
  args: {
    cursor: v.optional(v.string()),
    page: v.number(),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const PAGE_SIZE = 9;
    const pageSize = args.pageSize ?? 9;
    const targetPage = Math.max(1, args.page);
    let cursor: string | null = null;
    let result = null;

    for (let currentPage = 1; currentPage <= targetPage; currentPage++) {
      result = await ctx.db
        .query("posts")
        .withIndex("by_status", (q) => q.eq("status", "publish"))
        .order("desc")
        .paginate({
          cursor,
          numItems: pageSize,
        });

      if (currentPage < targetPage && result.isDone) {
        break;
      }

      cursor = result.continueCursor;
    }

    const items = await Promise.all(
      (result?.page ?? []).map(async (post) => {
        const imageUrl =
          post.imageStorageId !== undefined
            ? await ctx.storage.getUrl(post.imageStorageId)
            : null;

        return {
          id: post._id,
          createdAt: post._creationTime,
          authorId: post.authorId,
          excerpt: post.content?.slice(0, 140) ?? "",
          content: post.content,
          title: post.title,
          imageUrl,
          status: post.status,
        };
      }),
    );

    return {
      items,
      currentPage: targetPage,
      hasMore: !(result?.isDone ?? true),
    };
  },
});

interface SearchResults {
  id: string;
  content: string;
  title: string;
}
export const searchPosts = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = args.limit;
    const results: SearchResults[] = [];
    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<"posts">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;
        seen.add(doc._id);
        results.push({
          id: doc._id,
          title: doc.title,
          content: doc.content,
        });
        if (results.length >= limit) break;
      }
    };

    const titleMatches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.term))
      .take(limit);
    console.log("titles", titleMatches);
    await pushDocs(titleMatches);

    if (results.length < limit) {
      const bodyMatches = await ctx.db
        .query("posts")
        .withSearchIndex("search_content", (q) =>
          q.search("content", args.term),
        )
        .take(limit);
      console.log("titles", bodyMatches);
      await pushDocs(bodyMatches);
    }

    return results;
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
          status: post.status,
        };
      }),
    );

    return items ?? [];
  },
});
