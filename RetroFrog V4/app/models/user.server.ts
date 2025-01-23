import db from '~/db.server';
import { getCurrentUser } from '~/utils/auth.server';

export async function checkUser(username: string, password: string) {
  const user = await db.user.findUnique({
    where: {
      userName: username,
    },
  });
  if (!user) {
    return null;
  }
  if (user.password === password) {
    return user.id;
  } else {
    return null;
  }
}

export async function userExists(username: string) {
  const user = await db.user.findUnique({
    where: {
      userName: username,
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
