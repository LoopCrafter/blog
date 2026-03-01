"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const BlogPage = () => {
  const data = useQuery(api.posts.getPosts, {});
  console.log("hamed data", data);
  return <div>BlogPage</div>;
};

export default BlogPage;
