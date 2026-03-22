"use client";

import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import Image from "next/image";

import { PostType } from "@/src/types";

type PostCardProps = {
  post: PostType;
  cardAction?: React.ReactNode;
  children?: React.ReactNode;
};

const PostCard = ({ post, cardAction, children }: PostCardProps) => {
  return (
    <Card className="overflow-hidden py-0 transition-shadow hover:shadow-lg gap-3">
      <div className="relative h-48">
        <Image
          src={
            post.imageUrl ??
            "https://placehold.jp/040c81/ffffff/600x600.png?text=Image%20Not%20Available&css=%7B%22border-radius%22%3A%2215px%22%2C%22font-size%22%3A%2252px%22%7D"
          }
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold line-clamp-1">{post.title}</h2>

          {post.status === "draft" && (
            <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
              Draft
            </span>
          )}
        </div>

        <p className="line-clamp-1 text-sm text-muted-foreground">
          {post.content}
        </p>
      </CardContent>

      {cardAction ? (
        <CardFooter className="grid grid-cols-2 gap-3 px-5 pb-5 pt-0">
          {cardAction}
        </CardFooter>
      ) : null}
      {children}
    </Card>
  );
};

export default PostCard;
