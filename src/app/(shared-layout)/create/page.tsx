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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { blogSchema } from "@/src/schemas/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const CreatePostPage = () => {
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
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
          <FieldGroup className="gap-y-4">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      placeholder="My First Blog Post"
                      aria-invalid={fieldState.invalid}
                      type="text"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              control={form.control}
              name="content"
              render={({ field, fieldState }) => {
                return (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      placeholder="Write your blog content here..."
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            <Button className="mt-6"> Create Post </Button>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostPage;
