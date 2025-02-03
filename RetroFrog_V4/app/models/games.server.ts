import db from '~/db.server';
import { getCurrentUser } from '~/utils/auth.server';
import prisma from '~/utils/prismaClient';

//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
export async function addGameToUser(userId: string, gameId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { GamesUnlocked: true },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar si el usuario ya tiene el juego
    const hasGame = user.GamesUnlocked.some((game) => game.id === gameId);
    if (hasGame) {
      throw new Error('El usuario ya tiene este juego');
    }

    // Agregar el juego a la lista de GamesUnlocked
    await prisma.user.update({
      where: { id: userId },
      data: {
        GamesUnlocked: {
          connect: { id: gameId },
        },
      },
    });

    return { success: true, message: 'Juego añadido correctamente' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getGamesUser(id: string) {
  return db.user.findUnique({
    where: { id },
    include: { GamesUnlocked: { include: { UsersFavorited: true } } },
  });
}

export async function getFavGamesUser(request: Request, filter: string | null) {
  const user = await getCurrentUser(request);
  const userId = user?.id as string;

  const gamesFromUser = await getGamesUser(userId);

  if (!gamesFromUser) {
    throw new Error('There are no games for this user');
  }

  const games =
    filter === 'favorites'
      ? gamesFromUser.GamesUnlocked.filter((game) =>
          game.UsersFavorited.some((favUser) => favUser.id === userId),
        )
      : gamesFromUser.GamesUnlocked;

  return { user, games };
}

export async function getExistingFavGame(id: string, gameId: string) {
  return db.user.findFirst({
    where: {
      id,
      FavoriteGames: { some: { id: gameId } },
    },
  });
}

export async function deleteFavGame(id: string, gameId: string) {
  return db.user.update({
    where: { id },
    data: {
      FavoriteGames: {
        disconnect: { id: gameId },
      },
    },
  });
}

export async function addFavGame(id: string, gameId: string) {
  return db.user.update({
    where: { id },
    data: {
      FavoriteGames: {
        connect: { id: gameId },
      },
    },
  });
}

export async function buyNewGame(id: string, gameId: string) {
  return prisma.user.update({
    where: { id },
    data: {
      GamesUnlocked: {
        connect: [{ id: gameId }], // Conectar el juego al usuario
      },
    },
  });
}
