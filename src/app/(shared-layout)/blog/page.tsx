import { Suspense } from "react";
import BlogList from "./_components/blogList";
import BlogSkeleton from "./_components/blogSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprin | Blog",
  description: "Read our latest articles and insights.",
  category: "Web development",
  authors: [{ name: "Hamed" }],
};

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  return (
    <div className="py-12">
      <div className="text-center mb-6">
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
