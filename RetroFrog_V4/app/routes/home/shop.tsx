import { ActionFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ShopSlider } from '~/components/shop/ShopSliders';
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

export async function loader({ request }: { request: Request }) {
  const games = await getAllGames();
  const user = await getCurrentUser(request);
  const userId = user?.id as string;

  let purchasedGames: string[] = [];

  if (userId) {
    const user = await getGamesUser(userId);

    purchasedGames = user?.GamesUnlocked.map((game) => game.id) || [];
  }

  return { games, userId, purchasedGames };
}

type gameShop = { games: Game[]; userId: string; purchasedGames: string[] };

export default function Shop() {
  const { games, purchasedGames } = useLoaderData<gameShop>();
  return (
    <>
      <ShopSlider
        games={games}
        purchasedGames={purchasedGames}
        maxslidesPerView={3}
        variant="principal"
        breakpoints={[1, 2, 3]}
      />

      <h2 className="text-2xl font-bold mb-4 text-color-reverse">
        Popular Games
      </h2>
      <ShopSlider
        games={games}
        purchasedGames={purchasedGames}
        maxslidesPerView={5}
        variant="popular"
        breakpoints={[1, 4, 5]}
      />

      <h2 className="text-2xl font-bold mb-4 text-color-reverse">
        More Hot Topics
      </h2>
      <ShopSlider
        games={games}
        purchasedGames={purchasedGames}
        maxslidesPerView={4}
        variant="hotTopics"
        breakpoints={[1, 2, 2]}
      />
    </>
  );
}
