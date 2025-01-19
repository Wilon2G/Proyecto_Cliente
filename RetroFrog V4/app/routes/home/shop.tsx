import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from '~/components/BuyButton';
import prisma from '~/utils/prismaClient';
interface Game {
  id: string;
  title: string;
  description: string;
  color: string;
  tags: string;
}

export let loader: LoaderFunction = async () => {
  const games = await prisma.game.findMany();
  return games;
};

export default function Shop() {
  const games = useLoaderData<Game[]>();

  return (
    <div className="container mx-auto p-4 select-none">
      {/* Slider Principal */}
      <div className="mb-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation
          className="slider-wrapper"
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              className="relative rounded-lg overflow-hidden shadow-lg"
              style={{
                background: `url(/assets/games/${game.title.replace(
                  /\s/g,
                  '',
                )}-boxa.png) no-repeat center center`,
                backgroundSize: 'cover',
                height: '60vh',
              }}
            >
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 text-white">
                <h3 className="text-sm font-medium opacity-80">{game.tags}</h3>
                <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                <p className="text-sm mb-4">{game.description}</p>
                <div className="mt-auto">
                  <BuyButton />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Juegos Populares */}
      <h1 className="text-2xl font-bold mb-4">Juegos populares</h1>
      <div className="mb-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={6}
          navigation
          className="slider-wrapper"
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              className="rounded-lg bg-slate-700 p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <img
                  src={`/assets/games/${game.title.replace(
                    /\s/g,
                    '',
                  )}-boxa.png`}
                  alt={game.title}
                  className="h-40 w-auto mx-auto mb-4 rounded"
                />
                <h3 className="text-sm text-gray-300">{game.tags}</h3>
                <h2 className="text-lg font-semibold text-white mb-2">
                  {game.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <BuyButton />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Más Hot Topic */}
      <h1 className="text-2xl font-bold mb-4">Más Hot topic</h1>
      <div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          navigation
          className="slider-wrapper"
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              className="relative rounded-lg overflow-hidden shadow-lg"
              style={{
                background: `url(/assets/games/${game.title.replace(
                  /\s/g,
                  '',
                )}-boxa.png) no-repeat center center`,
                backgroundSize: 'cover',
                height: '50vh',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 p-6 text-white">
                <h3 className="text-sm font-medium">{game.tags}</h3>
                <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                <p className="text-sm mb-4">{game.description}</p>
                <div>
                  <BuyButton />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
