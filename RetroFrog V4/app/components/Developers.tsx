import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

export default function Catalog() {
  const slides = [
    {
      tag: 'Web Developer',
      title: 'Favio138',
      description:
        'Amateur del diseño gráfico y desarrollador de aplicaciones web.',
      gitlink: 'https://github.com/Favio138',
      route: '/assets/icon/pfp/favio138.png',
    },
    {
      tag: 'Web Developer',
      title: 'Wilon2G',
      description: 'Técnico de sonido y habilidoso programador.',
      gitlink: 'https://github.com/Wilon2G',
      route: '/assets/icon/pfp/wilon2g.jpeg',
    },
    {
      tag: 'Get to know our first class developers',
      title: 'RetroFrog',
      description: 'The first online-arcade experience',
      gitlink: 'https://github.com/Wilon2G/Proyecto_Cliente.git',
      route: '/assets/icon/frog-logo3.png',
    },
    {
      tag: 'Web Developer',
      title: 'GonS11',
      description: 'Desarrollador de aplicaciones web y enfermero.',
      gitlink: 'https://github.com/GonS11',
      route: 'https://avatars.githubusercontent.com/u/148366975?v=4',
    },
    {
      tag: 'Web Developer',
      title: 'GitSaulo',
      description: 'Desarrollador de juegos RPG profesional.',
      gitlink: 'https://github.com/gitsaulo',
      route: '/assets/icon/pfp/gitsaulo.jpeg',
    },
  ];

  return (
    <>
      <div className="slider-container">
        <Swiper
          modules={[EffectCoverflow]}
          spaceBetween={10}
          slidesPerView={3}
          initialSlide={2}
          effect="coverflow"
          centeredSlides={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 10,
            depth: 500,
            modifier: 1,
            slideShadows: false,
          }}
          className="slider-wrapper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="slider-slide">
              <img
                src={slide.route}
                className="slide-image"
                alt={slide.title}
              />
              <h3 className="slide-tag">{slide.tag}</h3>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-description">{slide.description}</p>
              <a href={slide.gitlink} className="slide-button">
                Ver más info
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
