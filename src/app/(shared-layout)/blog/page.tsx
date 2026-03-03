import { Suspense } from "react";
import BlogList from "./_components/blogList";
import BlogSkeleton from "./_components/blogSkeleton";

const BlogPage = async () => {
  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insight, thoughts and trends from our team.
        </p>
      </div>
      <Suspense fallback={<BlogSkeleton />}>
        <BlogList />
      </Suspense>
    </div>
  );
};

export default BlogPage;
