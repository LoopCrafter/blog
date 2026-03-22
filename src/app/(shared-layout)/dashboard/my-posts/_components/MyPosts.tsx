import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
import { fetchQuery } from "convex/nextjs";
import PostCard from "./PostCard";

const MyPosts = async () => {
  const token = await getToken();
  const posts = await fetchQuery(api.posts.getPostsByUser, {}, { token });
  if (!posts.length) {
    return <EmptyBlog />;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-10">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MyPosts;
