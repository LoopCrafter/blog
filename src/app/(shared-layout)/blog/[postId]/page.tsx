import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { buttonVariants } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PostDetailPageProps = {
  params: {
    postId: Id<"posts">;
  };
};
const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { postId } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId });
  if (!post)
    return (
      <div className="h-62.5 flex items-center justify-center">
        Post not found
      </div>
    );
  return (
    <div className="max-w-3xl mx-auto py-12">
      <Link
        href="/blog"
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
      >
        <ArrowLeft className="inline mr-2" /> Back
      </Link>
      <div className="  object-contain">
        <Image
          src={post.imageUrl || "/placeholder.png"}
          alt={post.title}
          className="h-100 w-full rounded-lg object-cover"
          width={400}
          height={200}
        />
      </div>
      <h1 className="text-3xl font-bold mt-6">{post.title}</h1>
      <span className="text-muted-foreground text-sm">
        Published on {new Date(post.createdAt).toLocaleDateString("en-US")}
      </span>
      <Separator className="my-6" />
      <p className="mt-4 text-lg leading-relaxed text-foreground/90">
        {post.content}
      </p>
      <Separator className="my-6" />
    </div>
  );
};

export default PostDetailPage;
