import { Game, User } from '@prisma/client';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import React, { useRef } from 'react';
import { ButtonAction } from '~/components/Buttons';
import GameComponent from '~/components/games/GameComponent';
import {
  FavoriteFillIcon,
  FavoriteNotFillIcon,
  PlusGameIcon,
} from '~/components/IconsSVG';
import ModalForm from '~/components/ModalForm';
import { getSession } from '~/sessions';
import prisma from '~/utils/prismaClient';
//meter el modal de añadir juegos otra vez.
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter');
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  const userId = session.get('userId');

  //Meterlo a games.server.ts
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      GamesUnlocked: {
        include: {
          UsersFavorited: true,
        },
      },
    },
  });

  const games =
    filter === 'favorites'
      ? user?.GamesUnlocked.filter((game) =>
          game.UsersFavorited.some((user) => user.id === userId),
        )
      : user?.GamesUnlocked;

  //const user = await getCurrentUser(request);

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
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref para manejar el audio

  const toggleFavorite = (gameId: string) => {
    fetcher.submit({ gameId }, { method: 'post' });
  };
  const handleOpenGameModal = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseGameModal = () => {
    setSelectedGame(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const playMusic = (game: Game) => {
    if (audioRef.current) {
      audioRef.current.src =
        '/assets/games/bgm/' + game.title.replace(/\s/g, '') + '.mp3'; // Ruta del archivo MP3 del juego
      audioRef.current.play();
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Opcional: reiniciar el audio cuando se detenga
    }
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
          <div
            key={game.id}
            className="relative"
            onClick={() => handleOpenGameModal(game)}
            onMouseEnter={() => playMusic(game)} // Iniciar música al hacer hover
            onMouseLeave={stopMusic} // Detener música al salir del hover
          >
            {/* Aquí se maneja el hover para cambiar la imagen */}
            <div className="relative overflow-hidden rounded-md shadow-md transition-shadow duration-300 select-none">
              <img
                src={`/assets/games/${game.title.replace(/\s/g, '')}-boxa.png`}
                alt={`Cover of ${game.title}`}
                draggable="false"
                className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                onMouseEnter={(e) => {
                  e.currentTarget.src = `/assets/games/${game.title.replace(
                    /\s/g,
                    '',
                  )}.gif`; // Cambio a GIF
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.src = `/assets/games/${game.title.replace(
                    /\s/g,
                    '',
                  )}-boxa.png`; // Vuelve a la imagen estática
                }}
              />
            </div>
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
      {/** Modal para ver juego */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-appear select-none">
          <div className="flex bg-white p-6 rounded-lg h-3/4 w-3/4 relative justify-center align-middle">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseGameModal}
            >
              ×
            </button>
            <GameComponent game={selectedGame} />
          </div>
        </div>
      )}
      {/**Form para añadir juego */}
      {isModalOpen && (
        <ModalForm
          handleCloseModal={handleCloseModal}
          handleSubmitNewGame={handleSubmitNewGame}
        />
      )}
      <audio ref={audioRef} />
    </div>
  );
}
