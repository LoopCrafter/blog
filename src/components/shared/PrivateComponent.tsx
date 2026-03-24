import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";

const PrivateComponent = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthorized = await isAuthenticated();
  if (!isAuthorized) redirect("/auth/login");
  return children;
};

export default PrivateComponent;
