import { PrismaClient } from "@prisma/client";
import { Form, json, redirect, useNavigate } from "@remix-run/react";

const prisma = new PrismaClient();

export async function loader() {
  const users = await prisma.user.findMany();
  return { users };
}

export async function action({request}){
  const formData=await request.formData();
  const userName=formData.get("userName");
  const password=formData.get("password");

  if (!userName||!password) {
    return json({error: "Error, debe rellenar todos los campos"});
  }

  const user = await prisma.user.findMany({
    where: { userName: userName as string }
  });

  if (!user) {
    return json({error: "Error, nombre de usuario incorrecto"});
  }
  
  return redirect("/home/main");
}


export default function Kk() {
  const nav = useNavigate();

  function handleClick() {
    nav("/home/main");
  }

  return (
    <div className="bg-sky-200">
      <h1>Log In / Register Page :)</h1>
      <Form method="post">
        <label>Username:
          <input type="text" name="userName"/>
        </label>
        <label>Password:
          <input type="password" name="password"/>
        </label>
        <button type="submit"> Entrar</button>
      </Form>
      <button onClick={handleClick}> Entrar sin login, jejeje</button>

    </div>
  );
}
