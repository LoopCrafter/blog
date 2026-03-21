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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { PostForm } from "../_components/PostForm";

type InitialState = {
  errors: Record<string, string>;
  success: boolean;
  data: Record<string, string | File | null | boolean>;
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

  const [draftChecked, setDraftChecked] = useState(
    state?.data?.status === true,
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Post created!");
      router.push("/");
      return;
    }
    if (state.data.status) {
      setDraftChecked(!!state.data.status);
    }
    if (state.errors?.general) toast.error(state.errors.general);
  }, [state, router]);
  return (
    <div className="py-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts and ideas with the world by creating a new post.
        </p>
      </div>
      <PostForm
        action={createBlogAction}
        submitText="Create Post"
        pendingText="Creating..."
        successMessage="Post created!"
        redirectPath="/"
        formTitle="Create Blog Article"
        formDescription="Create a new blog article."
      />
    </div>
  );
};

export default CreatePostPage;
