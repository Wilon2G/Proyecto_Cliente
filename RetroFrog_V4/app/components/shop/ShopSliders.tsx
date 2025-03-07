import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Game } from '~/routes/home/shop';
import { BuyButton } from '../general/Buttons';

type SliderProps = {
  games: Game[];
  purchasedGames: string[];
  maxslidesPerView: number;
  breakpoints?: number[]; // El array de breakpoints tiene la cantidad de slides por vista
  variant?: 'default' | 'principal' | 'popular' | 'hotTopics';
};

export function ShopSlider({
  games,
  purchasedGames,
  maxslidesPerView,
  breakpoints,
  variant = 'default',
}: SliderProps) {
  const getSlideStyle = (game: Game) => {
    switch (variant) {
      case 'principal':
        return {
          background: `url(/assets/games/${game.title.replace(
            /\s/g,
            '',
          )}-L.avif) no-repeat center center`,
          backgroundSize: 'cover',
          minHeight: '500px',
        };
      case 'hotTopics':
        return {
          background: `url(/assets/games/${game.title.replace(
            /\s/g,
            '',
          )}-boxa.avif) no-repeat center center`,
          backgroundSize: 'cover',
          height: '400px',
        };
      default:
        return { height: '400px' };
    }
  };

  return (
    <div className="mb-8 w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1} // Inicialmente 1 slide por vista
        breakpoints={
          breakpoints
            ? {
                640: {
                  slidesPerView: breakpoints[0] || 1, // Para pantallas pequeñas
                },
                768: {
                  slidesPerView: breakpoints[1] || 3, // Para pantallas medianas
                },
                1024: {
                  slidesPerView: breakpoints[2] || 4, // Para pantallas grandes
                },
                1280: {
                  slidesPerView: breakpoints[3] || maxslidesPerView, // Para pantallas extra grandes
                },
              }
            : {}
        }
        navigation
      >
        {games.map((game) => {
          const isPurchased = purchasedGames.includes(game.id);

          return (
            <SwiperSlide
              key={game.id}
              className={`rounded-lg shadow-lg transition-shadow ${
                variant === 'principal' || variant === 'hotTopics'
                  ? 'relative overflow-hidden border-icon-fill'
                  : 'bg-primary p-4 bg-opacity-70 hover:shadow-xl'
              }`}
              style={getSlideStyle(game)}
            >
              <div
                className={
                  variant === 'principal' || variant === 'hotTopics'
                    ? 'absolute inset-0 bg-gradient-to-t bg-opacity-70 from-gradient-from to-gradient-to p-6 flex flex-col justify-end'
                    : 'text-center'
                }
              >
                {variant !== 'principal' && (
                  <img
                    src={`/assets/games/${game.title.replace(
                      /\s/g,
                      '',
                    )}-boxa.avif`}
                    alt={game.title}
                    className="h-40 w-40 mx-auto mb-4 rounded "
                    width={160}
                    height={160}
                  />
                )}
                <h3 className="text-sm font-medium opacity-80 break-all">
                  {game.tags}
                </h3>
                <h2 className="text-sm font-semibold mb-2 md:text-lg ">
                  {game.title}
                </h2>
                <p className="text-sm mb-4 hidden md:block">
                  {game.description}
                </p>
                <div className="mt-auto">
                  {isPurchased ? (
                    <span className="text-green-500 font-bold">✅ Bought</span>
                  ) : (
                    <BuyButton gameId={game.id} />
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
