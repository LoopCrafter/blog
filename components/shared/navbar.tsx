import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-4">
      <div className="flex items-center justify-center gap-3">
        <Link href="/">
          <h1 className="font-bold text-3xl flex items-center gap-1">
            My
            <span className="text-blue-500">Blog</span>
          </h1>
        </Link>
        <ul className="flex items-center justify-center">
          <li className={`${cn(buttonVariants({ variant: "ghost" }))}`}>
            Home
          </li>
          <li className={`${cn(buttonVariants({ variant: "ghost" }))}`}>
            About
          </li>
          <li className={`${cn(buttonVariants({ variant: "ghost" }))}`}>
            Contact
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/auth/login"
          className={`${cn(buttonVariants({ variant: "outline" }))}`}
        >
          Login
        </Link>
        <Link href="/auth/signup" className={`${cn(buttonVariants())}`}>
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
