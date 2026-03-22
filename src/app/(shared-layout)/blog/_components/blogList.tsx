import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
import PostCard from "@/src/components/shared/PostCard";
import { fetchQuery } from "convex/nextjs";
import { cacheLife, cacheTag } from "next/cache";
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
        <PostCard key={post.id} post={post}>
          <div className="p-4 text-right">
            <Link
              href={`/blog/${post.id}`}
              className={buttonVariants({ variant: "default" })}
            >
              Read More{" "}
            </Link>
          </div>
        </PostCard>
      ))}
    </div>
  );
};

export default BlogList;
