import { editBlogAction } from "@/src/actions";
import { PostForm } from "../_components/PostForm";
import { Suspense } from "react";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import PrivateComponent from "@/src/components/shared/PrivateComponent";

const EditPagewrapper = async ({ params }: { params: { id: Id<"posts"> } }) => {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: id });
  if (!post)
    return (
      <div className="h-62.5 flex items-center justify-center text-6xl font-extrabold text-red-500 p-20">
        Post not found
      </div>
    );

  return (
    <Suspense>
      <PrivateComponent>
        <div className="py-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Update Your Post
            </h1>
            <p className="text-xl text-muted-foreground pt-4">
              Update your thoughts and ideas with the world by creating a new
              post.
            </p>
          </div>
          <PostForm
            action={editBlogAction}
            submitText="Update Post"
            pendingText="Updating..."
            successMessage="Post created!"
            redirectPath="/"
            formTitle="Update Blog Article"
            formDescription="Update the blog article."
            initialValues={post}
          />
        </div>
      </PrivateComponent>
    </Suspense>
  );
};

const EditPost = async ({ params }: { params: { id: Id<"posts"> } }) => {
  return (
    <Suspense>
      <EditPagewrapper params={params} />
    </Suspense>
  );
};

export default EditPost;
