"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/src/components/ui/field";
import { Separator } from "@/src/components/ui/separator";
import { Textarea } from "@/src/components/ui/textarea";
import { CommentSchema, CommentType } from "@/src/schemas/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { Loader2, MessagesSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const CommentSection = () => {
  const [isPending, startTransition] = useTransition();
  const params = useParams<{ postId: Id<"posts"> }>();

  const comments = useQuery(api.comments.getCommentsByPost, {
    postId: params.postId,
  });
  const createComment = useMutation(api.comments.createComment);
  const form = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      postId: params.postId,
      body: "",
    },
  });
  const onSubmit = async (data: CommentType) => {
    startTransition(async () => {
      try {
        await createComment({
          body: data.body,
          postId: data.postId,
        });
        toast.success("Comment Posted!");
        form.reset();
      } catch (error) {
        toast.error("Failed to Create Post!");
      }
    });
  };
  if (comments === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <Card>
      <CardHeader className="flex items-center">
        <MessagesSquare className="size-5" />
        <h2 className="text-xl font-bold">
          {comments.length ?? 0} comment{comments.length > 1 ? "s" : ""}
        </h2>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>comment</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="share your thoughts"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription></FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button className="" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="animate-spin size-4" />
                <span className="ml-2">Creating...</span>
              </>
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>
        {comments?.length > 0 && <Separator />}
        <section className="space-y-6">
          {comments?.map((comment) => (
            <div className="flex gap-4" key={comment._id}>
              <Avatar className="size-10 shrink-0">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${comment.authorName}`}
                  alt={comment.authorName}
                />
                <AvatarFallback>
                  {comment.authorName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{comment.authorName}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(comment._creationTime).toLocaleDateString(
                      "en-US",
                    )}
                  </p>
                </div>
                <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
