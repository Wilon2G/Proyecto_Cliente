import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from '~/components/BuyButton';
import { Game } from '~/routes/home/shop';

type SliderProps = {
  games: Game[];
};

export function PpalSlider({ games }: SliderProps) {
  return (
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
            className={`relative rounded-lg overflow-hidden shadow-lg border-icon-fill`}
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
              className={`absolute inset-0 bg-gradient-to-t bg-opacity-70 from-gradient-from to-gradient-to flex flex-col justify-end p-6`}
            >
              <h3 className={`text-sm font-medium opacity-80 `}>{game.tags}</h3>
              <h2 className={`text-2xl font-bold mb-2 `}>{game.title}</h2>
              <p className={`text-sm mb-4 `}>{game.description}</p>
              <div className="mt-auto">
                <BuyButton />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function PopularGamesSlider({ games }: SliderProps) {
  return (
    <div className="mb-8">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        navigation
        className="slider-wrapper"
      >
        {games.map((game) => (
          <SwiperSlide
            key={game.id}
            className={`rounded-lg bg-primary p-4 border-icon-fill shadow-lg bg-opacity-70 hover:shadow-xl transition-shadow`}
          >
            <div className="text-center">
              <img
                src={`/assets/games/${game.title.replace(/\s/g, '')}-boxa.png`}
                alt={game.title}
                className="h-40 w-auto mx-auto mb-4 rounded"
              />
              <h3 className={`text-sm `}>{game.tags}</h3>
              <h2 className={`text-lg font-semibold  mb-2`}>{game.title}</h2>
              <p className={`text-sm  mb-4`}>{game.description}</p>
              <BuyButton />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export function HotTopicsSlider({ games }: SliderProps) {
  return (
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
            className={`relative rounded-lg overflow-hidden shadow-lg border-icon-fill`}
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
              className={`absolute inset-0 bg-gradient-to-t bg-opacity-70 from-gradient-from to-gradient-to p-6 `}
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
  );
}
