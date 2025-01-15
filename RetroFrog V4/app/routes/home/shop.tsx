import { PrismaClient } from '@prisma/client/extension';
import 'swiper/css'; // Importa los estilos básicos de Swiper
import 'swiper/css/navigation'; // Si usas navegación
import 'swiper/css/pagination'; // Si usas paginación
import { Navigation } from 'swiper/modules'; // Importa módulos si los necesitas
import { Swiper, SwiperSlide } from 'swiper/react';
import BuyButton from '~/components/BuyButton';

export default function Shop() {
  const slides = [
    {
      tag: 'RPG',
      title: 'Legend of Zelda, The - A Link to the Past',
      description: 'Explora mazmorras y salva Hyrule.',
      buttonText: 'Learn More',
      route: '/assets/games/Zelda-large.png',
    },
    {
      tag: 'Lucha',
      title: 'Super Street Fighter II',
      description: 'Compite en intensos combates.',
      buttonText: 'Learn More',
      route: '/assets/games/SF2-large.png',
    },
    {
      tag: 'Carreras',
      title: 'Super Mario Kart',
      description: 'Corre y lanza ítems para ganar.',
      buttonText: 'Learn More',
      route: '/assets/games/MarioKart-large.png',
    },
    {
      tag: 'Party',
      title: 'Super Bomberman',
      description: 'Desafía amigos en explosivas partidas.',
      buttonText: 'Learn More',
      route: '/assets/games/SuperBombermanCover.jpg',
    },
    {
      tag: 'Puzzle',
      title: 'Simon Says Game',
      description: 'Sigue el ritmo y memoriza patrones.',
      buttonText: 'Learn More',
      route: '/assets/games/SimonSays-large.png',
    },
    {
      tag: 'Plataformas',
      title: 'Super Mario World',
      description: 'Salta y corre en un mundo colorido.',
      buttonText: 'Learn More',
      route: '/assets/games/SuperMario.jpeg',
    },
  ];
  const prisma = new PrismaClient();

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
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              style={{
                background: `url('${slide.route}') no-repeat center center`,
                backgroundSize: 'cover',
                height: '45vh',
              }}
            >
              <div className="slide-content">
                <h3 className="slide-subtitle">{slide.tag}</h3>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
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
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="rounded-lg"
              style={{
                backgroundColor:
                  'rgb(100 116 139 / var(--tw-bg-opacity, 0.6)) ',
                height: '45vh',
              }}
            >
              <div className="slide-content">
                <img
                  src={slide.route}
                  className="h-3/4 w-3/4 rounded-xl m-auto my-2"
                />
                <h3 className="slide-tag">{slide.tag}</h3>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
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
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="rounded-lg"
              style={{
                background: `url('${slide.route}') no-repeat center center`,
                backgroundSize: 'cover',
                height: '45vh',
              }}
            >
              <div className="slide-content">
                <h3 className="slide-tag">{slide.tag}</h3>
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
                <BuyButton />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
