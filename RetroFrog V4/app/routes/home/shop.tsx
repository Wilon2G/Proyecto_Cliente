import { PrismaClient } from '@prisma/client/extension';
import { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import 'swiper/css'; // Importa los estilos básicos de Swiper
import 'swiper/css/navigation'; // Si usas navegación
import 'swiper/css/pagination'; // Si usas paginación
import { Navigation } from 'swiper/modules'; // Importa módulos si los necesitas
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from '~/components/BuyButton';

interface Game {
  id: string;
  title: string;
  description: string;
  color: string;
  tags: string;
  route: string; // Agregado para manejar las rutas personalizadas si son necesarias.
}

const prisma = new PrismaClient();

export let loader: LoaderFunction = async () => {
  const games = await prisma.game.findMany();
  return games;
};

export default function Shop() {
  const games = useLoaderData<Game[]>();

  return (
    <>
      <div className="slider-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={2}
          navigation
          className="slider-wrapper"
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              style={{
                background: `url(/assets/background/games/${game.title.toLowerCase()}-cover.jpg) no-repeat center center`,
                backgroundSize: 'cover',
                height: '45vh',
              }}
            >
              <div className="slide-content">
                <h3 className="slide-subtitle">{game.tags}</h3>
                <h2 className="slide-title">{game.title}</h2>
                <p className="slide-description">{game.description}</p>
                <div className="slide-footer">
                  <BuyButton />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1 className="title">Juegos populares</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={6}
          navigation
          className="slider-wrapper"
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              className="rounded-lg"
              style={{
                backgroundColor: 'rgb(100 116 139 / var(--tw-bg-opacity, 0.6))',
                height: '45vh',
              }}
            >
              <div className="slide-content">
                <img
                  src={`/assets/background/games/${game.title.toLowerCase()}-cover.jpg`}
                  alt={game.title}
                  className="h-3/4 w-3/4 rounded-xl m-auto my-2"
                />
                <h3 className="slide-tag">{game.tags}</h3>
                <h2 className="slide-title">{game.title}</h2>
                <p className="slide-description">{game.description}</p>
                <BuyButton />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1 className="title">Más Hot topic</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
          className="slider-wrapper"
        >
          {games.map((game) => (
            <SwiperSlide
              key={game.id}
              className="rounded-lg"
              style={{
                background: `url(${game.route}) no-repeat center center`,
                backgroundSize: 'cover',
                height: '45vh',
              }}
            >
              <div className="slide-content">
                <h3 className="slide-tag">{game.tags}</h3>
                <h2 className="slide-title">{game.title}</h2>
                <p className="slide-description">{game.description}</p>
                <BuyButton />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
