import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
import { fetchQuery } from "convex/nextjs";
import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

const MyPosts = async () => {
  const token = await getToken();
  const posts = await fetchQuery(api.posts.getPostsByUser, {}, { token });
  if (!posts.length) {
    return <EmptyBlog />;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-10">
      {posts?.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden py-0 transition-shadow hover:shadow-lg gap-3"
        >
          <div className="relative h-48">
            <Image
              src={
                post.imageUrl ??
                "https://placehold.jp/040c81/ffffff/600x600.png?text=Image%20Not%20Available&css=%7B%22border-radius%22%3A%2215px%22%2C%22font-size%22%3A%2252px%22%7D"
              }
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold line-clamp-1">{post.title}</h2>

              {post.status === "draft" && (
                <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                  Draft
                </span>
              )}
            </div>

            <p className="line-clamp-1 text-sm text-muted-foreground">
              {post.content}
            </p>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-3 px-5 pb-5 pt-0">
            <Link
              href={`/dashboard/my-posts/${post.id}`}
              className={buttonVariants({
                variant: "outline",
                className: "w-full",
              })}
            >
              <Pencil />
              Edit
            </Link>

            <button
              type="button"
              className={buttonVariants({
                variant: "destructive",
                className: "w-full",
              })}
            >
              <Trash2 />
              Remove
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyPosts;
