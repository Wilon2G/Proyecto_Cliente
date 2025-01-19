import { redirect } from "@remix-run/node";
import { getUserById } from "~/models/user.server";
import { getSession } from "~/sessions";

export async function getCurrentUser(request: Request) {
    const cookieHeader = request.headers.get("cookie");
    const session = await getSession(cookieHeader);
  
    const userId = session.get("userId");
  
    if (!userId) {
      return null;
    }
  
    return getUserById(userId);
  }
  
  export async function requiredLoggedOutUser(request: Request) {
    const user = await getCurrentUser(request);
    if (user !== null) {
      throw redirect("/app");
    }
  }
  
  export async function requiredLoggedInUser(request: Request) {
    const user = await getCurrentUser(request);
    if (user === null) {
      throw redirect("/login");
    }
  
    return user;
  }
  