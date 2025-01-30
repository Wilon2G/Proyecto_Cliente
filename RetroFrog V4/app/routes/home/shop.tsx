import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  HotTopicsSlider,
  PopularGamesSlider,
  PpalSlider,
} from '~/components/ShopSliders';
import { getSession } from '~/sessions';
import prisma from '~/utils/prismaClient';

export interface Game {
  id: string;
  title: string;
  description: string;
  color: string;
  tags: string;
}
export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const gameId = formData.get('gameId'); // ID del juego que se va a comprar

  // Verificar que el gameId esté presente
  if (!gameId) {
    return new Response(JSON.stringify({ error: 'No gameId provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  const userId = session.get('userId'); // ID del usuario desde la sesión

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Actualizar la base de datos usando Prisma
    await prisma.user.update({
      where: { id: userId },
      data: {
        GamesUnlocked: {
          connect: [{ id: gameId }], // Conectar el juego al usuario
        },
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error adding game to user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const games = await prisma.game.findMany();
  const cookieHeader = request.headers.get('cookie');

  const session = await getSession(cookieHeader);

  const userId = session.get('userId');

  let purchasedGames: string[] = [];

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { GamesUnlocked: true },
    });

    purchasedGames = user?.GamesUnlocked.map((game) => game.id) || [];
  }
  return { games, userId, purchasedGames };
};

export default function Shop() {
  const { games, userId, purchasedGames } = useLoaderData<{
    games: Game[];
    userId: string;
    purchasedGames: string[];
  }>();
  return (
    <>
      <PpalSlider games={games} purchasedGames={purchasedGames} />

      <h2 className={`text-2xl font-bold mb-4 `}>Popular Games</h2>
      <PopularGamesSlider games={games} purchasedGames={purchasedGames} />

      <h2 className={`text-2xl font-bold mb-4 `}>More Hot topic</h2>
      <HotTopicsSlider games={games} purchasedGames={purchasedGames} />
    </>
  );
}
