import { api } from "@/convex/_generated/api";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
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
        <div key={post.id} className="p-6 rounded-lg shadow-md">
          <Card key={post.id} className="pt-0">
            <div className="relative h-48 pt-0">
              <Image
                src={post.imageUrl || "/placeholder.png"}
                alt="blog"
                fill
                className="rounded-t-lg object-cover"
              />
            </div>
            <CardContent>
              <Link href={`/blog/${post.id}`} className="hover:text-primary">
                <h1 className="text-2xl font-bold">{post.title}</h1>
              </Link>
              <p className="text-muted-foreground line-clamp-2">
                {post.content}
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/blog/${post.id}`}
                className={buttonVariants({ className: "w-full" })}
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
