import { Game, User } from '@prisma/client';
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import GameComponent from '~/components/games/GameComponent';
import { ButtonAction } from '~/components/general/Buttons';
import {
  ExitIcon,
  FavoriteFillIcon,
  FavoriteNotFillIcon,
  PlusGameIcon,
} from '~/components/general/IconsSVG';
import ModalForm from '~/components/shop/ModalForm';
import PaginationBar from '~/components/shop/PaginationBar';
import {
  allFavGames,
  connectFavGame,
  disconnectFavGame,
  existingFavoriteGame,
  getGamesUser,
} from '~/models/games.server';
import { getSession } from '~/sessions';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get('filter');
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);
  const userId = session.get('userId');
  const search = url.searchParams.get('search') || '';
  const consoleFilter = url.searchParams.get('console') || 'All consoles';
  const tags = url.searchParams.getAll('tags');

  const user = await getGamesUser(userId);

  const top = Number(url.searchParams.get('$top')) || 8;
  const skip = Number(url.searchParams.get('$skip')) || 0;

  const allUnlockedGames = await allFavGames(userId, filter);

  const filteredGames = filterGames(
    allUnlockedGames,
    search,
    consoleFilter,
    tags,
  );

  const gamesToReturn = filteredGames.slice(skip, skip + top);

  const totalGamesUnlocked = filteredGames.length;

  const userRole = user ? user.role : null;
  return { gamesToReturn, filter, userRole, userId, totalGamesUnlocked };
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

  const existingFavorite = await existingFavoriteGame(userId, gameId);

  if (existingFavorite) {
    disconnectFavGame(userId, gameId);
  } else {
    connectFavGame(userId, gameId);
  }

  return new Response(null, { status: 200 });
};
export default function Library() {
  const { gamesToReturn, userRole, userId, totalGamesUnlocked } =
    useLoaderData<{
      gamesToReturn: (Game & { UsersFavorited: User[] })[];
      userRole: string | null;
      userId: string;
      totalGamesUnlocked: number;
    }>();
  const fetcher = useFetcher();
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref para manejar el audio

  const toggleFavorite = (gameId: string) => {
    fetcher.submit({ gameId }, { method: 'post' });
  };
  const handleOpenGameModal = (game: Game) => {
    stopMusic();
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

  function playMusic(game: Game) {
    if (!audioRef.current) return;
    // Si el audio ya está reproduciéndose, lo detiene antes de cambiar la fuente
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    // Asigna la nueva fuente de audio
    const newSrc = `/assets/games/bgm/${game.title.replace(/\s/g, '')}.mp3`;

    if (audioRef.current.src !== newSrc) {
      audioRef.current.src = newSrc;
      audioRef.current.load(); // Carga el nuevo audio
      audioRef.current.oncanplay = () => audioRef.current!.play(); // Reproduce cuando esté listo
    }
  }

  function stopMusic() {
    if (audioRef.current) {
      // Check if the audio is currently playing
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        // Clear any oncanplay listeners to avoid play being triggered later
        audioRef.current.oncanplay = null;
      }
    }
  }

  const handleSubmitNewGame = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    fetcher.submit(formData, { method: 'post', action: '/upload-game' });
    handleCloseModal();
  };

  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  return (
    <>
      <div className="gallery grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6  relative  rounded-2xl">
        {/**Juegos */}
        {gamesToReturn.map((game) => {
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
                    isHovered ? '.avif' : '-boxa.avif'
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
                      )}-logo.avif`}
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
                  e.stopPropagation(); // Evita que el evento se propague
                }}
                className="absolute top-2 right-2 bg-white bg-opacity-30 rounded-full p-1 shadow-xl"
                id={game.id}
                textBtn={
                  isFavorite ? <FavoriteFillIcon /> : <FavoriteNotFillIcon />
                }
                applyDefaultStyles={false}
              />
            </div>
          );
        })}
      </div>
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

      <div
        className={classNames(
          'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-appear select-none z-50',
          {
            'opacity-100  transition-all duration-400 ease-in-out visible ':
              selectedGame,
            'opacity-0  transition-all duration-400 ease-in-out invisible':
              !selectedGame,
          },
          'bottom-2',
        )}
      >
        <button
          className="absolute top-7 right-7 bg-white bg-opacity-45 p-2  rounded-full active:scale-95 transition-transform duration-150"
          onClick={handleCloseGameModal}
        >
          <ExitIcon />
        </button>

        <div
          className={classNames(
            'flex bg-white bg-opacity-40 p-1 rounded-lg h-[685px] w-[896px] relative justify-center align-middle sm:w-3/5',
            {
              'h-[685px] w-[896px] duration-400 transition-all ease-in-out':
                selectedGame,
              'h-[280px] w-[290px] duration-400 transition-all ease-in-out':
                !selectedGame,
            },
          )}
        >
          <GameComponent game={selectedGame} />
        </div>
      </div>

      {/**Form para añadir juego */}
      {isModalOpen && (
        <ModalForm
          handleCloseModal={handleCloseModal}
          handleSubmitNewGame={handleSubmitNewGame}
        />
      )}
      <audio ref={audioRef} />
      <PaginationBar total={totalGamesUnlocked}></PaginationBar>
    </>
  );
}
const filterGames = (
  games: (Game & { UsersFavorited: User[] })[],
  search: string,
  consoleFilter: string,
  tags: string[],
): (Game & { UsersFavorited: User[] })[] => {
  return games.filter((game) => {
    const matchesSearch = search
      ? game.title.toLowerCase().includes(search.toLowerCase())
      : true;

    const matchesConsole =
      consoleFilter && consoleFilter !== 'All consoles'
        ? game.console
            .split(':')
            .some(
              (console) =>
                console.trim().toLowerCase() === consoleFilter.toLowerCase(),
            )
        : true;

    const matchesTags =
      tags.length > 0
        ? tags.every((tag) => game.tags.split(';').includes(tag))
        : true;

    return matchesSearch && matchesConsole && matchesTags;
  });
};
