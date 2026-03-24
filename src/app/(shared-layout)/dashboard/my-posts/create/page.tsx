import PrivateComponent from "@/src/components/shared/PrivateComponent";
import { Suspense } from "react";
import { PostForm } from "../_components/PostForm";
import { createBlogAction } from "@/src/actions";

const CreatePostPage = () => {
  return (
    <Suspense>
      <PrivateComponent>
        <div className="py-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Create Post
            </h1>
            <p className="text-xl text-muted-foreground pt-4">
              Share your thoughts and ideas with the world by creating a new
              post.
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
      </PrivateComponent>
    </Suspense>
  );
};

export default CreatePostPage;
