import { Game, User } from '@prisma/client';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import React from 'react';
import { ButtonAction } from '~/components/Buttons';
import {
  FavoriteFillIcon,
  FavoriteNotFillIcon,
  PlusGameIcon,
} from '~/components/IconsSVG';
import ModalForm from '~/components/ModalForm';
import { getSession } from '~/sessions';
import { getCurrentUser } from '~/utils/auth.server';
import prisma from '~/utils/prismaClient';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter');
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  const userId = session.get('userId');

  //Meterlo a games.server.ts
  const games = await prisma.game.findMany({
    where:
      filter === 'favorites'
        ? { UsersFavorited: { some: { id: userId } } }
        : {},
    include: {
      UsersFavorited: true,
    },
  });

  //const user = await getCurrentUser(request);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  const userRole = user ? user.role : null;
  return { games, filter, userRole, userId };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const gameId = formData.get('gameId') as string;
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  const userId = session.get('userId');

  if (!gameId) {
    throw new Response('ID de juego no proporcionado', { status: 400 });
  }

  //METER EN USER.SERVER.TS O EN EL MODELO CORRESPONDIENTE
  const existingFavorite = await prisma.user.findFirst({
    where: {
      id: userId,
      FavoriteGames: { some: { id: gameId } },
    },
  });

  if (existingFavorite) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        FavoriteGames: {
          disconnect: { id: gameId },
        },
      },
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: {
        FavoriteGames: {
          connect: { id: gameId },
        },
      },
    });
  }

  return new Response(null, { status: 200 });
};

export default function Library() {
  const { games, userRole, userId } = useLoaderData<{
    games: (Game & { UsersFavorited: User[] })[];
    userRole: string | null;
    userId: string;
  }>();
  const fetcher = useFetcher();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const toggleFavorite = (gameId: string) => {
    fetcher.submit({ gameId }, { method: 'post' });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewGame = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    fetcher.submit(formData, { method: 'post', action: '/upload-game' });
    handleCloseModal();
  };

  const isAdmin = userRole; //No se usa

  return (
    <div className="gallery grid grid-cols-2 md:grid-cols-4 gap-4 p-4 relative">
      {/**Juegos */}
      {games?.map((game) => {
        const isFavorite = game.UsersFavorited.some(
          (user) => user.id === userId,
        );

        return (
          <div key={game.id} className="relative">
            <img
              src={`/assets/games/${game.title.replace(/\s/g, '')}-boxa.png`}
              alt={`Cover of ${game.title}`}
              draggable="false"
              className="rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 select-none"
            />
            <ButtonAction
              onClick={() => toggleFavorite(game.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              textBtn={
                isFavorite ? <FavoriteFillIcon /> : <FavoriteNotFillIcon />
              }
              applyDefaultStyles={false}
            />
          </div>
        );
      })}

      {/**Opcion añadir juego */}
      {userRole === 'ADMIN' && (
        <div
          onClick={handleOpenModal}
          className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <PlusGameIcon />
        </div>
      )}

      {/**Form para añadir juego */}
      {isModalOpen && (
        <ModalForm
          handleCloseModal={handleCloseModal}
          handleSubmitNewGame={handleSubmitNewGame}
        />
      )}
    </div>
  );
}
