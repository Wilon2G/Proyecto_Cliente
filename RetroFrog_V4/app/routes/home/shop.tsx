import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ShopSlider } from '~/components/ShopSliders';
import { buyNewGame, getAllGames, getGamesUser } from '~/models/games.server';
import { getCurrentUser } from '~/utils/auth.server';

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

  const user = await getCurrentUser(request);
  const userId = user?.id as string;

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Actualizar la base de datos usando Prisma
    await buyNewGame(userId, gameId);

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
  const games = await getAllGames();
  const user = await getCurrentUser(request);
  const userId = user?.id as string;

  let purchasedGames: string[] = [];

  if (userId) {
    const user = await getGamesUser(userId);

    purchasedGames = user?.GamesUnlocked.map((game) => game.id) || [];
  }

  return { games, userId, purchasedGames };
};

type gameShop = { games: Game[]; userId: string; purchasedGames: string[] };

export default function Shop() {
  const { games, purchasedGames } = useLoaderData<gameShop>();
  return (
    <>
      <ShopSlider
        games={games}
        purchasedGames={purchasedGames}
        slidesPerView={3}
        variant="principal"
      />

      <h2 className="text-2xl font-bold mb-4 text-color-reverse">
        Popular Games
      </h2>
      <ShopSlider
        games={games}
        purchasedGames={purchasedGames}
        slidesPerView={5}
        variant="popular"
        breakpoints={[2, 4, 5, 6]}
      />

      <h2 className="text-2xl font-bold mb-4 text-color-reverse">
        More Hot Topics
      </h2>
      <ShopSlider
        games={games}
        purchasedGames={purchasedGames}
        slidesPerView={4}
        variant="hotTopics"
      />
    </>
  );
}
