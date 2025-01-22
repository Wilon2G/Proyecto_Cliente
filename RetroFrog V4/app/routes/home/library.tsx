import { Game, User } from '@prisma/client';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import React from 'react';
import prisma from '~/utils/prismaClient';

const userId = 'cm65hosr80000qstgkhik7b11';

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter');

  const games = await prisma.game.findMany({
    where:
      filter === 'favorites'
        ? { UsersFavorited: { some: { id: userId } } }
        : {},
    include: {
      UsersFavorited: true,
    },
  });

  return { games, filter };
};

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const gameId = formData.get('gameId') as string;

  if (!gameId) {
    throw new Response('ID de juego no proporcionado', { status: 400 });
  }

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
  const { games, filter } = useLoaderData<{
    games: (Game & { UsersFavorited: User[] })[];
    filter: string | null;
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

  const isAdmin = true;

  return (
    <div className="gallery grid grid-cols-2 md:grid-cols-4 gap-4 p-4 relative">
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
            <button
              onClick={() => toggleFavorite(game.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              )}
            </button>
          </div>
        );
      })}

      {isAdmin && (
        <div
          onClick={handleOpenModal}
          className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Subir Nuevo Juego</h2>
            <form onSubmit={handleSubmitNewGame}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium">
                  Color
                </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Subir
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
