import Image from "next/image";
import BlogList from "./blog/_components/blogList";
import { Suspense } from "react";
import BlogSkeleton from "./blog/_components/blogSkeleton";

export default function Home() {
  return (
    <div className="mt-6">
      <Suspense fallback={<BlogSkeleton />}>
        <BlogList pageSize={6} />
      </Suspense>
    </div>
  );
}
