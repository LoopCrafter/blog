"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/src/components/ui/field";
import { Textarea } from "@/src/components/ui/textarea";
import { CommentSchema, CommentType } from "@/src/schemas/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader2, MessagesSquare } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const CommentSection = () => {
  const [isPending, startTransition] = useTransition();
  const params = useParams<{ postId: Id<"posts"> }>();
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
  return (
    <Card>
      <CardHeader className="flex items-center">
        <MessagesSquare className="size-5" />
        <h2 className="text-xl font-bold">5 comments</h2>
      </CardHeader>
      <CardContent>
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
              <span>Submit</span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
