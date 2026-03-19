import { redirect } from "next/navigation";
import { isAuthenticated } from "./auth-server";

export const isUserLoggedin = async () => {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/auth/login");
  }
};
