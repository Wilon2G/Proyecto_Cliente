import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from '~/components/BuyButton';
import prisma from '~/utils/prismaClient';

// Para capturar el tema desde las cookies (sesión)
import { getSession } from '~/sessions';

interface Game {
  id: string;
  title: string;
  description: string;
  color: string;
  tags: string;
}

export let loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie');
  const session = await getSession(cookieHeader);

  // Obtener el tema desde la sesión
  const theme = session.get('theme') || 'dark';

  const games = await prisma.game.findMany();
  return { games, theme };
};

export default function Shop() {
  const { games, theme } = useLoaderData<{ games: Game[]; theme: string }>();

  // Definir las clases de color dependiendo del tema
  const textClasses = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <div className={`container mx-auto p-4 select-none `}>
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
              className={'relative rounded-lg overflow-hidden shadow-lg '}
              style={{
                background: `url(/assets/games/${game.title.replace(
                  /\s/g,
                  '',
                )}-boxa.png) no-repeat center center`,
                backgroundSize: 'cover',
                height: '60vh',
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === 'dark'
                    ? 'from-black/20 to-black/80'
                    : 'from-white/20 to-white/80'
                } flex flex-col justify-end p-6`}
              >
                <h3 className={`text-sm font-medium opacity-80 ${textClasses}`}>
                  {game.tags}
                </h3>
                <h2 className={`text-2xl font-bold mb-2 ${textClasses}`}>
                  {game.title}
                </h2>
                <p className={`text-sm mb-4 ${textClasses}`}>
                  {game.description}
                </p>
                <div className="mt-auto">
                  <BuyButton />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Juegos Populares */}
      <h1 className={`text-2xl font-bold mb-4 ${textClasses}`}>
        Juegos populares
      </h1>
      <div className="mb-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1} // Mobile first
          breakpoints={{
            640: {
              slidesPerView: 2, // For small tablets and up
            },
            768: {
              slidesPerView: 3, // For medium tablets and up
            },
            1024: {
              slidesPerView: 4, // For large screens
            },
            1280: {
              slidesPerView: 5, // For larger screens
            },
          }}
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
                <h3 className={`text-sm ${textClasses}`}>{game.tags}</h3>
                <h2 className={`text-lg font-semibold ${textClasses} mb-2`}>
                  {game.title}
                </h2>
                <p className={`text-sm ${textClasses} mb-4`}>
                  {game.description}
                </p>
                <BuyButton />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Más Hot Topic */}
      <h1 className={`text-2xl font-bold mb-4 ${textClasses}`}>
        Más Hot topic
      </h1>
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
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === 'dark'
                    ? 'from-black/20 to-black/80'
                    : 'from-white/20 to-white/80'
                } p-6 ${textClasses}`}
              >
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
