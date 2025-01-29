import { Game, User } from '@prisma/client';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import React, { useRef, useState } from 'react';
import { ButtonAction } from '~/components/Buttons';
import GameComponent from '~/components/games/GameComponent';
import GameSearch from '~/components/games/GameSearch';
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
  // Estado para controlar la imagen de fondo en hover
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  return (
    <>
      <GameSearch></GameSearch>
      <div className="gallery grid sm:grid-cols-3 md:grid-cols-5 gap-6 p-4 relative  rounded-2xl">
        {/**Juegos */}
        {games?.map((game) => {
          const isFavorite = game.UsersFavorited.some(
            (user) => user.id === userId,
          );
          const isHovered = hoveredGame === game.id;
          return (
            <div
              key={game.id}
              className="relative"
              onMouseEnter={() => {
                playMusic(game);
                setHoveredGame(game.id);
              }}
              onMouseLeave={() => {
                stopMusic();
                setHoveredGame(null);
              }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 select-none">
                {/* Imagen de fondo */}
                <img
                  src={`/assets/games/${game.title.replace(/\s/g, '')}${
                    isHovered ? '.gif' : '-boxa.png'
                  }`}
                  alt={`Cover of ${game.title}`}
                  draggable="false"
                  className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                />

                {/* Superposición con logo */}
                {isHovered && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300">
                    <img
                      src={`/assets/games/${game.title.replace(
                        /\s/g,
                        '',
                      )}-logo.png`}
                      alt={`${game.title} logo`}
                      className="max-w-[80%] max-h-[80%] object-contain"
                      onClick={() => handleOpenGameModal(game)}
                    />
                  </div>
                )}
              </div>

              <ButtonAction
                onClick={(e) => {
                  toggleFavorite(game.id);
                  e.stopPropagation();
                }}
                className="absolute top-2 right-2 bg-white bg-opacity-30  rounded-full p-1 shadow-xl"
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
            <button
              className="absolute top-7 right-7 bg-white bg-opacity-45 p-9 text-4xl text-white hover:text-red-500 rounded-3xl"
              onClick={handleCloseGameModal}
            >
              X
            </button>
            <div className="flex bg-white bg-opacity-40 p-1 rounded-lg h-[685px] w-[896px] relative justify-center align-middle">
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
    </>
  );
}
