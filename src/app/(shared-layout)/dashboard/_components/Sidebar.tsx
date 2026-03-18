"use client";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="w-1/6 sticky top-0 ">
      <Card className="w-full max-w-xl mx-auto p-2 ">
        <CardContent className="px-2">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/my-posts">My Posts</Link>
            </li>
            <li>
              <Separator />
            </li>
            <li className="text-red-600">
              <button
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
              </button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sidebar;
