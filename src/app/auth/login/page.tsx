"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/src/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button
        onClick={async () => {
          await authClient.signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
          });
        }}
      >
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default Page;
