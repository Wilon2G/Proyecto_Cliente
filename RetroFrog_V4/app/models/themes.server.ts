import db from '~/db.server';
import { getUserById } from './user.server';

export async function updateTheme(
  id: string,
  theme: string,
  bg: string,
  font: string,
) {
  const user = await getUserById(id);
  const userid = user?.id;
  const updatedTheme = `${theme}:${bg}:${font}`;

  // Actualiza tema en BD
  return db.user.update({
    where: { id: userid },
    data: {
      theme: updatedTheme,
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
