import db from "~/db.server";


export async function checkUser(userName:string, password:string){
    const user= await db.user.findUnique({
        where: {
            userName
        }
    })
    if (!user) {
        return null;
    }
    if (user.password===password) {
        return user.id;
    }
    else{
        return null;
    }
}

export async function userExists(userName:string){
    const user= await db.user.findUnique({
        where: {
            userName
        }
    })
    if (!user) {
        return false;
    }
    else{
        return true;
    }
}


export function getUserById(id: string) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  }
  
