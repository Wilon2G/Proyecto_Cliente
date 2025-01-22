import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";



export const loader: LoaderFunction = async ({ request }) => {
  
    const cookieHeader = request.headers.get('cookie');
    const session = await getSession(cookieHeader);
    return redirect(
        "/login",{
            headers: { "Set-Cookie": await destroySession(session) }
        }
    );
  };

 