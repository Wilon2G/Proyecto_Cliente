import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from './BuyButton';

export default function Catalog() {
  interface Game {
    id: string;
    title: string;
    description: string;
    component: string;
    color: string;
    Users: string[];
  }

  const [games, setGames] = useState<Game[]>([]);
  const prisma = new PrismaClient();

  const fetchGames = async (): Promise<Game[]> => {
    try {
      const response: Game = await prisma.game.findMany(); // Respuesta es un array de juegos
      return response;
    } catch (error) {
      console.error('Error fetching games:', error);
      return null; // Retornar un array vacío en caso de error
    }
  };

  useEffect(() => {
    const loadGames = async () => {
      const gamesList = await fetchGames();
      setGames(gamesList);
    };
    loadGames();
  }, []);

  return (
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
              <img className="h-3/4 w-3/4 rounded-xl m-auto my-2" />
              <h3 className="slide-tag">{game.component}</h3>
              <h2 className="slide-title">{game.title}</h2>
              <p className="slide-description">{game.description}</p>
              <BuyButton />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
