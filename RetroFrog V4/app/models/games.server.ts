import prisma from '~/utils/prismaClient';

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
