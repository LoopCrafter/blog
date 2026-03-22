"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/src/components/ui/button";
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
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

const CardActions = ({ postId }: { postId: Id<"posts"> }) => {
  const deletePost = useMutation(api.posts.deletePostById);
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const habdlerRemovePost = () => {
    try {
      startTransition(async () => {
        await deletePost({ postId });
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
    <>
      <Link
        href={`/dashboard/my-posts/${postId}`}
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
    </>
  );
};

export default CardActions;
