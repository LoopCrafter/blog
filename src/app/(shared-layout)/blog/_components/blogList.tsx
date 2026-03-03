import { api } from "@/convex/_generated/api";
import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";

const fakeApi = () => {
  return new Promise((resolve) => setTimeout(resolve, 3000));
};
const BlogList = async () => {
  await fakeApi();
  const results = await fetchQuery(api.posts.getPosts, {});

  if (!results) return null;

  const { items, nextCursor } = results;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {items?.map((post) => (
        <div key={post.id} className="p-6 rounded-lg shadow-md">
          <Card key={post.id} className="pt-0">
            <div className="relative h-48 pt-0">
              <Image
                src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="blog"
                fill
                className="rounded-t-lg"
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
