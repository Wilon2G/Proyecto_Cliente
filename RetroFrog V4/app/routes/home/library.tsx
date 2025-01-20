import { Game } from '@prisma/client';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSession } from '~/sessions';
import prisma from '~/utils/prismaClient';

export let loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  const userId = 'cm63sz99b0000qs500abhtycc'; //session.get('userId');
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter'); // Obtiene el parámetro de filtro

  let games;

  if (filter === 'favorites' && userId) {
    // Obtiene solo los juegos favoritos del usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        FavoriteGames: true, // Asegúrate de que la relación está bien definida en el esquema de Prisma
      },
    });

    // Si el usuario tiene juegos favoritos, devuelve la lista
    games = user?.FavoriteGames || [];
  } else {
    // Si el usuario tiene juegos favoritos, devuelve la lista
    games = await prisma.game.findMany();
  }

  return { games, userId };
};

export default function Library() {
  const { games, userId } = useLoaderData<{ games: Game[]; userId: string }>(); // Obtiene los juegos y userId desde el loader

  return (
    <div className="gallery grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {games.map((game, index) => (
        <img
          key={index}
          src={`/assets/games/${game.title.replace(/\s/g, '')}-boxa.png`}
          alt={`Cover of ${game.title}`}
          draggable="false" /* Evita arrastrar */
          className="rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 select-none"
        />
      ))}
    </div>
  );
}
