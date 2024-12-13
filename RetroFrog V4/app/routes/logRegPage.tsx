import { PrismaClient } from '@prisma/client';
import { Form, redirect } from '@remix-run/react';
import { useState } from 'react';
import Button from '../components/Buttons';

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
  const [activePanel, setActivePanel] = useState<'login' | 'register'>('login');

  return (
    <div className="h-full flex justify-end">
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
              <p className="mb-4 text-gray-400 font-bold text-lg ">
                Did you alreday had an account?
              </p>
              <h2
                className={`text-2xl font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-2xl z-50 hover:bg-primaryLight hover:text-textLight border-2`}
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
              <h2 className={`text-3xl font-bold mb-6 text-center`}>
                Welcome Back!
              </h2>
            </div>

            <Form
              method="post"
              className={`space-y-6 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'register' && 'opacity-0 scale-0 absolute'
              }`}
            >
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="userName"
                >
                  User Name:
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
                  placeholder="Tu contraseña"
                />
              </div>
              <Button
                textBtn="Log In"
                typeBtn="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-lg"
              />
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
                className={`text-2xl font-bold mb-6 p-2 text-center transition-all duration-300 border-textDark rounded-2xl z-50 hover:bg-primaryLight hover:text-textLight border-2`}
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
              <h2 className={`text-3xl font-bold mb-6 text-center`}>
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
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="userName"
                >
                  UserName:
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
                  placeholder="Your user name"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
                  placeholder="Your password"
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-textDark"
                  placeholder="example@gmail.com"
                />
              </div>
              <Button textBtn="Register" typeBtn="submit" className="text-lg" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
