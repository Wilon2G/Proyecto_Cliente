import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Developers() {
  const slides = [
    {
      tag: 'Web Developer',
      title: 'Favio-Cesar',
      description:
        'Amateur del diseño gráfico y desarrollador de aplicaciones web.',
      gitlink: 'https://github.com/Favio-Cesar',
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
      <div className="w-full mx-auto p-4">
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
              <div className="text-center overflow-hidden">
                <img
                  src={slide.route}
                  className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  alt={slide.title}
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {slide.tag}
                </h3>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {slide.title}
                </h2>
                <p className="mt-2 text-gray-600">{slide.description}</p>
                <a
                  href={slide.gitlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-500 hover:text-blue-700"
                >
                  Ver más info
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
