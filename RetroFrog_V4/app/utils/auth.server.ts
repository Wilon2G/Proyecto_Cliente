import { redirect } from '@remix-run/node';
import fs from 'fs';
import path from 'path';
import db from '~/db.server';
import { getUserById } from '~/models/user.server';
import { getSession } from '~/sessions';

export async function getCurrentUser(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return getUserById(userId);
}

export async function requiredLoggedOutUser(request: Request) {
  const user = await getCurrentUser(request);
  if (user !== null) {
    throw redirect('/home/main');
  }
}

export async function requiredLoggedInUser(request: Request) {
  const user = await getCurrentUser(request);
  if (user === null) {
    throw redirect('/login');
  }

  return user;
}

/***********¿METER EN MODELO USER? */
export async function setUser(
  userId: string,
  userData: {
    name: string;
    email: string;
    pfp: string;
    theme: string;
  },
) {
  try {
    // Si 'pfp' es una nueva imagen (es decir, es una URL con el nombre de archivo del usuario)
    if (userData.pfp) {
      const userDir = path.join(__dirname, '..', 'assets', 'icon', 'pfp');
      const oldFile = path.join(userDir, `${userId}.png`);

      // Si ya existe un archivo de perfil previo, lo eliminamos
      if (fs.existsSync(oldFile)) {
        fs.unlinkSync(oldFile); // Borra la imagen anterior
      }

      // Mueve la nueva imagen o la URL de la imagen (si se pasa una URL, no es necesario moverla)
      const newImagePath = path.join(userDir, `${userId}.png`);
      // Si 'pfp' es un archivo y no una URL, mueve el archivo desde su ubicación temporal a la nueva ubicación
      // Asumimos que el archivo ya ha sido cargado a un directorio temporal.
      if (fs.existsSync(userData.pfp)) {
        fs.renameSync(userData.pfp, newImagePath); // Esto mueve el archivo de perfil al directorio de destino
      } else {
        // Si 'pfp' es solo una URL, no hacemos nada con el archivo, solo lo guardamos como URL.
        // Esto dependerá de cómo el archivo es tratado en el frontend.
      }

      userData.pfp = `/assets/icon/pfp/${userId}.png`; // Actualiza la URL de la imagen de perfil en la base de datos
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: userData.name,
        email: userData.email,
        pfp: userData.pfp, // El path actualizado de la imagen
        theme: userData.theme,
      },
    });

    console.log('Updated User:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Could not update user');
  }
}
