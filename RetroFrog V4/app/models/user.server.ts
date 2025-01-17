import db from "~/db.server";


export async function checkUser(username:string, password:string){
    const user= await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        return null;
    }

    if (user.password===password) {
        return user;
    }
    else{
        return null;
    }
}

