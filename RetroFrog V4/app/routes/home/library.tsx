import { Game } from '@prisma/client';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import prisma from '~/utils/prismaClient';

export let loader: LoaderFunction = async () => {
  const games = await prisma.game.findMany();
  return games;
};

export default function Library() {
  const games = useLoaderData<Game[]>();

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
