import { cn } from "@/lib/utils";
import { buttonVariants } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center max-w-md mx-auto w-full">
      <div className="flex items-center justify-center absolute z-10 left-5 top-5">
        <Link className={buttonVariants({ variant: "secondary" })} href="/">
          <ArrowLeft className="size-4" />
          Go Back
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
