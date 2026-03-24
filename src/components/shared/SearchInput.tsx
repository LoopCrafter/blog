"use client";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const SearchInput = () => {
  const [term, setTerm] = useState("");
  const [openSuggestedResults, setOpenSuggestedResults] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 6, term } : "skip",
  );
  console.log("results:", results);

  function handlechangeTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpenSuggestedResults(true);
  }
  return (
    <div className="relative w-full max-w-sm z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Posts..."
          className="w-full pl-8 bg-background"
          value={term}
          onChange={handlechangeTerm}
        />
      </div>
      {openSuggestedResults && term.length > 2 && (
        <div className="absolute top-full w-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No Result Found!
            </div>
          ) : (
            <div className="py-1">
              {results.map((post) => (
                <Link
                  href={`/blog/${post.id}`}
                  key={post.id}
                  className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer w-full"
                  onClick={() => {
                    setOpenSuggestedResults(false);
                    setTerm("");
                  }}
                >
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground pt-1 ">
                    {post.content.substring(0, 60)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
