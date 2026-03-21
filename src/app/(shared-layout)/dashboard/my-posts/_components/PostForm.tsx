"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

type InitialState = {
  errors: Record<string, string>;
  success: boolean;
  data: Record<string, string | File | null | boolean>;
};

type PostFormValues = {
  title: string;
  content: string;
  status: "publish" | "draft";
  imageUrl?: string | null;
};

type PostFormProps = {
  action: (
    prevState: InitialState,
    formData: FormData,
  ) => Promise<InitialState>;
  initialValues?: Partial<PostFormValues>;
  submitText: string;
  pendingText: string;
  successMessage: string;
  redirectPath: string;
  postId?: string;
  formTitle?: string;
  formDescription?: string;
};

const buildInitialState = (
  initialValues?: Partial<PostFormValues>,
): InitialState => ({
  success: false,
  errors: {},
  data: {
    title: initialValues?.title ?? "",
    content: initialValues?.content ?? "",
    status: initialValues?.status ?? false,
  },
});

export function PostForm({
  action,
  initialValues,
  submitText,
  pendingText,
  successMessage,
  redirectPath,
  postId,
  formTitle = "Blog Article",
  formDescription = "Fill out the form below.",
}: PostFormProps) {
  const router = useRouter();

  const initialState = useMemo(
    () => buildInitialState(initialValues),
    [initialValues],
  );

  const [state, formAction, isPending] = useActionState(action, initialState);
  const [currentImageUrl, setCurrentImageUrl] = useState(
    initialValues?.imageUrl ?? null,
  );

  const [draftChecked, setDraftChecked] = useState(
    initialState.data.status === "draft",
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(successMessage);
      router.push(redirectPath);
      return;
    }

    if (typeof state.data.status === "string") {
      setDraftChecked(state.data.status === "draft");
    }

    if (state.errors?.general) {
      toast.error(state.errors.general);
    }
  }, [state, router, successMessage, redirectPath]);

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction}>
          <FieldGroup className="gap-y-4">
            {postId ? (
              <input type="hidden" name="postId" value={postId} />
            ) : null}

            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                placeholder="My First Blog Post"
                type="text"
                name="title"
                defaultValue={state.data.title as string}
                className={state.errors.title ? "border-red-500" : ""}
              />
              {state.errors.title ? (
                <span className="text-sm text-red-500">
                  {state.errors.title}
                </span>
              ) : null}
            </Field>

            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                placeholder="Write your blog content here..."
                name="content"
                defaultValue={state.data.content as string}
                className={state.errors.content ? "border-red-500" : ""}
              />
              {state.errors.content ? (
                <span className="text-sm text-red-500">
                  {state.errors.content}
                </span>
              ) : null}
            </Field>

            <Field>
              <FieldLabel htmlFor="picture">Picture</FieldLabel>
              {currentImageUrl ? (
                <div className="relative">
                  <Button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setCurrentImageUrl(null)}
                  >
                    <X className="size-4 text-white" />
                    <span>Remove</span>
                  </Button>
                  <Image
                    className="w-full rounded-lg"
                    src={currentImageUrl}
                    alt={state.data.title as string}
                    width={500}
                    height={300}
                  />
                </div>
              ) : (
                <Input
                  id="picture"
                  type="file"
                  name="image"
                  accept="image/*"
                  className={state.errors.image ? "border-red-500" : ""}
                />
              )}
              <FieldDescription>Select a picture to upload.</FieldDescription>
              {state.errors.image ? (
                <span className="text-sm text-red-500">
                  {state.errors.image}
                </span>
              ) : null}
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="status"
                name="status"
                checked={draftChecked}
                onCheckedChange={(value) => setDraftChecked(!!value)}
              />
              <FieldLabel htmlFor="status">Draft?</FieldLabel>
            </Field>

            <Button className="mt-6" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span className="ml-2">{pendingText}</span>
                </>
              ) : (
                <span>{submitText}</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
