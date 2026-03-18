import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import EmptyBlog from "@/src/components/shared/EmptyBlog";
import { fetchQuery } from "convex/nextjs";

const MyPosts = async () => {
  const token = await getToken();
  const posts = await fetchQuery(api.posts.getPostsByUser, {}, { token });
  console.log(posts);
  if (!posts.length) {
    return <EmptyBlog />;
  }
  return <div>MyPosts</div>;
};

export default MyPosts;
