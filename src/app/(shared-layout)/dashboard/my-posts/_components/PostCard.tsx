"use client";
import { buttonVariants } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { PostType } from "@/src/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PostCardProps = {
  post: PostType;
};

const PostCard = ({ post }: PostCardProps) => {
  const deletePost = useMutation(api.posts.deletePostById);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const habdlerRemovePost = () => {
    try {
      startTransition(async () => {
        await deletePost({ postId: post.id });
        toast.success("Post removed successfully!");
        router.refresh();
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("error" + error.message);
      } else {
        toast.error("there is some error, please Try again later");
      }
    }
  };
  return (
    <Card className="overflow-hidden py-0 transition-shadow hover:shadow-lg gap-3">
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? (
                <span>
                  <Loader2 className="size-4 animate-spin" />
                </span>
              ) : (
                <>
                  <Trash2 />
                  Remove
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={habdlerRemovePost}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
