"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between py-4">
      <div className="flex items-center justify-center gap-3">
        <Link href="/">
          <h1 className="font-bold text-3xl flex items-center gap-1">
            My
            <span className="text-primary">Blog</span>
          </h1>
        </Link>
        <ul className="flex items-center justify-center">
          <li className={`${cn(buttonVariants({ variant: "ghost" }))}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`${cn(buttonVariants({ variant: "ghost" }))}`}>
            <Link href="/blog">Blog</Link>
          </li>
          {isAuthenticated && (
            <li className={`${cn(buttonVariants({ variant: "ghost" }))}`}>
              <Link href="/dashboard/my-posts">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <div className="mr-2 hidden md:block">
          <SearchInput />
        </div>
        <ThemeToggle />
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success("Logged out successfully");
                    router.push("/");
                  },
                  onError: (error) => {
                    toast.error(`Logout failed: ${error.error.message}`);
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              href="/auth/login"
              className={`${cn(buttonVariants({ variant: "outline" }))}`}
            >
              Login
            </Link>
            <Link href="/auth/signup" className={`${cn(buttonVariants())}`}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
