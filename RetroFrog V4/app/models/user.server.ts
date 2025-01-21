import db from "~/db.server";


export async function checkUser(username:string, password:string){
    const user= await db.user.findUnique({
        where: {
            userName:username
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

export async function userExists(username:string){
    const user= await db.user.findUnique({
        where:{
            userName:username
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
  
