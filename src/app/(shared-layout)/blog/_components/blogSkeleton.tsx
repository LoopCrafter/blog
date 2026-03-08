import { Skeleton } from "@/src/components/ui/skeleton";

const BlogSkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
      {[...Array(6)].map((_, i) => {
        return (
          <div className="p-6" key={i}>
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="space-y-4 p-6 py-8">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-10 w-full rounded-md mt-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogSkeleton;
