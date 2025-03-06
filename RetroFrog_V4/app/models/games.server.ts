import db from '~/db.server';

export async function getAllGames() {
  return db.game.findMany();
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
