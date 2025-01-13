import { PrismaClient } from '@prisma/client';
import { Form, redirect } from '@remix-run/react';
import { useEffect, useState } from 'react';
import 'swiper/css'; // Importa los estilos básicos de Swiper
import 'swiper/css/navigation'; // Si usas navegación
import 'swiper/css/pagination'; // Si usas paginación
import { Autoplay } from 'swiper/modules'; // Importa módulos si los necesitas
import { Swiper, SwiperSlide } from 'swiper/react';
import LoginForm from '~/components/LoginForm';
import SignUpForm from '~/components/SignUpForm';
const prisma = new PrismaClient();

export async function loader() {
  const users = await prisma.user.findMany();
  return { users };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const userName = formData.get('userName');
  const password = formData.get('password');
  const user = await prisma.user.findUnique({
    where: { userName: userName as string },
  });
  if (!user || user.password !== password) {
    return '';
  }
  return redirect('/home/main');
}
export default function LoginPage() {
  // const { users } = useLoaderData();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 10);
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <>
      <div className="h-full flex justify-end">
        <div className="flex flex-col w-2/4">
          <div className="slider-container">
            <Swiper
              direction={'horizontal'}
              modules={[Autoplay]}
              spaceBetween={15}
              slidesPerView="auto"
              loop={true}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              speed={7000}
              centeredSlides={true}
              onSwiper={(swiper) => {
                swiper.wrapperEl.style.transitionTimingFunction = 'linear';
              }}
              allowTouchMove={false}
              className="slider-wrapper"
            >
              {slides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    background: `url('${slide.route}') no-repeat center center`,
                    backgroundSize: 'cover',
                    height: '150px',
                    borderRadius: '1rem',
                    width: '150px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                ></SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="h-full w-2/5 bg-primaryDark backdrop-blur-lg">
          <div className="w-full h-1/5 p-6 flex items-center text-textDark">
            <img
              src="../../public/assets/icon/frog-logo3.png"
              alt=""
              className="w-32 h-auto"
            />
            <div className="w-full">
              <h1 className="text-6xl">Retrofrog</h1>
              <h3 className="text-xl">
                Welcome to the first online arcade experience
              </h3>
              <p>
                Login to discover our full catalog or Signup if you don&apos;t
                have an account
              </p>
            </div>
          </div>

          <div className="flex w-full h-4/5">
            <div
              className={`flex-1 transition-all duration-500 ${
                activePanel === 'login'
                  ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
                  : 'flex-[1] '
              }text-textDark p-8 flex flex-col justify-center items-center cursor-pointer`}
              onClick={() => setActivePanel('login')}
              onKeyDown={(event) => {
                if (event.key === ' ') {
                  event.preventDefault(); // Evitar scroll cuando se presiona "Espacio"
                  setActivePanel('register');
                }
              }}
              tabIndex={0} // Permite navegasr con Tab
              role="button" // Define el elemento como un botón para la accesibilidad
            >
              <div
                className={`transition-all duration-1000 ${
                  activePanel === 'login' &&
                  'translate-y-[-50px] opacity-0 absolute top-[-200px]'
                }`}
              >
                <p className="mb-4 text-gray-400 font-bold text-base ">
                  Did you alreday had an account?
                </p>
                <h2
                  className={`text-lg font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-xl z-50 hover:bg-primaryLight hover:text-textLight border-2`}
                >
                  Log In!
                </h2>
              </div>

              <div
                className={`transition-all duration-1000 ${
                  activePanel !== 'login' &&
                  'translate-y-[50px] opacity-0 absolute top-[-200px]'
                }`}
              >
                <h2 className={`text-2xl font-bold mb-6 text-center`}>
                  Welcome Back!
                </h2>
              </div>

              <Form
                method="post"
                className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                  activePanel === 'register' && 'opacity-0 scale-0 absolute'
                }`}
              >
                <LoginForm />
              </Form>
            </div>

            <div
              className={`h-full flex-1 transition-all duration-500 ${
                activePanel === 'register'
                  ? 'flex-[2] bg-highlightDark text-textDarkHighlight'
                  : 'flex-[1] '
              }  text-textDark p-8 flex flex-col justify-center items-center cursor-pointer`}
              onClick={() => setActivePanel('register')}
              onKeyDown={(event) => {
                if (event.key === ' ') {
                  event.preventDefault(); // Evitar scroll cuando se presiona "Espacio"
                  setActivePanel('login');
                }
              }}
              tabIndex={0} // Permite navegar con Tab
              role="button" // Define el elemento como un botón para la accesibilidad
            >
              <div
                className={`transition-all duration-1000 text-center ${
                  activePanel === 'register' &&
                  'translate-y-[-50px] opacity-0 absolute top-[-200px]'
                }`}
              >
                <p className="mb-4 text-gray-400 font-bold text-lg ">
                  Don&apos;t have an account yet?
                </p>
                <h2
                  className={`text-xl font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-xl z-50 hover:bg-primaryLight hover:text-textLight border-2`}
                >
                  Create an account!
                </h2>
              </div>

              <div
                className={`transition-all duration-1000 ${
                  activePanel !== 'register' &&
                  'translate-y-[50px] opacity-0 absolute top-[-200px]'
                }`}
              >
                <h2 className={`text-2xl font-bold mb-6 text-center`}>
                  Welcome!
                </h2>
              </div>
              <Form
                method="post"
                className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                  activePanel === 'login' ? 'opacity-0 scale-0 absolute' : ''
                }
              `}
              >
                <SignUpForm />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingScreen({ progress }: any) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="loader w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin">
        <img
          src="./assets/external/loading-frog.gif" // Ruta del GIF
          alt="Cargando"
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-2xl font-bold mt-4 animate-pulse">
        Cargando... {Math.round(progress)}%
      </p>
    </div>
  );
}
