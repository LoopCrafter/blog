import { Suspense } from "react";
import MyPosts from "./_components/MyPosts";
import { Button, buttonVariants } from "@/src/components/ui/button";
import Link from "next/link";

const MyPostsPage = async () => {
  return (
    <div>
      {/* <MyPosts /> */}
      <h1 className="flex items-center justify-between">
        <span className="text-xl font-bold">My Posts</span>
        <Link href="/dashboard/my-posts/create" className={buttonVariants()}>
          Create New Post
        </Link>
      </h1>
      <Suspense fallback={<div>LOADING...</div>}>
        <MyPosts />
      </Suspense>
    </div>
  );
};

export default MyPostsPage;
