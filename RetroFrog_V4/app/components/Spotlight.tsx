import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Importa los estilos básicos de Swiper
import 'swiper/css/pagination'; // Si usas paginación
import 'swiper/css/navigation'; // Si usas navegación
import { Navigation } from 'swiper/modules'; // Importa módulos si los necesitas
import BuyButton from './BuyButton';

export default function Spotlight() {
  const slides = [
    {
      tag: 'RPG',
      title: 'Legend of Zelda, The - A Link to the Past',
      description: 'Explora mazmorras y salva Hyrule.',
      buttonText: 'Learn More',
      route: '/assets/big/Zelda-large.png',
    },
    {
      tag: 'Lucha',
      title: 'Super Street Fighter II',
      description: 'Compite en intensos combates.',
      buttonText: 'Learn More',
      route: '/assets/big/SF2-large.png',
    },
    {
      tag: 'Carreras',
      title: 'Super Mario Kart',
      description: 'Corre y lanza ítems para ganar.',
      buttonText: 'Learn More',
      route: '/assets/big/MarioKart-large.png',
    },
    {
      tag: 'Party',
      title: 'Super Bomberman',
      description: 'Desafía amigos en explosivas partidas.',
      buttonText: 'Learn More',
      route: '/assets/big/SuperBombermanCover.jpg',
    },
    {
      tag: 'Puzzle',
      title: 'Simon Says Game',
      description: 'Sigue el ritmo y memoriza patrones.',
      buttonText: 'Learn More',
      route: '/assets/big/SimonSays-large.png',
    },
    {
      tag: 'Plataformas',
      title: 'Super Mario World',
      description: 'Salta y corre en un mundo colorido.',
      buttonText: 'Learn More',
      route: '/assets/big/SuperMario.jpeg',
    },
  ];

  return (
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
  );
}
