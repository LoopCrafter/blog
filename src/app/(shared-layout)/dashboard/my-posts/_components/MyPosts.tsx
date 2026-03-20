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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <Card
          key={post.id}
          className="overflow-hidden pt-0 transition-shadow hover:shadow-lg"
        >
          <div className="relative h-48">
            <Image
              src={post.imageUrl ?? "https://placehold.net/600x600.png"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <CardContent className="space-y-3 p-5">
            <Link
              href={`/blog/${post.id}`}
              className="block transition-opacity hover:opacity-80"
            >
              <h2 className="line-clamp-2 text-xl font-bold">{post.title}</h2>
            </Link>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {post.content}
            </p>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-3 px-5 pb-5 pt-0">
            <Link
              href={`/blog/${post.id}/edit`}
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
