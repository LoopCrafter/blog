"use client";
import { createBlogAction } from "@/src/actions";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type InitialState = {
  errors: Record<string, string>;
  success: boolean;
  data: Record<string, string>;
};

const initialState: InitialState = {
  success: false,
  errors: {},
  data: {},
};
const CreatePostPage = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createBlogAction,
    initialState,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Post created!");
      router.push("/");
      return;
    }

    if (state.errors?.general) toast.error(state.errors.general);
  }, [state, router]);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts and ideas with the world by creating a new post.
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup className="gap-y-4">
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input
                  placeholder="My First Blog Post"
                  type="text"
                  name="title"
                  defaultValue={state.data.title}
                  className={`${state.errors.title ? "border-red-500" : ""}`}
                />
                {state.errors.title && (
                  <span className="text-red-500 text-sm">
                    {state.errors.title}
                  </span>
                )}
              </Field>
              <Field>
                <FieldLabel>Content</FieldLabel>
                <Textarea
                  placeholder="Write your blog content here..."
                  name="content"
                  defaultValue={state.data.content}
                  className={`${state.errors.content ? "border-red-500" : ""}`}
                />
                {state.errors.content && (
                  <span className="text-red-500 text-sm">
                    {state.errors.content}
                  </span>
                )}
              </Field>
              <Button className="mt-6" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
                    <span className="ml-2">Creating...</span>
                  </>
                ) : (
                  <span>Create Post</span>
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;
