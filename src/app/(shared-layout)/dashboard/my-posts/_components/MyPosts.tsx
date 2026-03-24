import { api } from "@/convex/_generated/api";
import { getToken, isAuthenticated } from "@/lib/auth-server";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
import PostCard from "@/src/components/shared/PostCard";
import { fetchQuery } from "convex/nextjs";
import CardActions from "./CardActions";
import { redirect } from "next/navigation";

const MyPosts = async () => {
  const isAuthorized = await isAuthenticated();
  if (!isAuthorized) redirect("/auth/login");
  const token = await getToken();
  const posts = await fetchQuery(api.posts.getPostsByUser, {}, { token });
  if (!posts.length) {
    return <EmptyBlog />;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-10">
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          cardAction={<CardActions postId={post.id} />}
        />
      ))}
    </div>
  );
};

export default MyPosts;
