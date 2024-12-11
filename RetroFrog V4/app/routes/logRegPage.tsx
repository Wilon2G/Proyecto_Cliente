import { PrismaClient } from '@prisma/client';
import { Form, redirect } from '@remix-run/react';
import { useState } from 'react';
import Button from '~/components/Button';

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
    <div className="flex flex-row mt-64 justify-evenly bg-gradient-to-br">
      <div className="self-start">
        <h1>Retrofrog</h1>
        <h3>Welcome to the first online arcade experience</h3>
        <p>
          Login to discover our full catalog or Signup if you dont have an
          account
        </p>
      </div>
      <div className="flex w-2/5 h-[400px] shadow-lg rounded-lg overflow-hidden">
        <div
          className={`flex-1 transition-all duration-500 ${
            activePanel === 'login' ? 'flex-[2]' : 'flex-[1] justify-center'
          } bg-white text-gray-900 p-8 flex flex-col  items-center cursor-pointer`}
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
            <p className="mb-4 text-gray-400 font-bold text-sm ">
              Did you alreday had an account?
            </p>
            <h2 className={`text-2xl font-bold mb-6 text-center`}>Log In!</h2>
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
            className={`space-y-4 w-full max-w-sm transition-all duration-500 ${
              activePanel === 'register' && 'opacity-0 scale-0 absolute'
            }`}
          >
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="userName"
              >
                User Name:
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                placeholder="Tu nombre de usuario"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                placeholder="Tu contraseña"
              />
            </div>
            <Button
              textBtn="Log In"
              typeBtn="submit"
              className="bg-indigo-600 hover:bg-indigo-700"
            />
          </Form>
        </div>

        <div
          className={`flex-1 transition-all duration-500 ${
            activePanel === 'register' ? 'flex-[2]' : 'flex-[1]'
          } bg-gray-100 text-gray-900 p-8 flex flex-col justify-center items-center cursor-pointer`}
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
            className={`transition-all duration-1000 ${
              activePanel === 'register' &&
              'translate-y-[-50px] opacity-0 absolute top-[-200px]'
            }`}
          >
            <p className="mb-4 text-gray-400 font-bold text-sm ">
            Don&apos;t have an account yet?
            </p>
            <h2 className={`text-2xl font-bold mb-6 text-center`}>Register now!</h2>
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
              className={`space-y-4 w-full max-w-sm transition-all duration-500 ${
                activePanel === 'login' ? 'opacity-0 scale-0 absolute' : ""}
              `}
            >
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="userName"
                >
                  User Name:
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu contraseña"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none text-white"
                  placeholder="Tu correo electrónico"
                />
              </div>
              <Button textBtn="Register" typeBtn="submit" className="" />
            </Form>
          
        </div>
      </div>
    </div>
  );
}
