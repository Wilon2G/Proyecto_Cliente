import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from '~/components/BuyButton';
import { Game } from '~/routes/home/shop';

type SliderProps = {
  games: Game[];
  purchasedGames: string[];
};

export function PpalSlider({ games, purchasedGames }: SliderProps) {
  return (
    <div className="mb-8 w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        className="slider-wrapper"
      >
        {games.map((game) => {
          const isPurchased = purchasedGames.includes(game.id);

          return (
            <SwiperSlide
              key={game.id}
              className="swiper-slide relative rounded-lg overflow-hidden shadow-lg border-icon-fill"
              style={{
                background: `url(/assets/games/${game.title.replace(
                  /\s/g,
                  '',
                )}-L.avif) no-repeat center center`,
                backgroundSize: 'cover',
                minHeight: '500px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t bg-opacity-70 from-gradient-from to-gradient-to flex flex-col justify-end p-6">
                <h3 className="text-sm font-medium opacity-80">{game.tags}</h3>
                <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                <p className="text-sm mb-4">{game.description}</p>
                <div className="mt-auto">
                  {isPurchased ? (
                    <span className="text-green-500 font-bold">
                      ✅ Comprado
                    </span>
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

export function PopularGamesSlider({ games, purchasedGames }: SliderProps) {
  return (
    <div className="mb-8 w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        navigation
        className="slider-wrapper"
      >
        {games.map((game) => {
          const isPurchased = purchasedGames.includes(game.id);

          return (
            <SwiperSlide
              key={game.id}
              className="h-40 rounded-lg bg-primary p-4 shadow-lg bg-opacity-70 hover:shadow-xl transition-shadow"
              style={{ height: '400px' }}
            >
              <div className="text-center ">
                <img
                  src={`/assets/games/${game.title.replace(
                    /\s/g,
                    '',
                  )}-boxa.avif`}
                  alt={game.title}
                  className="h-40 w-40 mx-auto mb-4 rounded"
                  width={160}
                  height={160}
                />
                <h3 className="text-sm">{game.tags}</h3>
                <h2 className="text-lg font-semibold mb-2">{game.title}</h2>
                <p className="text-sm mb-4">{game.description}</p>
                <div className="mt-auto">
                  {isPurchased ? (
                    <span className="text-green-500 font-bold ">
                      ✅ Comprado
                    </span>
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

export function HotTopicsSlider({ games, purchasedGames }: SliderProps) {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        navigation
        className="slider-wrapper"
      >
        {games.map((game) => {
          const isPurchased = purchasedGames.includes(game.id);

          return (
            <SwiperSlide
              key={game.id}
              className="relative rounded-lg overflow-hidden shadow-lg border-icon-fill"
              style={{
                background: `url(/assets/games/${game.title.replace(
                  /\s/g,
                  '',
                )}-boxa.avif) no-repeat center center`,
                backgroundSize: 'cover',
                height: '300px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t bg-opacity-70 from-gradient-from to-gradient-to p-6">
                <h3 className="text-sm font-medium">{game.tags}</h3>
                <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                <p className="text-sm mb-4">{game.description}</p>
                <div>
                  {isPurchased ? (
                    <span className="text-green-500 font-bold">
                      ✅ Comprado
                    </span>
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
