import { api } from "@/convex/_generated/api";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
import PostCard from "@/src/components/shared/PostCard";
import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { fetchQuery } from "convex/nextjs";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

const BlogList = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("blog");
  const results = await fetchQuery(api.posts.getPosts, {});

  if (!results) return null;
  const { items, nextCursor } = results;

  if (!items.length) return <EmptyBlog />;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {items?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
