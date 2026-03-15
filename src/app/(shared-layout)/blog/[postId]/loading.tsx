import { buttonVariants } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
const Loadig = () => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <span
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
      >
        <ArrowLeft className="inline mr-2" />
        Back
      </span>

      <div className="object-contain">
        <Skeleton className="h-100 w-full rounded-lg" />
      </div>

      <Skeleton className="mt-6 h-10 w-3/4" />

      <Skeleton className="mt-3 h-4 w-40" />

      <Separator className="my-6" />

      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-10/12" />
        <Skeleton className="h-5 w-9/12" />
      </div>

      <Separator className="my-6" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Loadig;
