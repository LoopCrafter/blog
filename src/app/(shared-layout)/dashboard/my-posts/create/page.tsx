"use client";
import { createBlogAction } from "@/src/actions";
import { PostForm } from "../_components/PostForm";

const CreatePostPage = () => {
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
