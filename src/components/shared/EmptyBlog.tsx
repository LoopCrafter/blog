import { FileText } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const EmptyBlog = () => {
  return (
    <div className="flex min-h-75 mt-10 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
      <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
        <FileText className="h-10 w-10 text-gray-500" />
      </div>

      <h2 className="text-lg font-semibold text-gray-900">No blog posts yet</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        You don’t have any blog posts right now. Start by creating your first
        post.
      </p>
      <Link href="/dashboard/create" className={`${buttonVariants()} mt-6`}>
        Create New Post
      </Link>
    </div>
  );
};

export default EmptyBlog;
