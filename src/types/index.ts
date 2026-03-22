import { Id } from "@/convex/_generated/dataModel";

export type InitialState = {
  errors: Record<string, string>;
  success: boolean;
  data: Record<string, string | File | undefined | boolean>;
};

export type PostType = {
  title: string;
  content: string;
  status: "publish" | "draft";
  imageUrl?: string | null;
  id: Id<"posts">;
};
