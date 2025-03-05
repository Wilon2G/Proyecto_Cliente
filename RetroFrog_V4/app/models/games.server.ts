import db from '~/db.server';
import { getCurrentUser } from '~/utils/auth.server';

export async function getAllGames() {
  return db.game.findMany();
}

//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
export async function addGameToUser(userId: string, gameId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { GamesUnlocked: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verificar si el usuario ya tiene el juego
    const hasGame = user.GamesUnlocked.some((game) => game.id === gameId);
    if (hasGame) {
      throw new Error('This user already have this game');
    }

    // Agregar el juego a la lista de GamesUnlocked
    await db.user.update({
      where: { id: userId },
      data: {
        GamesUnlocked: {
          connect: { id: gameId },
        },
      },
    });

    return { success: true, message: 'Game added succesfully' };
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

export async function existingFavoriteGame(userId: string, gameId: string) {
  return db.user.findFirst({
    where: {
      id: userId,
      FavoriteGames: { some: { id: gameId } },
    },
  });
}

export async function disconnectFavGame(userId: string, gameId: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      FavoriteGames: {
        disconnect: { id: gameId },
      },
    },
  });
}

export async function connectFavGame(userId: string, gameId: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      FavoriteGames: {
        connect: { id: gameId },
      },
    },
  });
}

export async function allFavGames(userId: string, filter: string | null) {
  return db.game.findMany({
    where: {
      Users: {
        some: { id: userId },
      },
      ...(filter === 'favorites' && {
        UsersFavorited: {
          some: { id: userId },
        },
      }),
    },
    include: {
      UsersFavorited: true,
    },
  });
}
//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
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

//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
export async function getExistingFavGame(id: string, gameId: string) {
  return db.user.findFirst({
    where: {
      id,
      FavoriteGames: { some: { id: gameId } },
    },
  });
}

//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
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

//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
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

//¿SE USAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?
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

export async function buyNewGame(id: string, gameId: string) {
  return db.user.update({
    where: { id },
    data: {
      GamesUnlocked: {
        connect: [{ id: gameId }], // Conectar el juego al usuario
      },
    },
  });
}
