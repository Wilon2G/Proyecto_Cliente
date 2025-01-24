import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  HotTopicsSlider,
  PopularGamesSlider,
  PpalSlider,
} from '~/components/ShopSliders';
import prisma from '~/utils/prismaClient';

export interface Game {
  id: string;
  title: string;
  description: string;
  color: string;
  tags: string;
}

export const loader: LoaderFunction = async () => {
  const games = await prisma.game.findMany();
  return { games };
};

export default function Shop() {
  const { games } = useLoaderData<{ games: Game[] }>();

  return (
    <div className="container mx-auto p-4 select-none shadow-lg bg-gray-500 bg-opacity-60 rounded-md">
      <PpalSlider games={games} />

      <h2 className={`text-2xl font-bold mb-4 `}>Popular Games</h2>
      <PopularGamesSlider games={games} />

      <h2 className={`text-2xl font-bold mb-4 `}>More Hot topic</h2>
      <HotTopicsSlider games={games} />
    </div>
  );
}
