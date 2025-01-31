import db from '~/db.server';
import { getCurrentUser } from '~/utils/auth.server';
import bcrypt from "bcryptjs";


export async function checkUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return null;
  }

  //Tenemos contraseñas seguras hasheadas chiquis wiiiiiiii!!!! <3
  const isValid = await bcrypt.compare(password, user.password);

  if (isValid) {
    return user.id;
  }
  return null;
}

export async function userExists(email: string) {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return false;
  } else {
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

export async function updateTheme(
  id: string,
  theme: string,
  bg: string,
  font: string,
) {
  const user = await getUserById(id);
  const userid = user?.id;
  const updatedTheme = `${theme}:${bg}:${font}`;

  // Actualiza el tema en la base de datos
  return db.user.update({
    where: { id: userid },
    data: {
      theme: updatedTheme, // Asumiendo que 'theme' es un campo de tipo string en tu modelo
    },
  });
}

export async function getThemes(id: string) {
  const user = await getUserById(id);
  const userid = user?.id;
  const themeData = await db.user.findUnique({
    where: { id: userid },
    select: {
      theme: true,
    },
  });

  return themeData?.theme.split(':');
}

//Función para comprobar si el usuario está logeado que no redirige
export async function getUserId(request: Request) {
  const user = await getCurrentUser(request);
  if (user === null) {
    return null;
  }

  return user.id;
}

//funcion pa nuevo usuario
/* type Role = 'ADMIN' | 'USER'; // TIPO DE ROLES */

export async function createUser(userData: {
  password: string;
  name: string;
  email: string;
}) {

  const saltRounds = 10; // Esto es la cantidad de veces que se hashea la contraseña, lo he puesto a diez pero no sé si es mejor menos por tema velocidad...
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  return db.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: 'USER',
    },
  });
}

export async function getUserFavGames(id: string) {
  return db.user.findUnique({
    where: { id },
    include: {
      GamesUnlocked: {
        include: {
          UsersFavorited: true,
        },
      },
    },
  });
}



/*
Notas para la presentación:
En una contraseña hasheada por ejemplo:
$2a$10$SJBIceDe1QldKzfarZPhKuk6af/KgLGejnz.N/53V62h43wpFSysu

Lo que va después del primer $ es el algoritmo que se ha utilizado, en este caso el algoritmo bcrypt la versión a2.
Lo siguiente $10 es el número de veces que se ha hasheado, esto lo hemos decidido antes en la variable saltRounds.
Los siguientes 22 caracteres son la salt.
Y por último, el resto es la contraseña hasheada.
:)
*/